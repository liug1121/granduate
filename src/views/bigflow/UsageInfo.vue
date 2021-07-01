<script>
import { mapGetters } from "vuex";
export default {
  name: "UsageInfo",
  
  data() {
    return {
        
    };
  },
  created(){
      this.getCards()
  },

  computed: {
    ...mapGetters("card", {
      cardInfos: "getCardInfos"
    }),
    getCardInfos(){
        let cardInfos = this.cardInfos
        console.log(JSON.stringify(cardInfos))
        return cardInfos
    }
  },
  methods:{
      getCards:function(){
          this.$store.dispatch("card/getCardInfos");
      }
  }
};
</script>
<template>
    <div class="page">
        <div class="useage" v-for="(record, index) in getCardInfos"
                      :key="index">
            <table>
                <tr>
                    <td>设备名称：</td>
                    <td class="order-info">{{record.phoneNumber}}</td>
                </tr>
                <tr>
                    <td>MSISDN：</td>
                    <td class="order-info">{{record.phoneNumber}}</td>
                </tr>
                <tr>
                    <td>ICCID：</td>
                    <td class="order-info">{{record.iccid}}</td>
                </tr>
                <tr>
                    <td>当前套餐：</td>
                    <td class="order-info">{{record.currentMeal}}</td>
                </tr>
                <tr>
                    <td>当月剩余：</td>
                    <td class="order-info">{{record.flowSurplusUsed}}</td>
                </tr>
            </table>
            <div class="buttons">
                <div class="button-unbind">解绑</div>
                <div class="button-detail">详情</div>
            </div>
        </div>
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
</style>
