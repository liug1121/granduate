<script>
import api from "../../api/api";
import MsgDlg from "./MsgDlg.vue"
import AlertDlg from "./AlertDlg.vue"
import { mapGetters } from "vuex";
export default {
  name: "UsageInfo",
  components: {
    MsgDlg,
    AlertDlg
  },
  
  data() {
    return {
        alertMsg:'',
        showComfirmDlg:0,
        showAlertDlg:0,
        selectedRow:-1,
        iccid:'',
        tabIndex:0,
        tabAddPackageClass:'buys-menu-selected',
        tabPackageClass:'buys-menu',
        product2Buy:{}
    };
  },
  created(){
      this.iccid = this.$route.query.iccid
      console.log('iccid:' + this.iccid)
      this.getDetails(this.iccid)
      this.getAddPackages(this.iccid)
      this.getPackages(this.iccid)
  },

  computed: {
    ...mapGetters("card", {
      cardDetails: "getCardDetails",
    }),
    ...mapGetters("bigFlowPackage", {
      addPackages:"getAddPackagesForCard",
      packages:"getPackagesForCard"
    }),
  },
  methods:{
      hideMsgDlg:function(){
          this.showComfirmDlg = 0
      },
      hideAlertMsgDlg:function(){
          this.showAlertDlg = 0
      },
      shouBuy:function(){
          this.showComfirmDlg = 1
      },
      buyProduct:function(){
        let buyParams = {}
        buyParams = this.product2Buy
        console.log(JSON.stringify(buyParams))
        this.$store.dispatch("buyRecords/buy", buyParams).then(response => {
            if(response.data.resultCode == 0){
                this.showComfirmDlg = 0
                let payParams = {}
                payParams.appId = response.data.data.appId
                payParams.timeStamp = response.data.data.timeStamp
                payParams.nonceStr =  response.data.data.nonceStr
                payParams.package = response.data.data.pkg
                payParams.paySign = response.data.data.paySign
                payParams.signType = response.data.data.signType
                api.weixinPay(payParams, res=>{
                    if(res.resultCode == 0){
                        this.alertMsg = '您已经成功购买该商品!'
                        this.showAlertDlg = 1
                    }else{
                        this.alertMsg = '支付失败，请与客服联系!'
                        this.showAlertDlg = 1
                    }
                })
            }else{
                this.alertMsg = '您暂时不能购买该商品，请与客服联系!'
                this.showAlertDlg = 1
                this.showComfirmDlg = 0
            }
        }, error => {
            console.log("2:" + JSON.stringify(error))
            this.alertMsg = '卡绑定失败!'
            this.showAlertDlg = 1
            this.showComfirmDlg = 0
            
        });
          
      },
      selRow:function(row, productCode){
          this.selectedRow = row
          let product = {}
          product.iccid = this.iccid
          product.pdCode = productCode
          product.body='套餐购买'
          this.product2Buy = product
      },
      getRowClass:function(row){
          if(this.selectedRow == row){
            return 'buys-product-selected'
          }
          else{
            return 'buys-product'
          }
            
      },
      changeTab:function(tabIndex){
          this.tabIndex = tabIndex
          if(this.tabIndex == 0){
            this.tabAddPackageClass ='buys-menu-selected'
            this.tabPackageClass = 'buys-menu'
          }else if(this.tabIndex == 1){
            this.tabAddPackageClass ='buys-menu'
            this.tabPackageClass = 'buys-menu-selected'
          }
      },
      getDetails:function(iccid){
          let queryParams = {}
          queryParams.iccid = iccid
          this.$store.dispatch("card/getCardDetails", queryParams);
      },
      getAddPackages:function(iccid){
         let queryParams = {}
          queryParams.iccid = iccid
          this.$store.dispatch("bigFlowPackage/callAddPackagesForCard", queryParams); 
      },
      getPackages:function(iccid){
         let queryParams = {}
          queryParams.iccid = iccid
          this.$store.dispatch("bigFlowPackage/callPackagesForCard", queryParams); 
      }
  }
};
</script>
<template>
    <div class="page">
       <div class="head">
           <div class = "head-img">
               <img class="head-img-image" src="../../assets/bigflow-person.jpeg" />
           </div>
           
           <div class="head-card">
               <div>手机号：{{cardDetails.phone_number}}</div>
               <div>ICCIC编码：{{cardDetails.iccid}}</div>
           </div>
       </div>
       <div class="detail">
           <div class="detail-title">套餐详情</div>
           <div class="detail-button">剩余{{cardDetails.flowSurplusUsed}}</div>
           <div class="detail-note">
               <div>您的套餐：{{cardDetails.currentMeal}}</div>
               <div>有效期：{{cardDetails.mealStartDate}}-{{cardDetails.mealEndDate}}</div>
           </div>
       </div>
       <div class="buys">
           <div class="buys-menus">
               <div :class="tabAddPackageClass" @click="changeTab(0)">购买套餐</div>
               <div :class="tabPackageClass"  @click="changeTab(1)">加油包</div>
           </div>
           <div class="buys-products" v-if="tabIndex ==1">
               <div :class="getRowClass(index)" v-for="(addpackage, index) in addPackages"
                      :key="index" @click="selRow(index,addpackage.productCode)">
                   <div class="product-icon">
                       <img class="product-icon-image" src="../../assets/bigflow-buys.jpeg" />
                   </div>
                   <div class="product-info">
                       <div>{{addpackage.viewName}}</div>
                       <div>{{addpackage.memo}}</div>
                   </div>
                   <div class="product-price">
                       <div><span class="price">现价：¥{{addpackage.price}}</span></div>
                       <div class="old-price">原价：¥{{addpackage.originalPrice}}</div>
                   </div>
               </div>
           </div>
           <div class="buys-products" v-if="tabIndex ==0">
               <div class="buys-product" v-for="(pkg, index) in packages"
                      :key="index">
                   <div class="product-icon">
                       <img class="product-icon-image" src="../../assets/bigflow-buys.jpeg" />
                   </div>
                   <div class="product-info">
                       <div>{{pkg.productName}}</div>
                       <div>{{pkg.memo}}</div>
                   </div>
                   <div class="product-price">
                       <div class="price">现价：¥{{pkg.price}}</div>
                       <div class="old-price">原价：¥{{pkg.originalPrice}}</div>
                   </div>
               </div>
           </div>
       </div>
       <div class="footer">
           <div class="buy-btn" @click="shouBuy">购买</div>
       </div>
       <MsgDlg v-if="showComfirmDlg == 1" @close="hideMsgDlg" @ok="buyProduct" msg="确认购买该商品吗？"></MsgDlg>
       <AlertDlg v-if="showAlertDlg == 1" @close="hideAlertMsgDlg" :msg="alertMsg"></AlertDlg>
    </div>
</template>
<style scoped lang="stylus">
.page{
    background #f6f6f6
    height 100%
    width 100%
}
.head{
    height 15%
    margin 30px
    border-radius 15px;
    background white
    display flex
    background #4388de
}
.head-img{
    flex 1
}
.head-img-image{
    width 150px
    height 150px
    margin 20px
    margin-left 50px
    border-radius 100px;
}
.head-card{
    flex 2
    padding-top 60px
    color white
}
.detail{
    height 20%
    margin 30px
    border-radius 15px;
    background white
}
.buys{
    height 50%
    margin 30px
    border-radius 15px;
    background white
}
.detail-button{
    margin 30px
    margin-left 10%
    width 80%
    background #4388de
    border-radius 15px;
    height 50px
    line-height 50px
    text-align center
}
.detail-title{
    font-size 40px
    margin 30px
}
.detail-note{
    margin 30px
}
.buys-menus{
    display flex
    text-align center
    font-size 30px
    margin 30px
}
.buys-menu{
    flex 1
    height 50px
    line-height 50px
}
.buys-menu-selected{
    flex 1
    height 50px
    line-height 50px
    border-bottom 1px solid #ddd
}
.buys-products{
    margin 5px
}
.buys-product{
    margin 5px
    height 110px
    border-bottom 1px solid #ddd
    display flex
}
.buys-product-selected{
    margin 5px
    height 110px
    border-bottom 1px solid #ddd
    display flex
    background #fafddb
}
.product-icon{
    flex 1
}
.product-info{
    flex 4
    border-right 1px solid #ddd
    
}
.product-price{
    flex 2
    margin-left 20px
}
.product-icon-image{
    width 80px
    height 80px
}
.footer{
    position fixed
    width 100%
    background white
    top 90%

}
.buy-btn{
    width 80%
    height 80px
    text-align center
    line-height 80px
    margin-left 10%
    background #4388de 
    border-radius 15px;
    color white
}
.price{
    color red
}
.old-price{
    text-decoration:line-through
    color gray
}
</style>
