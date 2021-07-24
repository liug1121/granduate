<script>
import MsgDlg from "./MsgDlg.vue";
import { mapGetters } from "vuex";
export default {
  name: "UsageInfo",
  components: {
    MsgDlg
  },
  data() {
    return {
      showComfirmDlg: 0,
      iccidForUnbind: ""
    };
  },
  created() {
    this.getCards();
  },

  computed: {
    ...mapGetters("card", {
      cardInfos: "getCardInfos",
      bindStatus: "getBindStatus"
    }),
    getCardInfos() {
      let cardInfos = this.cardInfos;
      return cardInfos;
    }
  },
  methods: {
    shwoMsgDlg: function(iccid) {
      this.showComfirmDlg = 1;
      this.iccidForUnbind = iccid;
    },
    hideMsgDlg: function() {
      this.showComfirmDlg = 0;
    },
    unbindCard: function() {
      let queryParams = {};
      queryParams.iccid = this.iccidForUnbind;
      this.$store.dispatch("card/unbindCard", queryParams);
      this.showComfirmDlg = 0;
    },
    getCards: function() {
      this.$store.dispatch("card/getCardInfos");
    },
    toBind: function() {
      this.$router.push({ name: "Bind" });
    },
    toDetail: function(iccid) {
      this.$router.push({
        name: "UsageDetails",
        query: {
          iccid: iccid
        }
      });
    }
  }
};
</script>
<template>
  <div class="page">
    <div v-if="bindStatus == 1">
      <div class="useage" v-for="(record, index) in getCardInfos" :key="index">
        <table>
          <tr>
            <td>设备名称：</td>
            <td class="order-info">{{ record.phoneNumber }}</td>
          </tr>
          <tr>
            <td>MSISDN：</td>
            <td class="order-info">{{ record.phoneNumber }}</td>
          </tr>
          <tr>
            <td>ICCID：</td>
            <td class="order-info">{{ record.iccid }}</td>
          </tr>
          <tr>
            <td>当前套餐：</td>
            <td class="order-info">{{ record.currentMeal }}</td>
          </tr>
          <tr>
            <td>当月剩余：</td>
            <td class="order-info">{{ record.flowSurplusUsed }}</td>
          </tr>
        </table>

        <div class="buttons">
          <div class="button-unbind" @click="shwoMsgDlg(record.iccid20)">
            解绑
          </div>
          <div class="button-detail" @click="toDetail(record.iccid20)">
            详情
          </div>
        </div>
      </div>
      <div class="addcard" @click="toBind">+</div>
    </div>
    <div class="addcardpage" v-else>
      <div class="note">当前没有绑定任何卡</div>
      <div class="addcard" @click="toBind">+</div>
    </div>
    <MsgDlg
      v-if="showComfirmDlg == 1"
      @close="hideMsgDlg"
      @ok="unbindCard"
      msg="确认解除绑定？"
    ></MsgDlg>
  </div>
</template>
<style scoped lang="stylus">
.page{
    background #f6f6f6
    height 100%
    width 100%
}
.useage{
    height 33%
    border-radius 15px;
    background white
    margin 20px
}
table{
    margin 30px
    width 90%
}
tr{
    height 50px
}
.order-info{
    text-align right
}
.buttons{
    display flex
    text-align center
    color white
}
.button-unbind{
    flex 1
    background #e9975a
    height 60px
    margin 20px
    line-height 60px
}
.button-detail{
    flex 1
    background #5388df
    height 60px
    margin 20px
    line-height 60px
}
.note{
    text-align center
    font-size 50px
    color gray
}
.addcard{
    text-align center
    font-size 80px
    color gray
}
.addcardpage{
    padding-top 20%
}
</style>
