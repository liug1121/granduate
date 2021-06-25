<script>
import Vue from "vue";
import Tree from "./components/Tree.vue"
import Table from "./components/Table.vue"
export default {
  name: "positionMaterial",
  components: {
    Tree,
    Table
  },
  data() {
    return {
      type:0,  //0 用户管理  1 车辆管理  2导入管理
      treeData :{
        name: "用管理",
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
      searchQuery: "",
        gridColumns: ["loginAccount", "pwd", "loginName", "type", "parentAccount", "parentCompany", "createTime", "operation"],
        columnNames:{
            loginAccount:'登录帐号',
            pwd:'密码',
            loginName:'客户名称',
            type:'类型',
            parentAccount:'上级帐号',
            parentCompany:'上级公司',
            createTime:'创建时间',
            operation:'操作'
        },
        gridData: [
        { loginAccount: "test", pwd: '111', loginName:'天地杰', type:'管理员', parentAccount:'test1', parentCompany:'天地杰', createTime:'2020-09-09', operation:''},
        { loginAccount: "test", pwd: '111', loginName:'天地杰', type:'管理员', parentAccount:'test1', parentCompany:'天地杰', createTime:'2020-09-09', operation:''},
        { loginAccount: "test", pwd: '111', loginName:'天地杰', type:'管理员', parentAccount:'test1', parentCompany:'天地杰', createTime:'2020-09-09', operation:''},
        { loginAccount: "test", pwd: '111', loginName:'天地杰', type:'管理员', parentAccount:'test1', parentCompany:'天地杰', createTime:'2020-09-09', operation:''}
        ],
        currentPage:'1/20'
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
        <div class="body">
            <div class="left">
                <div class="menu">
                    用户管理
                </div>
                <div class="menu">
                    车辆管理
                </div>
                <div class="menu">
                    批量导入
                </div>
            </div>
            <div class = "right">
                <div v-if="type ==0" class="user">
                    <div class="user-left">
                        <Tree
                            class="item"
                            :item="treeData"
                            @make-folder="makeFolder"
                            @add-item="addItem"
                        ></Tree>
                    </div>
                    <div class="user-right">
                        <form id="search" class="search">
                            按帐号查询 <input name="query" v-model="searchQuery" />
                        </form>
                        <Table
                            :heroes="gridData"
                            :columns="gridColumns"
                            :columnNames="columnNames"
                            :filter-key="searchQuery"
                            :currentPage="currentPage"
                        >
                        </Table>
                    </div>
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
.body{
    margin 1%
    height 93%

    display flex
}
.left{
    flex 1
    border 1px solid #ddd
}
.menu{
    width 100%
    height 80px
    border 1px solid #ddd
    text-align center
    line-height  80px
}
.right{
    flex 5
    border 1px solid #ddd
}
.user{
    display flex
    height 100%
    width 100%
}
.user-left{
    flex 1
    border 1px solid #ddd
    padding 10px
}
.user-right{
    flex 5
    border 1px solid #ddd
    padding 50px
}
.search{
    margin-bottom 10px
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
</style>