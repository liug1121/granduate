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
import Vepie from 'v-charts/lib/pie.common';


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
    OtherAlert,
    Vepie
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
      otherAlertShow:false,
      chartData: {
        columns: ['日期', '新增车辆数据分析图'],
        rows: [
            { '日期': '1月1日', '新增车辆数据分析图': 123 },
            { '日期': '1月2日', '新增车辆数据分析图': 1223 },
            { '日期': '1月3日', '新增车辆数据分析图': 2123 },
            { '日期': '1月4日', '新增车辆数据分析图': 4123 },
            { '日期': '1月5日', '新增车辆数据分析图': 3123 },
            { '日期': '1月6日', '新增车辆数据分析图': 7123 }
        ]
        },
        statusChartData: {
        columns: ['在线', '车辆状态'],
        rows: [
            { '在线': '在线', '车辆状态': 123 },
            { '在线': '不在线', '车辆状态': 123 }
        ]
        }
    };
  },

  methods:{
      toView:function(page){
          if(page == 1){
                this.$router.push({ name: "Position"})
          }else if(page== 2){
                this.$router.push({ name: "Monitor"})
          }else if(page == 3){
                this.$router.push({ name: "Travel"})
          }else if(page == 4){
                this.$router.push({ name: "Material"})
          }
      },
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
            <div class = "head-tabs">
                <div class="head-tab" @click="toView(1)">首页</div>
                <div class="head-tab" @click="toView(2)">监控中心</div>
                <div class="head-tab" @click="toView(3)">轨迹回放</div>
                <div class="head-tab" @click="toView(4)">资料管理</div>
            </div>
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
            <div class="chart-left">
                 <div class="chart-statuses">
                     <div class="chart-status">车辆状态</div>
                     <div class="chart-status">车辆离线</div>
                 </div>
                 <Vepie class="veLine" :data="statusChartData"></Vepie>
            </div>
            <div class="chart-right">
                <div class="chart-days">
                    <div class="chart-day">12个月</div>
                    <div class="chart-day">30天</div>
                </div>
                <div>
                    <ve-line class="veLine" :data="chartData"></ve-line>
                </div>
                
            </div>
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
    </div>
</template>


<style scoped lang="stylus">
.container{
    border 1px solid #ddd
    height 1400px
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

.login{
    flex 1
    border 1px solid #ddd
}
.statics{
    height 35%
    border 1px solid #ddd
    margin 1%
}
.chart{
    height 50%
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
.head-tabs{
    flex 3
    display flex
}

.head-tab{
    flex 1
    text-align center
    height 80px
    line-height  80px
}
.chart-days{
    position relative
    top 600px
    display flex
    width 300px
    margin-left 40%
}
.chart-day{
    flex 1
    border 1px solid #ddd
    margin 20px
    text-align center
}
.chart-statuses{
    margin-top 20px
    display flex
    height 20%
    width 30%
    margin-left 70%
}
.chart-status{
    flex 1
    border 1px solid #ddd
    text-align center
    height 20%
    margin 10px
}
</style>