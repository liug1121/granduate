<script>
import Foucus from "./components/Foucus.vue";
import RemoveAlert from "./components/RemoveAlert.vue"
import LoseElectric from "./components/LoseElectric.vue"
import LongPark from "./components/LongPark.vue"
import TwoAlert from "./components/TwoPointAlert.vue"
import OutProvinceAlert from "./components/OutProvinceAlert.vue"
import UnusalAlert from "./components/UnusalAlert.vue"
import AreaAlert from "./components/AreaAlert.vue"
import OverSpeedAlert from "./components/OverSpeedAlert.vue"
import EmergeAlert from "./components/EmergeAlert.vue"
import OtherAlert from "./components/OtherAlert.vue"

export default {
  name: "positionHome",
  components: {
    Foucus,
    RemoveAlert,
    LoseElectric,
    LongPark,
    TwoAlert,
    OutProvinceAlert,
    UnusalAlert,
    AreaAlert,
    OverSpeedAlert,
    EmergeAlert,
    OtherAlert
  },
  data() {
    return {
      foucusDetailShow:false,
      removeAlertShow:false,
      lossElectric:false,
      longParkShow:false,
      twoAlertShow:false,
      outProvinceShow:false,
      unusalAlertShow:false,
      areaAlertShow:false,
      overSpeedAlertShow:false,
      emergeAlertShow:false,
      otherAlertShow:false
    };
  },
  methods:{
      openPop:function(type){
          if(type=='FOUCUS'){
              this.foucusDetailShow = true
          }else if(type == 'REMOVEALERT'){
              this.removeAlertShow = true
          }else if(type=='LOSSELECTRIC'){
              this.lossElectric =true
          }else if(type=='LONGPARK'){
              this.longParkShow =true
          }else if(type=='TWOALERT'){
              this.twoAlertShow =true
          }else if(type=='OUTPROVINCE'){
              this.outProvinceShow =true
          }else if(type=='UNUSAL'){
              this.unusalAlertShow =true
          }else if(type=='AREA'){
              this.areaAlertShow =true
          }else if(type=='OVERSPEED'){
              this.overSpeedAlertShow =true
          }else if(type=='EMERGE'){
              this.emergeAlertShow =true
          }else if(type=='OTHER'){
              this.otherAlertShow =true
          }
          
      },
      closePop:function(type){
          if(type=='FOUCUS'){
            this.foucusDetailShow = false
          }else if(type == 'REMOVEALERT'){
              this.removeAlertShow = false
          }else if(type =='LOSSELECTRIC'){
              this.lossElectric = false
          }else if(type=='LONGPARK'){
              this.longParkShow =false
          }else if(type=='TWOALERT'){
              this.twoAlertShow =false
          }else if(type=='OUTPROVINCE'){
              this.outProvinceShow =false
          }else if(type=='UNUSAL'){
              this.unusalAlertShow =false
          }else if(type=='AREA'){
              this.areaAlertShow =false
          }else if(type=='OVERSPEED'){
              this.overSpeedAlertShow =false
          }else if(type=='EMERGE'){
              this.emergeAlertShow =false
          }else if(type=='OTHER'){
              this.otherAlertShow =false
          }
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
                        <div class="statics-box" @click="openPop('FOUCUS')">重点关注</div>
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
                        <div class="statics-box" @click="openPop('REMOVEALERT')">拆除报警</div>
                    </td>
                    <td>
                        <div class="statics-box" @click="openPop('LOSSELECTRIC')">掉电报警</div>
                    </td>
                    <td>
                        <div class="statics-box" @click="openPop('LONGPARK')">超长停车</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="statics-box" @click="openPop('TWOALERT')">二押点报警</div>
                    </td>
                    <td>
                        <div class="statics-box" @click="openPop('OUTPROVINCE')">出省报警</div>
                    </td>
                    <td>
                        <div class="statics-box" @click="openPop('UNUSAL')">异常报警</div>
                    </td>
                    <td>
                        <div class="statics-box" @click="openPop('AREA')">区域报警</div>
                    </td>
                    <td>
                        <div class="statics-box" @click="openPop('OVERSPEED')">超速报警</div>
                    </td>
                    <td>
                        <div class="statics-box" @click="openPop('EMERGE')">紧急报警</div>
                    </td>
                    <td>
                        <div class="statics-box" @click="openPop('OTHER')">其他报警</div>
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
        @close="closePop('FOUCUS')"
        />
        <RemoveAlert
        id="removeAlert"
        v-show="removeAlertShow"
        @close="closePop('REMOVEALERT')"
        />
        <LoseElectric
        id="loseElectric"
        v-show="lossElectric"
        @close="closePop('LOSSELECTRIC')"
        />
        <LongPark
        id="longPark"
        v-show="longParkShow"
        @close="closePop('LONGPARK')"
        />
        <TwoAlert
        id="twoAlert"
        v-show="twoAlertShow"
        @close="closePop('TWOALERT')"
        />
        <OutProvinceAlert
        id="OutProvinceAlert"
        v-show="outProvinceShow"
        @close="closePop('OUTPROVINCE')"
        />
        <UnusalAlert
        id="UnusalAlert"
        v-show="unusalAlertShow"
        @close="closePop('UNUSAL')"
        />
        <AreaAlert
        id="AreaAlert"
        v-show="areaAlertShow"
        @close="closePop('AREA')"
        />
        <OverSpeedAlert
        id="OverSpeedAlert"
        v-show="overSpeedAlertShow"
        @close="closePop('OVERSPEED')"
        />
        <EmergeAlert
        id="EmergeAlert"
        v-show="emergeAlertShow"
        @close="closePop('EMERGE')"
        />
        <OtherAlert
        id="OtherAlert"
        v-show="otherAlertShow"
        @close="closePop('OTHER')"
        />
        OTHER
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