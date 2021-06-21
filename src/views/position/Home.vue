<script>
import Foucus from "./components/Foucus.vue";
export default {
  name: "positionHome",
  components: {
    Foucus
  },
  data() {
    return {
      foucusDetailShow:false
    };
  },
  methods:{
      openFoucus:function(){
          this.foucusDetailShow = true
      },
      closeFoucus:function(){
          this.foucusDetailShow = false
      }
  }
};
</script>
<template>
    <div class="container">
        <div class="head">
            <div class="logo">logo</div>
            <div class = "tab">tab</div>
            <div class="login">login</div>
        </div>
        <div class="statics">
            <table>
                <tr>
                    <td>
                        <div class="statics-box" @click="openFoucus()">重点关注</div>
                    </td>
                    <td>
                        <div class="statics-box">风险车辆</div>
                    </td>
                    <td>
                        <div class="statics-box">多设备离线</div>
                    </td>
                    <td>
                        <div class="statics-box">分离报警</div>
                    </td>
                    <td>
                        <div class="statics-box" >拆除报警</div>
                    </td>
                    <td>
                        <div class="statics-box">掉电报警</div>
                    </td>
                    <td>
                        <div class="statics-box">超长停车</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="statics-box">二押点报警</div>
                    </td>
                    <td>
                        <div class="statics-box">出省报警</div>
                    </td>
                    <td>
                        <div class="statics-box">异常报警</div>
                    </td>
                    <td>
                        <div class="statics-box">区域报警</div>
                    </td>
                    <td>
                        <div class="statics-box">超速报警</div>
                    </td>
                    <td>
                        <div class="statics-box">紧急报警</div>
                    </td>
                    <td>
                        <div class="statics-box">其他报警</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="chart">
            <div class="chart-left"> chart-left</div>
            <div class="chart-right">chart-right</div>
        </div>
        <Foucus
        id="foucusDetails"
        v-show="foucusDetailShow"
        @close="closeFoucus"
        />
    </div>
</template>


<style scoped lang="stylus">
.container{
    border 1px solid #ddd
    height 100%
    width 100%
}
.head{
    height 8%
    border 1px solid #ddd
    margin 1%
    display flex
    padding 3px
}
.logo{
    flex 1
    border 1px solid #ddd
}
.tab{
    flex 3
    border 1px solid #ddd
}
.login{
    flex 1
    border 1px solid #ddd
}
.statics{
    height 60%
    border 1px solid #ddd
    margin 1%
}
.chart{
    height 22%
    border 1px solid #ddd
    margin 1%
    display flex
    padding 2px
}
.chart-left{
    flex 1
    border 1px solid #ddd
}
.chart-right{
    flex 1
    border 1px solid #ddd
}
.statics-box{
    width 200px
    height 200px
    border 1px solid #ddd
    text-align center
    line-height  200px
    margin-top 30px
    margin-left 60px
}

</style>