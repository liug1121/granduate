<script>
import MsgDlg from "./MsgDlg.vue"
import { mapGetters } from "vuex";
export default {
  name: "Bind",
  components: {
    MsgDlg
  },
  data() {
    return {
        iccid2Bind:'8986061912003378900',
        bindNickName:'',
        showComfirmDlg:0,
        msg:''
        // showComfirmDlg: 0,
        // iccidForUnbind:''
    };
  },
  created(){
    //   this.getCards()
    
  },

  computed: {
    ...mapGetters("card", {
      bindInfo: "getBindInfo"
    }),
    // ...mapGetters("card", {
    //   cardInfos: "getCardInfos",
    //   bindStatus:"getBindStatus"
    // }),
  },
  methods:{
      bind:function(){
          this.bindCard(this.iccid2Bind)
      },
      hideMsgDlg:function(){
          this.showComfirmDlg = 0
      },
      bindCard:function(iccid){
          let queryParams = {}
          queryParams.iccid19 = iccid
          this.$store.dispatch("card/queryCardBindInfo", queryParams).then(response => {
              console.log('1:' + JSON.stringify(response))
              if(response.data.resultCode == -1){
                  this.showComfirmDlg = 1
                  this.msg = '该卡已经绑定用户' + response.data.data.weixin
              }else{
                  this.showComfirmDlg = 0
              }
            // console.log("Got some data, now lets show something in this component")
        }, error => {
            console.log("2:" + JSON.stringify(error))
            // console.error("Got nothing from server. Prompt user to check internet connection and try again")
        });
      }
    //   shwoMsgDlg:function(iccid){
    //     this.showComfirmDlg = 1
    //     this.iccidForUnbind = iccid
    //   },
    //   hideMsgDlg:function(){
    //       this.showComfirmDlg = 0
    //   },
    //   unbindCard:function(){
    //       let queryParams = {}
    //       queryParams.iccid = this.iccidForUnbind
    //       this.$store.dispatch("card/unbindCard", queryParams);
    //     this.showComfirmDlg = 0
    //   },
    //   getCards:function(){
    //       this.$store.dispatch("card/getCardInfos");
    //   },
    //   toBind:function(){
    //     this.$router.push({ name: "Bind"})
    //   },
    //   toDetail:function(iccid){
    //     this.$router.push({ name: "UsageDetails",
    //     query: {
    //         iccid: iccid
    //       }})
    //   }
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
                        <input class="iccid-input">
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
        <MsgDlg v-if="showComfirmDlg == 1" @close="hideMsgDlg" @ok="hideMsgDlg" :msg="msg"></MsgDlg>
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
    height 80px
    display: inline-block
    margin-top:20px
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