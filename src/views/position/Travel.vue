<script>
import Vue from "vue";
// import Tree from "./components/Tree.vue"
import Table from "./components/Table.vue";
import { BaiduMap } from "vue-baidu-map";
export default {
  name: "positionTravel",
  components: {
    // Tree,
    Table,
    BaiduMap
  },
  data() {
    return {
      day1Class: "day-selected",
      day2Class: "day",
      day3Class: "day",
      showFoot: "0",
      searchQuery: "",
      currentPage: "1/20",

      gridColumns: [
        "carNo",
        "dateTime",
        "speed",
        "direction",
        "km",
        "status",
        "position"
      ],
      columnNames: {
        carNo: "车牌号",
        dateTime: "时间",
        speed: "速度/km",
        direction: "方向",
        km: "里程",
        status: "部件状态",
        position: "位置"
      },
      gridData: [
        {
          carNo: "001",
          dateTime: "2021-09-09 20:20",
          speed: "",
          direction: "",
          km: "",
          status: "",
          position: ""
        },
        {
          carNo: "测试2_H",
          dateTime: "2021-09-09 20:20",
          speed: "",
          direction: "",
          km: "",
          status: "",
          position: ""
        },
        {
          carNo: "004",
          dateTime: "2021-09-09 20:20",
          speed: "",
          direction: "",
          km: "",
          status: "",
          position: ""
        },
        {
          carNo: "测试2_H",
          dateTime: "2021-09-09 20:20",
          speed: "",
          direction: "",
          km: "",
          status: "",
          position: ""
        }
      ]
    };
  },
  methods: {
    selectDay: function(type) {
      if (type == 1) {
        this.day1Class = "day-selected";
        this.day2Class = "day";
        this.day3Class = "day";
      } else if (type == 2) {
        this.day1Class = "day";
        this.day2Class = "day-selected";
        this.day3Class = "day";
      } else if (type == 3) {
        this.day1Class = "day";
        this.day2Class = "day";
        this.day3Class = "day-selected";
      }
    },
    toView: function(page) {
      if (page == 1) {
        this.$router.push({ name: "Position" });
      } else if (page == 2) {
        this.$router.push({ name: "Monitor" });
      } else if (page == 3) {
        this.$router.push({ name: "Travel" });
      } else if (page == 4) {
        this.$router.push({ name: "Material" });
      }
    },
    makeFolder: function(item) {
      Vue.set(item, "children", []);
      this.addItem(item);
    },
    addItem: function(item) {
      item.children.push({
        name: "新渠道"
      });
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
          <img
            class="logo-img-yanfei-image"
            src="../../assets/logo_yanfei.png"
          />
        </div>
        <div class="logo-title">联通物联网公司</div>
      </div>
      <div class="head-tabs">
        <div class="head-tab" @click="toView(1)">首页</div>
        <div class="head-tab" @click="toView(2)">监控中心</div>
        <div class="head-tab-selected" @click="toView(3)">轨迹回放</div>
        <div class="head-tab" @click="toView(4)">资料管理</div>
      </div>
      <div class="login">
        <div class="login-left">
          <img class="login-left-image" src="../../assets/user_pic.png" />
        </div>
        <div class="login-right">taojiangmin</div>
      </div>
    </div>
    <div class="body">
      <div class="top">
        <div class="top-left">
          <div class="search">
            <table>
              <tr>
                <td>选择车辆</td>
                <td><input /></td>
              </tr>
              <tr>
                <td>选择时间</td>
                <td>
                  <div class="days">
                    <div :class="day1Class" @click="selectDay(1)">今天</div>
                    <div :class="day2Class" @click="selectDay(2)">昨天</div>
                    <div :class="day3Class" @click="selectDay(3)">前天</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>开始时间</td>
                <td><input /></td>
              </tr>
              <tr>
                <td>结束时间</td>
                <td><input /></td>
              </tr>
              <tr>
                <td>静止时间</td>
                <td>
                  <div class="days">
                    <div class="day">>=</div>
                    <div class="day">20</div>
                    <div class="day">分钟</div>
                  </div>
                </td>
              </tr>
            </table>

            <div class="search-button">查询</div>
          </div>
        </div>
        <div class="top-right">
          <baidu-map
            center="陕西"
            class="bm-view"
            ak="rCAAQCyHBVNql3q409XlwT6FPP2kx2OF"
          >
          </baidu-map>
        </div>
      </div>
      <div class="bottom">
        <div class="list-menu">
          <div class="tabs">
            <div class="tab-selected">轨迹详情</div>
            <div class="tab">报警详情</div>
            <div class="tab">经常停留点</div>
          </div>
          <div class="tags">
            <div class="tag">报警点</div>
            <div class="tag">轨迹</div>
            <div class="tag">经常停留点</div>
            <div class="tag">围栏</div>
          </div>
          <div class="datas">
            <div class="data">开始里程： 0km</div>
            <div class="data">结束里程： 0km</div>
            <div class="data">行驶里程： 0km</div>
          </div>
        </div>
        <div class="list">
          <Table
            :heroes="gridData"
            :columns="gridColumns"
            :columnNames="columnNames"
            :filter-key="searchQuery"
            :currentPage="currentPage"
            :showFoot="showFoot"
          >
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.container{
    height 100%
    width 100%
    background #f6f6f6

}
.head{
    height 8%
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
.tab-selected{
    flex 3
    border-bottom  1px solid #ddd
}
.tab{
    flex 3
}

.body{
    height 100%
    margin 1%
}
.top{
    display flex
    height 50%
}
.top-left{
    flex 1
    background #ffffff
    border-radius 15px
    margin 5px
}
.top-right{
    flex 3
    margin 5px
    padding 10px
    background #ffffff
    border-radius 15px
}
.bm-view {
  width 100%
  height 100%
}
.bottom{
    width 100%
    height 50%
    background #ffffff
    border-radius 15px
    margin-top 10px
}
.days{
    display flex
}
.day{
    flex 1
    text-align center
    margin-left 2px
    border-radius 15px;
}
.day-selected{
    flex 1
    text-align center
    margin-left 2px
    background #f6f4e9
    border-radius 15px;
}
.search{
    border 1px solid #ddd
    padding 5%
    padding-left 10%
    margin 20px
    margin-top 60px
    border-radius 15px;

}
.search-button{
    width 100%
    height 40px
    line-height 40px
    margin-top 30px
    text-align center
    background #f6f4e9
    border-radius 15px;
    font-size 20px
}
tr{
    height 40px
}
.list-menu{
    height 10%
    display flex
}
.list{
    height 90%
    padding 2%
}
.tabs{
    flex 1
    display flex
    width 30%
    height 40px
    text-align center
    line-height  40px
    margin 2px
}
.tags{
    flex 1
    width 30%
    display flex
}
.datas{
    flex 1
}
.tag{
    flex 1
    height 40px
    line-height  40px
    margin 2px
    text-align center
    border-radius 15px;
    background #f6f4e9
}
.datas{
    display flex
}
.data{
    flex 1
    height 40px
    line-height  40px
    margin 2px
    text-align center
}
.head-tabs{
    flex 3
    display flex
    font-size 25px
}

.head-tab-selected{
    flex 1
    text-align center
    height 80px
    line-height  80px
    border-bottom 2px solid #ddd
}
.head-tab{
    flex 1
    text-align center
    height 80px
    line-height  80px

}
</style>
