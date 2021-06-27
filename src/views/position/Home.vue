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
      line12Class:'chart-day-selected',
      line30Class:'chart-day',
      piCarStatusClass:'chart-status-selected',
      piCarOfflineClass:'chart-status',
      foucusDetailClass:'statics-box',
      foucusDetailShow:false,
      removeAlertClass:'statics-box',
      removeAlertShow:false,
      lossElectricClass:'statics-box',
      lossElectric:false,
      longParkClass:'statics-box',
      longParkShow:false,
      twoAlertClass:'statics-box',
      twoAlertShow:false,
      outProvinceClass:'statics-box',
      outProvinceShow:false,
      unusalAlertClass:'statics-box',
      unusalAlertShow:false,
      areaAlertClass:'statics-box',
      areaAlertShow:false,
      overSpeedAlertClass:'statics-box',
      overSpeedAlertShow:false,
      emergeAlertClass:'statics-box',
      emergeAlertShow:false,
      otherAlertClass:'statics-box',
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
      lineChartSelect:function(type){
          if(type == 1){
              this.line12Class = 'chart-day-selected'
              this.line30Class = 'chart-day'
          }else if(type ==2){
              this.line12Class = 'chart-day'
              this.line30Class = 'chart-day-selected'
          }
      },
      piChartSelect:function(type){
          if(type == 1){
              this.piCarStatusClass= 'chart-status-selected'
              this.piCarOfflineClass = 'chart-status'
          }else if(type ==2){
              this.piCarStatusClass= 'chart-status'
              this.piCarOfflineClass = 'chart-status-selected'
          }
      },
      mouseOver:function(type){
          if(type=='FOUCUS'){
              this.foucusDetailClass = 'statics-box-selected'
          }else if(type == 'REMOVEALERT'){
              this.removeAlertClass = 'statics-box-selected'
          }else if(type=='LOSSELECTRIC'){
              this.lossElectricClass ='statics-box-selected'
          }else if(type=='LONGPARK'){
              this.longParkClass ='statics-box-selected'
          }else if(type=='TWOALERT'){
              this.twoAlertClass ='statics-box-selected'
          }else if(type=='OUTPROVINCE'){
              this.outProvinceClass ='statics-box-selected'
          }else if(type=='UNUSAL'){
              this.unusalAlertClass ='statics-box-selected'
          }else if(type=='AREA'){
              this.areaAlertClass ='statics-box-selected'
          }else if(type=='OVERSPEED'){
              this.overSpeedAlertClass ='statics-box-selected'
          }else if(type=='EMERGE'){
              this.emergeAlertClass ='statics-box-selected'
          }else if(type=='OTHER'){
              this.otherAlertClass ='statics-box-selected'
          }
      },
      mouseLeave:function(type){
          if(type=='FOUCUS'){
              this.foucusDetailClass = 'statics-box'
          }else if(type == 'REMOVEALERT'){
              this.removeAlertClass = 'statics-box'
          }else if(type=='LOSSELECTRIC'){
              this.lossElectricClass ='statics-box'
          }else if(type=='LONGPARK'){
              this.longParkClass ='statics-box'
          }else if(type=='TWOALERT'){
              this.twoAlertClass ='statics-box'
          }else if(type=='OUTPROVINCE'){
              this.outProvinceClass ='statics-box'
          }else if(type=='UNUSAL'){
              this.unusalAlertClass ='statics-box'
          }else if(type=='AREA'){
              this.areaAlertClass ='statics-box'
          }else if(type=='OVERSPEED'){
              this.overSpeedAlertClass ='statics-box'
          }else if(type=='EMERGE'){
              this.emergeAlertClass ='statics-box'
          }else if(type=='OTHER'){
              this.otherAlertClass ='statics-box'
          }
      },
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
            <div class="logo">
                <img class="logo-img-union" src="../../assets/logo_new.png" />
                <div class="logo-img-yanfei">
                    <img class="logo-img-yanfei-image" src="../../assets/logo_yanfei.png" />
                </div>
                <div class="logo-title">联通物联网公司</div>
            </div>
            <div class = "head-tabs">
                <div class="head-tab" @click="toView(1)">首页</div>
                <div class="head-tab" @click="toView(2)">监控中心</div>
                <div class="head-tab" @click="toView(3)">轨迹回放</div>
                <div class="head-tab" @click="toView(4)">资料管理</div>
            </div>
            <div class="login">
                <div class="login-left">
                    <img class="login-left-image" src="../../assets/user_pic.png" />
                </div>
                <div class="login-right">taojiangmin</div>
            </div>
        </div>
        <div class="statics">
            <table>
                <tr>
                    <td>
                        <div :class="foucusDetailClass" @click="openPop('FOUCUS')"
                        @mouseover="mouseOver('FOUCUS')" 
        	            @mouseleave="mouseLeave('FOUCUS')" >重点关注</div>
                    </td>
                    <td>
                        <div class="statics-box" >风险车辆</div>
                    </td>
                    <td>
                        <div class="statics-box" >多设备离线</div>
                    </td>
                    <td>
                        <div class="statics-box" >分离报警</div>
                    </td>
                    <td>
                        <div :class="removeAlertClass" @mouseover="mouseOver('REMOVEALERT')" 
        	            @mouseleave="mouseLeave('REMOVEALERT')" @click="openPop('REMOVEALERT')">拆除报警</div>
                    </td>
                    <td>
                        <div :class="lossElectricClass"  @mouseover="mouseOver('LOSSELECTRIC')" 
        	            @mouseleave="mouseLeave('LOSSELECTRIC')" @click="openPop('LOSSELECTRIC')">掉电报警</div>
                    </td>
                    <td>
                        <div :class="longParkClass" @mouseover="mouseOver('LONGPARK')" 
        	            @mouseleave="mouseLeave('LONGPARK')" @click="openPop('LONGPARK')">超长停车</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div :class="twoAlertClass" @mouseover="mouseOver('TWOALERT')" 
        	            @mouseleave="mouseLeave('TWOALERT')" @click="openPop('TWOALERT')">二押点报警</div>
                    </td>
                    <td>
                        <div :class="outProvinceClass" @mouseover="mouseOver('OUTPROVINCE')" 
        	            @mouseleave="mouseLeave('OUTPROVINCE')" @click="openPop('OUTPROVINCE')">出省报警</div>
                    </td>
                    <td>
                        <div :class="unusalAlertClass" @mouseover="mouseOver('UNUSAL')" 
        	            @mouseleave="mouseLeave('UNUSAL')" @click="openPop('UNUSAL')">异常报警</div>
                    </td>
                    <td>
                        <div :class="areaAlertClass" @mouseover="mouseOver('AREA')" 
        	            @mouseleave="mouseLeave('AREA')" @click="openPop('AREA')">区域报警</div>
                    </td>
                    <td>
                        <div :class="overSpeedAlertClass" @mouseover="mouseOver('OVERSPEED')" 
        	            @mouseleave="mouseLeave('OVERSPEED')" @click="openPop('OVERSPEED')">超速报警</div>
                    </td>
                    <td>
                        <div :class="emergeAlertClass" @mouseover="mouseOver('EMERGE')" 
        	            @mouseleave="mouseLeave('EMERGE')" @click="openPop('EMERGE')">紧急报警</div>
                    </td>
                    <td>
                        <div :class="otherAlertClass" @mouseover="mouseOver('OTHER')" 
        	            @mouseleave="mouseLeave('OTHER')" @click="openPop('OTHER')">其他报警</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="chart">
            <div class="chart-left">
                 <div class="chart-statuses">
                     <div :class="piCarStatusClass" @click="piChartSelect(1)">车辆状态</div>
                     <div :class="piCarOfflineClass" @click="piChartSelect(2)">离线车辆</div>
                 </div>
                 <Vepie class="veLine" :data="statusChartData"></Vepie>
            </div>
            <div class="chart-right">
                <div class="chart-days">
                    <div :class="line12Class" @click="lineChartSelect(1)">12个月</div>
                    <div :class="line30Class" @click="lineChartSelect(2)">30天</div>
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
    background #f6f6f6
}
.head{
    height 5.5%
    margin 1%
    display flex
    padding 3px
    background #ffffff
}
.logo{
    display flex
    flex 2
}
.logo-title{
    flex 5
    font-size 40px
    height 70px
    line-height  70px
}
.logo-img-union{
    flex 1
    margin 5px
    margin-left 5px
}
.logo-img-yanfei{
    flex 1
    padding-left 10px
}
.logo-img-yanfei-image{
    height 65px
    width 65px
    margin 5px
}
.login{
    display flex
    flex 1
}
.login-left{
    flex 1
}
.login-left-image{
    height 65px
    width 65px
    padding-left 80px
}
.login-right{
    flex 1
    height 65px
    line-height  65px
}
.statics{
    height 35%
    margin 1%
}
.chart{
    height 50%
    margin 1%
    margin-top 3%
    display flex
    padding 2px
}
.chart-left{
    flex 1
    background #ffffff
    margin 10px
    border-radius 15px;
}
.chart-right{
    flex 1
    background #ffffff
    margin 10px
    border-radius 15px;
}

.statics-box{
    width 200px
    height 200px
    border 1px solid #ddd
    text-align center
    line-height  200px
    margin-top 30px
    margin-left 60px
    font-size 20px
    color #888888
    border-radius 15px;
    background #ffffff

}

.statics-box-selected{
    width 200px
    height 200px
    border 1px solid #ddd
    text-align center
    line-height  200px
    margin-top 30px
    margin-left 60px
    font-size 20px
    color #888888
    border-radius 15px;
    background #f6f4e9
}
.head-tabs{
    flex 3
    display flex
    font-size 25px
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
.chart-day-selected{
    flex 1
    border 1px solid #ddd
    margin 20px
    text-align center
    color #888888
    background #f3e7e3
    border-radius 15px;
}
.chart-day{
    flex 1
    border 1px solid #ddd
    margin 20px
    text-align center
    color #888888
    border-radius 15px;
}
.chart-statuses{
    margin-top 20px
    display flex
    height 20%
    width 30%
    margin-left 70%
}
.chart-status-selected{
    flex 1
    border 1px solid #ddd
    text-align center
    height 20%
    margin 10px
    color #888888
    background #f3e7e3
    border-radius 15px;
}
.chart-status{
    flex 1
    border 1px solid #ddd
    text-align center
    height 20%
    margin 10px
    color #888888
    border-radius 15px;
}
</style>