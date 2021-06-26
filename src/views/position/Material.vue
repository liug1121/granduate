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
        showFoot:1,
      type:0,  //0 用户管理  1 车辆管理  2导入管理
      userTreeData :{
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
      carTreeData :{
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
      searchQuery: "",
        userGridColumns: ["loginAccount", "pwd", "loginName", "type", "parentAccount", "parentCompany", "createTime", "operation"],
        userColumnNames:{
            loginAccount:'登录帐号',
            pwd:'密码',
            loginName:'客户名称',
            type:'类型',
            parentAccount:'上级帐号',
            parentCompany:'上级公司',
            createTime:'创建时间',
            operation:'操作'
        },
        userGridData: [
        { loginAccount: "test", pwd: '111', loginName:'天地杰', type:'管理员', parentAccount:'test1', parentCompany:'天地杰', createTime:'2020-09-09', operation:''},
        { loginAccount: "test", pwd: '111', loginName:'天地杰', type:'管理员', parentAccount:'test1', parentCompany:'天地杰', createTime:'2020-09-09', operation:''},
        { loginAccount: "test", pwd: '111', loginName:'天地杰', type:'管理员', parentAccount:'test1', parentCompany:'天地杰', createTime:'2020-09-09', operation:''},
        { loginAccount: "test", pwd: '111', loginName:'天地杰', type:'管理员', parentAccount:'test1', parentCompany:'天地杰', createTime:'2020-09-09', operation:''}
        ],

        carGridColumns: ["carNo", "sim", "device", "deviceType", "cardFrameNo", "mac", "comment", "addTime", "status", "lastOnline", 'operation'],
        carColumnNames:{
            carNo:'车牌号',
            sim:'sim卡号',
            device:'设备号',
            deviceType:'设备类型',
            cardFrameNo:'车架号',
            mac:'MAC',
            comment:'备注',
            addTime:'添加时间',
            status:'车辆状态',
            operation:'操作'
        },
        carGridData: [
        { carNo: "111", sim: '111', device:'No001', deviceType:'类型', cardFrameNo:'test1', mac:'xosdse', comment:'', addTime:'', status:'', operation:''},
        { carNo: "111", sim: '111', device:'No001', deviceType:'类型', cardFrameNo:'test1', mac:'xosdse', comment:'', addTime:'', status:'', operation:''},
        { carNo: "111", sim: '111', device:'No001', deviceType:'类型', cardFrameNo:'test1', mac:'xosdse', comment:'', addTime:'', status:'', operation:''},
        { carNo: "111", sim: '111', device:'No001', deviceType:'类型', cardFrameNo:'test1', mac:'xosdse', comment:'', addTime:'', status:'', operation:''},
        { carNo: "111", sim: '111', device:'No001', deviceType:'类型', cardFrameNo:'test1', mac:'xosdse', comment:'', addTime:'', status:'', operation:''}
        ],


        currentPage:'1/20',
        isAddFormShow:false,
        isChangeCardGroupShow:false
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
      changeMenu:function(type){
          this.type = type
      },
      showAddForm:function(){
          this.isAddFormShow = true
      },
      hideAddForm:function(){
          this.isAddFormShow = false
      },
      showChangeCardGroupForm:function(){
          this.isChangeCardGroupShow = true
      },
      hideChangeCardGroupForm:function(){
          this.isChangeCardGroupShow = false
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
            <div class="left">
                <div class="menu" @click="changeMenu(0)">
                    用户管理
                </div>
                <div class="menu" @click="changeMenu(1)">
                    车辆管理
                </div>
                <div class="menu" @click="changeMenu(2)">
                    批量导入
                </div>
            </div>
            <div class = "right">
                <div v-if="type ==0" class="user">
                    <div class="user-left">
                        <Tree
                            class="item"
                            :item="userTreeData"
                            @make-folder="makeFolder"
                            @add-item="addItem"
                        ></Tree>
                    </div>
                    <div class="user-right">
                        <div class="opt">
                            <form id="search" class="search">
                                按帐号查询 <input name="query" v-model="searchQuery" />
                            </form>
                            <div class="addnew" @click="showAddForm">新增客户</div>
                        </div>
                        
                        <Table
                            :heroes="userGridData"
                            :columns="userGridColumns"
                            :columnNames="userColumnNames"
                            :filter-key="searchQuery"
                            :currentPage="currentPage"
                            :showFoot = "showFoot"
                        >
                        </Table>
                    </div>
                </div>
                <div v-if="type ==1" class="user">
                    <div class="user-left">
                        <Tree
                            class="item"
                            :item="carTreeData"
                            @make-folder="makeFolder"
                            @add-item="addItem"
                        ></Tree>
                    </div>
                    <div class="user-right">
                        <div class="opt">
                            <div class="addnew" @click="showChangeCardGroupForm">车辆转移</div>
                        </div>
                        <Table
                            :heroes="carGridData"
                            :columns="carGridColumns"
                            :columnNames="carColumnNames"
                            :filter-key="searchQuery"
                            :currentPage="currentPage"
                        >
                        </Table>
                    </div>
                </div>
                <div v-if="type ==2" >
                    <div class="import">
                        <div>
                            <input class="import-input"/>
                            <div class="import-button">导入</div>
                        </div>
                        <div class= "import-notice">
                            首次使用,<span class="down-link">请点击下载最新导入模板!</span>
                            一次批量提交的车辆数不能超过 1000台，如果超过限制将提交失败！
                            如果系统提示您有未完成的任务，可能是上次批量导入未完成或此时其他电脑正在用您的账户进行批量导入。
                            请避免您的账号,同一时间,使用不同电脑进行批量导入！！
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="modal-fade" v-if="isAddFormShow">
            <div class="pop-container" >
                <div class="pop-display">
                    <div class="pop-head">
                        <span class="pop-title">编辑客户</span>
                        <div class="pop-close" @click="hideAddForm">关闭</div>
                    </div>
                    <table class="addform">
                        <tr>
                            <td class="label">登录账户</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">密码</td>
                            <td class="input"> <input/></td>
                        </tr>
                        <tr>
                            <td class="label">客户名称</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">绑定车组</td>
                            <td class="input">新账号请 选择绑定车组 或 创建一个车组</td>
                        </tr>
                        <tr>
                            <td class="label">账户类型</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">上级账户</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">断油电/恢复油电权限</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">删除用户权限</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">删除车组权限</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">删除车辆权限</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">联系电话</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">备注</td>
                            <td class="input"><input/></td>
                        </tr>
                    </table>
                    <div>更改删除用户权限、删除车组权限、删除车辆权限都会改变子级账号对应的权限</div>
                    <div>
                        <div class="button" @click="hideAddForm">保存</div>
                        <div class="button" @click="hideAddForm">取消</div>
                    </div>
                    
                </div>
            </div>
        </transition>

        <transition name="modal-fade" v-if="isChangeCardGroupShow">
            <div class="pop-container" >
                <div class="pop-display">
                    <div class="pop-head">
                        <span class="pop-title">车辆转移</span>
                        <div class="pop-close" @click="hideChangeCardGroupForm">关闭</div>
                    </div>
                    <table class="addform">
                        <tr>
                            <td class="label">转移到</td>
                            <td class="input"><input/></td>
                        </tr>
                        <tr>
                            <td class="label">转移方式</td>
                            <td class="input"> <input/></td>
                        </tr>
                        <tr>
                            <td class="label">车牌号</td>
                            <td class="input"><input/></td>
                        </tr>
                    </table>
                    <div>
                        <div class="button" @click="hideChangeCardGroupForm">保存</div>
                        <div class="button" @click="hideChangeCardGroupForm">取消</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    
</template>


<style scoped lang="stylus">
@import '../../assets/css/poptable.css'
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
.opt{
    margin-bottom 10px
}
.search{
    margin-bottom 10px
    display inline-block
}
.addnew{
    margin-left 10px
    border 1px solid #ddd
    display inline-block
    width 100px
    height 28px
    line-height  28px
    text-align center
    border-radius 15px;
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
.addform{
    width 100%
    text-align left
    margin 100px
    margin-left 20%
}
.label{
    width 10%
}
.input{
    width 70%
}
input{
    width 600px
}
.button{
    display inline-block
    margin 20px
    border 1px solid #ddd
    border-radius 15px;
    width 100px
}
.import{
    margin 15%
}
.import-input{
    display inline-block
}
.import-button{
    display inline-block
    border 1px solid #ddd
    border-radius 15px;
    width 100px
    text-align center
}
.import-notice{
    margin-top 20px
}
.down-link{
    color red
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