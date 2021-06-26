<script>
import Vue from "vue";
// import Tree from "./components/Tree.vue"
import Table from "./components/Table.vue"
import { BaiduMap} from 'vue-baidu-map';
export default {
  name: "positionTravel",
  components: {
    // Tree,
    Table,
    BaiduMap
  },
  data() {
    return {
        showFoot:"0",
        searchQuery: "",
        currentPage:'1/20',
      
        gridColumns: ["carNo", "dateTime", "speed", "direction","km", "status","position"],
        columnNames:{
            carNo:'车牌号',
            dateTime:'时间',
            speed:"速度/km",
            direction:"方向",
            km:"里程",
            status:"部件状态",
            position:"位置"
            
        },
        gridData: [
        { carNo: "001", dateTime: '2021-09-09 20:20', speed:"",direction:"",km:"",status:"",position:""},
        { carNo: "测试2_H", dateTime: '2021-09-09 20:20', speed:"",direction:"",km:"",status:"",position:""},
        { carNo: "004", dateTime: '2021-09-09 20:20', speed:"",direction:"",km:"",status:"",position:""},
        { carNo: "测试2_H", dateTime: '2021-09-09 20:20', speed:"",direction:"",km:"",status:"",position:""}
        
        ]
    };
  },
  methods:{
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
            <div class="logo">logo</div>
            <div class = "tab">tab</div>
            <div class="login">login</div>
        </div>
        <div class = "body">
            <div class="top">
                <div class= "top-left">
                    <div class="search">
                        <table>
                            <tr>
                                <td>选择车辆</td>
                                <td><input/></td>
                            </tr>
                            <tr>
                                <td>选择时间</td>
                                <td>
                                    <div class="days">
                                        <div class="day">今天</div>
                                        <div class="day">昨天</div>
                                        <div class="day">前天</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>开始时间</td>
                                <td><input/></td>
                            </tr>
                            <tr>
                                <td>结束时间</td>
                                <td><input/></td>
                            </tr>
                            <tr>
                                <td>静止时间</td>
                                <td><div class="days">
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
                    <baidu-map center="陕西" class="bm-view" ak="rCAAQCyHBVNql3q409XlwT6FPP2kx2OF">
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
                        :showFoot = "showFoot"
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
.tab-selected{
    flex 3
    border-bottom  1px solid #ddd
}
.tab{
    flex 3
}
.login{
    flex 1
    border 1px solid #ddd
}
.body{
    height 100%
    margin 1%
}
.top{
    display flex
    border 1px solid #ddd
    height 50%
}
.top-left{
    flex 1
    border 1px solid #ddd
}
.top-right{
    flex 3
    border 1px solid #ddd
}
.bm-view {
  width 100%
  height 100%
}
.bottom{
    width 100%
    height 50%
    border 1px solid #ddd
}
.days{
    display flex
}
.day{
    flex 1
    border 1px solid #ddd
    text-align center
    margin-left 2px
}
.search{
    border 1px solid #ddd
    padding 5%
    padding-left 10%
    margin 20px
    margin-top 60px
    border-radius 5px;

}
.search-button{
    width 100%
    margin-top 30px
    border 1px solid #ddd
    text-align center
    
}
tr{
    height 40px
}
.list-menu{
    height 10%
    border 1px solid #ddd
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
    border 1px solid #ddd
    height 40px
    line-height  40px
    margin 2px
    text-align center
    border-radius 15px;
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
</style>