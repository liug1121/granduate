<script>
import { mapGetters } from "vuex";
export default {
  name: "PayRecord",

  data() {
    return {
      phone: 1400023678900,
      iccid: "89860619120033789009"
    };
  },
  created() {
    this.getBuyRecords(this.iccid);
  },
  computed: {
    ...mapGetters("buyRecords", {
      buyRecords: "getBuyRecords"
    }),
    getRecords() {
      let buyRecords = this.buyRecords;
      return buyRecords;
    }
  },
  methods: {
    getBuyRecords: function() {
      // let queryParams = {};
      // queryParams.iccid = iccid;
      this.$store.dispatch("buyRecords/getBuyRecords");
    }
  }
};
</script>
<template>
  <div class="page">
    <!-- <div class="cardinfo">
      <div class="phone">号码：{{ phone }}</div>
      <div class="iccid">iccid：{{ iccid }}</div>
    </div> -->
    <div class="orderinfo" v-for="(record, index) in getRecords" :key="index">
      <table>
        <tr>
          <td>时间：</td>
          <td class="order-info">{{ record.gmtCreate }}</td>
        </tr>
        <tr>
          <td>套餐订购：</td>
          <td class="order-info">{{ record.viewName }}</td>
        </tr>
        <tr>
          <td>金额：</td>
          <td class="order-info">¥{{ record.price }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.page{
    background #f6f6f6
    height 100%
    width 100%
}
.cardinfo{
    height 8%
    background white
    margin 20px
    padding 20px
    font-size 30px
    border-radius 15px;
}

.orderinfo{
    height 15%
    background white
    margin 20px
    border-radius 15px;
    font-siz 30px
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
</style>
