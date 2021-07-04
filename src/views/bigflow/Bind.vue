<script>
import AlertDlg from "./AlertDlg.vue"
import { mapGetters } from "vuex";
export default {
  name: "Bind",
  components: {
    AlertDlg
  },
  data() {
    return {
        iccid2Bind:'',
        bindNickName:'',
        showComfirmDlg:0,
        msg:''
    };
  },
  created(){
    
  },

  computed: {
    ...mapGetters("card", {
      bindInfo: "getBindInfo"
    })
  },
  methods:{
      bind:function(){
          if(this.iccid2Bind.length!= 19){
              this.showComfirmDlg = 1
              this.msg="请输入正确的19位卡号"
              return
          }
          let that = this
          this.checkCardBindStatus(this.iccid2Bind, ret=>{
              if(ret.showComfirmDlg == 0){
                  that.bindCard(that.iccid2Bind)
              }else{
                    this.showComfirmDlg = ret.showComfirmDlg
                    this.msg = ret.msg
              }
          })
      },
      hideMsgDlg:function(){
          this.showComfirmDlg = 0
      },
      checkCardBindStatus:function(iccid, callback){
          let queryParams = {}
          queryParams.iccid19 = iccid
          let ret = {}
          this.$store.dispatch("card/queryCardBindInfo", queryParams).then(response => {
              if(response.data.resultCode == -1){
                  ret.showComfirmDlg = 1
                  ret.msg = response.data.resultInfo
                  callback(ret)
              }else{
                  ret.showComfirmDlg = 0
                  callback(ret)
              }
        }, error => {
            ret.showComfirmDlg = 1
            ret.msg = '绑卡失败！' + JSON.stringify(error)
            callback(ret)
        });
      },
      bindCard:function(iccid){
          let queryParams = {}
          queryParams.iccid = iccid
          this.$store.dispatch("card/bindCard", queryParams).then(response => {
              if(response.data.resultCode == 0){
                  this.showComfirmDlg = 1
                  this.msg = '卡绑定成功!'
              }else{
                this.showComfirmDlg = 1
                  this.msg = '卡绑定失败!'
              }
        }, error => {
            console.log("2:" + JSON.stringify(error))
            
        });
      }
  }
};
</script>
<template>
    <div class="page">
        <div class="head">
            <img class="head-img" src="../../assets/bigflow-head.jpeg" />
        </div>
        <div class="iccid">
            <table class="table">
                <tr>
                    <td class="col-iccid-input">
                        <input class="iccid-input" v-model="iccid2Bind">
                    </td>
                    <td class="col-iccid-scan">
                        <img class="scan" src="../../assets/scan.jpeg" />
                    </td>
                </tr>
            </table>
        </div>
        <div class="button" @click="bind">确定</div>
        <div class="note">
            温馨提示：请根据相应提示完成开卡激活流程
        </div>
        <AlertDlg v-if="showComfirmDlg == 1" @close="hideMsgDlg" :msg="msg"></AlertDlg>
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
    height:20%
}
</style>