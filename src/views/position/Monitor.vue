<script>
import Vue from "vue";
import Tree from "./components/Tree.vue";
import Table from "./components/Table.vue";
import { BaiduMap } from "vue-baidu-map";
export default {
  name: "positionMaterial",
  components: {
    Tree,
    Table,
    BaiduMap
  },
  data() {
    return {
      showFoot: "0",
      searchQuery: "",
      currentPage: "1/20",
      treeData: {
        name: "车组",
        children: [
          {
            name: "天地杰",
            children: [
              {
                name: "渠道1",
                children: [{ name: "子渠道" }, { name: "子渠道" }]
              },
              { name: "渠道2" }
            ]
          }
        ]
      },
      gridColumns: ["carName", "status"],
      columnNames: {
        carName: "车辆名称",
        status: "状态"
      },
      gridData: [
        { carName: "测试2_H", status: "[离线17天]" },
        { carName: "天地杰测试", status: "[离线17天]" },
        { carName: "天地杰测试1", status: "[离线17天]" },
        { carName: "天地杰测试2", status: "[离线17天]" }
      ]
    };
  },
  methods: {
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
        <div class="head-tab-selected" @click="toView(2)">监控中心</div>
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
    <div class="body">
      <div class="left">
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
            :showFoot="showFoot"
          >
          </Table>
        </div>
      </div>
      <div class="right">
        <div class="menu">
          <div class="address">
            仓库测试：江苏省南京市玄武区玄武门街道百子亭6号号玄武湖公园-玄武门(在百子亭的方
          </div>
          <div class="button">卫星地图</div>
          <div class="button">路况</div>
          <div class="button">区域查车</div>
          <div class="button">测距</div>
          <div class="button">位置点</div>
          <div class="button">围栏</div>
          <div class="button">二押点</div>
        </div>
        <baidu-map
          center="陕西"
          class="bm-view"
          ak="rCAAQCyHBVNql3q409XlwT6FPP2kx2OF"
        >
        </baidu-map>
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
.tab{
    flex 3
    border 1px solid #ddd
}

.body{
    height 100%
    display flex
    margin 1%
}
.left{
    flex 1


}
.left-top{
    height 40%
    margin 10px
    margin-left 20px
    border-radius 15px;
    margin 5px
    background #ffffff
    padding 10px

}
.left-bottom{
    height 50%
    padding 10px
    padding-left 10px
    margin 5px
    margin-top 10px
    background #ffffff
    border-radius 15px;
}
.right{
    flex 4
    padding 20px
    height 100%
    background #ffffff
    border-radius 15px
    margin 5px
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
    margin 5px
    text-align center
    height 30px
    line-height  30px
    border-radius 15px
    background #f6f4e9
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
