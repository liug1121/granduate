<script>
import AlertDlg from "./AlertDlg.vue";
import MsgDlg from "./MsgDlg.vue";
import { mapGetters } from "vuex";
import api from "../../api/api";
import wx from "weixin-jsapi";
export default {
  name: "Bind",
  components: {
    AlertDlg,
    MsgDlg
  },
  data() {
    return {
      iccid2Bind: "",
      bindNickName: "",
      showComfirmDlg: 0,
      toNextShow: 0,
      msg: "",
      toNextMsg: "",
      toNextType: -1,
      bindIccid: ""
    };
  },
  created() {},

  computed: {
    ...mapGetters("card", {
      bindInfo: "getBindInfo"
    })
  },
  methods: {
    scan: function() {
      let params = {};
      let url = window.location.href.split("#")[0];
      params.url = url;
      api.wxSign(
        res => {
          if (res.data.resultCode == 0) {
            let wxSign = res.data.data;
            let that = this;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: wxSign.appId, // 必填，公众号的唯一标识
              timestamp: wxSign.timestamp, // 必填，生成签名的时间戳
              nonceStr: wxSign.nonceStr, // 必填，生成签名的随机串
              signature: wxSign.signature, // 必填，签名
              jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
            });
            wx.ready(function() {
              wx.checkJsApi({
                jsApiList: ["scanQRCode"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                  // 以键值对的形式返回，可用的api值true，不可用为false
                  // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                  console.log(JSON.stringify(res));
                  wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function(res) {
                      // alert(JSON.stringify(res))
                      let iccid = res.resultStr.split("CODE_128,")[1];
                      if (!iccid) {
                        iccid = res.resultStr;
                      }
                      if (!iccid && iccid.length !== 19) {
                        return;
                      }
                      // alert(iccid)
                      that.iccid2Bind = iccid;
                    }
                  });
                }
              });
              wx.hideAllNonBaseMenuItem();
            });
          }
        },
        null,
        params
      );
    },
    bind: function() {
      if (this.iccid2Bind.length != 19) {
        this.showComfirmDlg = 1;
        this.msg = "请输入正确的19位卡号";
        return;
      }
      let that = this;
      this.checkCardBindStatus(this.iccid2Bind, ret => {
        if (ret.showComfirmDlg == 0) {
          that.bindCard(that.iccid2Bind);
        } else {
          this.showComfirmDlg = ret.showComfirmDlg;
          this.msg = ret.msg;
        }
      });
    },
    toUsageInfo:function(){
        this.$router.push({
          name: "UsageInfo"
        });
    },
    toNext: function() {
      if (this.toNextType == 0) {
        this.$router.push({
          name: "UsageDetails",
          query: {
            iccid: this.bindIccid
          }
        });
      } else if (this.toNextType == 1) {
        this.$router.push({ name: "ToCertified" });
      }
    },
    hideToNextMsgDlg: function() {
      this.toNextShow = 0;
    },
    hideMsgDlg: function() {
      this.showComfirmDlg = 0;
    },
    checkCardBindStatus: function(iccid, callback) {
      let queryParams = {};
      queryParams.iccid19 = iccid;
      let ret = {};
      this.$store.dispatch("card/queryCardBindInfo", queryParams).then(
        response => {
          if (response.data.resultCode == -1) {
            ret.showComfirmDlg = 1;
            ret.msg = response.data.resultInfo;
            callback(ret);
          } else {
            ret.showComfirmDlg = 0;
            callback(ret);
          }
        },
        error => {
          ret.showComfirmDlg = 1;
          ret.msg = "绑卡失败！" + JSON.stringify(error);
          callback(ret);
        }
      );
    },
    bindCard: function(iccid) {
      let queryParams = {};
      queryParams.iccid = iccid;
      this.$store.dispatch("card/bindCard", queryParams).then(
        response => {
          if (response.data.resultCode == 0) {
            this.bindIccid = response.data.data.iccid;
            let authStatus = response.data.data.authStatus;
            let flowSurplusUsed = response.data.data.flowSurplusUsed;
            if (flowSurplusUsed <= 0) {
              this.toNextType = 0;
              this.toNextMsg =
                "该卡当前没有用量，暂时还不能使用，是否前往产品购买页面，购买相关流量产品？";
              this.toNextShow = 1;
              this.iccid2Bind = "";
            } else {
              if (authStatus == "uncertified") {
                //   this.showComfirmDlg = 1
                //   this.msg = '该卡当前没有实名，请前往中国联通实名官网进行实名'
                //   this.iccid2Bind = ''
                this.toNextType = 1;
                this.toNextMsg = "该卡还未开卡，无法使用，是否立即去开卡？";
                this.toNextShow = 1;
                this.iccid2Bind = "";
              } else if (authStatus == "authedSuccess") {
                // this.showComfirmDlg = 1;
                // this.msg = "卡绑定成功!";
                this.toUsageInfo()
                this.iccid2Bind = "";
              } else {
                this.showComfirmDlg = 1;
                this.msg = "无效的卡状态信息，请与客服联系!";
              }
            }
          } else {
            this.showComfirmDlg = 1;
            this.msg = "卡绑定失败!";
          }
        },
        error => {
          console.log("2:" + JSON.stringify(error));
        }
      );
    }
  }
};
</script>
<template>
  <div class="page">
    <div class="head">
      <img class="head-img" src="../../assets/bigflow-head.png" />
    </div>
    <div class="iccid">
      <table class="table">
        <tr>
          <td class="col-iccid-input">
            <input class="iccid-input" v-model="iccid2Bind" />
          </td>
          <td class="col-iccid-scan">
            <img class="scan" src="../../assets/scan.jpeg" @click="scan" />
          </td>
        </tr>
      </table>
    </div>
    <div class="button" @click="bind">确定</div>
    <div class="note">
      温馨提示：请根据下图提示完成开卡激活流程
    </div>
    <div class="card"></div>
    <AlertDlg
      v-if="showComfirmDlg == 1"
      @close="hideMsgDlg"
      :msg="msg"
    ></AlertDlg>
    <MsgDlg
      v-if="toNextShow == 1"
      @close="hideToNextMsgDlg"
      @ok="toNext"
      :msg="toNextMsg"
    ></MsgDlg>
  </div>
</template>

<style scoped lang="stylus">
.page{
    height 100%
}
.head{
    background gray
    height 30%
}
.head-img{
    height 100%
    width 100%
}
.iccid{
    background white
    height 10%
    width 90%
    margin-left 5%
    margin-top 10%
    margin-bottom 10%
    border-radius 15px;
    box-shadow  #666 0px 0px 10px;
}
.table{
    width 100%
}
.col-iccid-input{
    width:70%
    text-align center
}
.col-iccid-scan{
    width:20%
    text-align center
}
.iccid-input{
    width 95%
    height 60px
    display: inline-block
    margin-top:10px
    margin-left 20px
    border-radius 15px;
    background #dadada
    border 1px solid #dadada
}
.scan{
    width 60px
    height 60px
    margin-top 25px

}
.button{
    background #4388de
    width 90%
    height:6%
    border-radius 15px
    margin-left 5%
    color white
    font-size 45px
    align-items center
    display  -webkit-flex
    justify-content center
    display -webkit-flex
}
.note{
    margin 35px
    background: white
    height:20px
}
.card{
    margin 60px
    width: 5.8rem;
    height: 4.3rem;
    display block
    background  url(../../assets/card-demo.png) no-repeat 100% 100%;
    background-size: contain;
}
</style>
