<script>
import Vue from "vue";
import Tree from "./components/Tree.vue"
import Table from "./components/Table.vue"
import { BaiduMap} from 'vue-baidu-map';
export default {
  name: "positionMaterial",
  components: {
    Tree,
    Table,
    BaiduMap
  },
  data() {
    return {
        showFoot:"0",
        searchQuery: "",
        currentPage:'1/20',
      treeData :{
        name: "车组",
        children: [
          {
            name: "天地杰",
            children: [
              {
                name: "渠道1",
                children: [{ name: "子渠道" }, { name: "子渠道" }]
              },
              { name: "渠道2" },
            ]
          }
        ]
      },
        gridColumns: ["carName", "status"],
        columnNames:{
            carName:'车辆名称',
            status:'状态',
            
        },
        gridData: [
        { carName: "测试2_H", status: '[离线17天]'},
        { carName: "天地杰测试", status: '[离线17天]'},
        { carName: "天地杰测试1", status: '[离线17天]'},
        { carName: "天地杰测试2", status: '[离线17天]'}
        
        ]
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
            <div class = "head-tabs">
                <div class="head-tab" @click="toView(1)">首页</div>
                <div class="head-tab" @click="toView(2)">监控中心</div>
                <div class="head-tab" @click="toView(3)">轨迹回放</div>
                <div class="head-tab" @click="toView(4)">资料管理</div>
            </div>
            <div class="login">login</div>
        </div>
        <div class="body">
            <div class = "left">
                <div class="left-top">
                    <Tree
                        class="item"
                        :item="treeData"
                        @make-folder="makeFolder"
                        @add-item="addItem"
                    ></Tree>
                </div>
                <div class="left-bottom">
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
            <div class = "right">
                <div class="menu">
                    <div class="address">仓库测试：江苏省南京市玄武区玄武门街道百子亭6号号玄武湖公园-玄武门(在百子亭的方</div>
                    <div class="button">卫星地图</div>
                    <div class="button">路况</div>
                    <div class="button">区域查车</div>
                    <div class="button">测距</div>
                    <div class="button">位置点</div>
                    <div class="button">围栏</div>
                    <div class="button">二押点</div>
                </div>
                <baidu-map center="陕西" class="bm-view" ak="rCAAQCyHBVNql3q409XlwT6FPP2kx2OF">
                </baidu-map>
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
.tab{
    flex 3
    border 1px solid #ddd
}
.login{
    flex 1
    border 1px solid #ddd
}
.body{
    height 100%
    display flex
    margin 1%
}
.left{
    flex 1
    border 1px solid #ddd
}
.left-top{
    height 40%
    margin 10px
    margin-left 20px
}
.left-bottom{
    height 50%
    border 1px solid #ddd
    padding 10px
    padding-left 10px
}
.right{
    flex 4
    border 1px solid #ddd
    height 100%
}
.bm-view {
  width 100%
  height 95%
}
.menu{
    display flex
    height 5%
}
.address{
    flex 6
    height 30px
    line-height  30px
}
.button{
    flex 1
    border 1px solid #ddd
    margin 5px
    text-align center
    height 30px
    line-height  30px
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
</style>