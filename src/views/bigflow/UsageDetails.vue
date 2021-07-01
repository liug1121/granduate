<script>
// import { mapGetters } from "vuex";
export default {
  name: "UsageInfo",
  
  data() {
    return {
        iccid:''
    };
  },
  created(){
      this.iccid = this.$route.query.iccid
      console.log('iccid:' + this.iccid)
  },

  computed: {
    
  },
  methods:{
      
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
               <div>手机号：18767656789</div>
               <div>ICCIC编码：88888888888888888888</div>
           </div>
       </div>
       <div class="detail">
           <div class="detail-title">套餐详情</div>
           <div class="detail-button">剩余3.00G</div>
           <div class="detail-note">
               <div>您的套餐：3G/每月 x 2个月</div>
               <div>有效期：2021年05月15日-2021年07月26日</div>
           </div>
       </div>
       <div class="buys">
           <div class="buys-menus">
               <div class="buys-menu-selected">购买套餐</div>
               <div class="buys-menu">加油包</div>
           </div>
           <div class="buys-products">
               <div class="buys-product">
                   <div class="product-icon">
                       <img class="product-icon-image" src="../../assets/bigflow-buys.jpeg" />
                   </div>
                   <div class="product-info">
                       <div>5G全国加油包</div>
                       <div>5G全国流量，当月有效</div>
                   </div>
                   <div class="product-price">
                       <div>现价：¥6.00</div>
                       <div>原价：¥10.00</div>
                   </div>
               </div>
               <div class="buys-product">
                   <div class="product-icon">
                       <img class="product-icon-image" src="../../assets/bigflow-buys.jpeg" />
                   </div>
                   <div class="product-info">
                       <div>5G全国加油包</div>
                       <div>5G全国流量，当月有效</div>
                   </div>
                   <div class="product-price">
                       <div>现价：¥6.00</div>
                       <div>原价：¥10.00</div>
                   </div>
               </div>
               <div class="buys-product">
                   <div class="product-icon">
                       <img class="product-icon-image" src="../../assets/bigflow-buys.jpeg" />
                   </div>
                   <div class="product-info">
                       <div>5G全国加油包</div>
                       <div>5G全国流量，当月有效</div>
                   </div>
                   <div class="product-price">
                       <div>现价：¥6.00</div>
                       <div>原价：¥10.00</div>
                   </div>
               </div>
               <div class="buys-product">
                   <div class="product-icon">
                       <img class="product-icon-image" src="../../assets/bigflow-buys.jpeg" />
                   </div>
                   <div class="product-info">
                       <div>5G全国加油包</div>
                       <div>5G全国流量，当月有效</div>
                   </div>
                   <div class="product-price">
                       <div>现价：¥6.00</div>
                       <div>原价：¥10.00</div>
                   </div>
               </div>
           </div>
       </div>
       <div class="buy-btn">购买</div>
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
    margin 30px
}
.buys-product{
    margin 30px
    height 100px
    border-bottom 1px solid #ddd
    display flex
}
.product-icon{
    flex 1
}
.product-info{
    flex 3
    border-right 1px solid #ddd
    margin-bottom 10px
}
.product-price{
    flex 2
    margin-left 20px
}
.product-icon-image{
    width 80px
    height 80px
}
.buy-btn{
    width 80%
    height 60px
    text-align center
    line-height 60px
    margin-left 10%
    background #4388de 
    border-radius 15px;
    color white
}
</style>
