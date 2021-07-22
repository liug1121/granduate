<script>
import position from "../../api/position";
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
        pageUsers:[],
        currentPage:0,
        menu1Class:'menu-selected',
        menu2Class:'menu',
        menu3Class:'menu',
      type:0,  //0 用户管理  1 车辆管理  2导入管理
      userTreeData :{},
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
        userGridColumns: ["userName", "pwd", "loginName", "type", "parentAccount", "parentCompany", "createTime", "operation"],
        userColumnNames:{
            userName:'登录帐号',
            pwd:'密码',
            loginName:'客户名称',
            type:'类型',
            parentAccount:'上级帐号',
            parentCompany:'上级公司',
            createTime:'创建时间',
            operation:'操作'
        },
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
        isAddFormShow:false,
        isChangeCardGroupShow:false,
        users:[]
    };
  },
  created(){
      this.allUser() 
  },
  methods:{
       listToUserTree:function(userDatas){
           let that = this
           let users = userDatas
            users.forEach(element => {
                element.name = element.userName
                element.clickFun = that.nextPage
                let parentId = element.parentId;
                if(parentId != null && parentId != '' && parentId != undefined){
                users.forEach(ele => {
                    if(ele.userId == parentId){
                    if(!ele.children){
                        ele.children = [];
                    }
                    ele.children.push(element);
                    }
                });
                }
            });
            users = users.filter(ele => ele.children != undefined); 
            return users;
        },
      
      prePage:function(parentId){
        let params = {}
        this.currentPage = this.currentPage - 1
        if(this.currentPage < 1)
            return
        params.pageNumber = this.currentPage
        params.pageSize = 10
        let users = this.users.filter(user=> user.parentId == parentId)
        this.pageUsers = this.getPageUsers(params,users)
      },
      nextPage:function(item){
        let parentId = item.userId
        let params = {}
        params.pageNumber = 1
        params.pageSize = 200
        let users = this.users.filter(user=> user.parentId == parentId)
        this.pageUsers = this.getPageUsers(params,users)
      },
      getPageUsers:function(params,users){
        let startIndex = (params.pageNumber - 1) * params.pageSize
        let endIndex = params.pageNumber * params.pageSize
        if(endIndex >= users.length)
            endIndex = users.length
        let pageUsers = []
        for(let i = startIndex; i < endIndex && i < users.length; i++){
            let parentId = users[i].parentId
            this.users.forEach(user=>{
                if(user.userId == parentId){
                    users[i].parentAccount = user.userName
                }
            })
            pageUsers.push(users[i])
        }
        return pageUsers;
      },
      allUser:function(){
        let params = {}
        params.pageNumber = 1
        params.pageSize = 200
        position.getUser(params, res=>{
            if(res.data.obj.data.length > 0){
                this.users = res.data.obj.data
                let treeDatas = this.listToUserTree(this.users)
                if(treeDatas.length > 0)
                this.userTreeData = treeDatas[0]
            }
        }, null)
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
      changeMenu:function(type){
          this.type = type
          if(type == 0){
              this.menu1Class = 'menu-selected'
              this.menu2Class = 'menu'
              this.menu3Class = 'menu'
          }else if(type == 1){
              this.menu1Class = 'menu'
              this.menu2Class = 'menu-selected'
              this.menu3Class = 'menu'
          }else if(type ==2){
              this.menu1Class = 'menu'
              this.menu2Class = 'menu'
              this.menu3Class = 'menu-selected'
          }
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
                <div class="head-tab-selected" @click="toView(4)">资料管理</div>
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
                <div :class="menu1Class" @click="changeMenu(0)">
                    用户管理
                </div>
                <div :class="menu2Class" @click="changeMenu(1)">
                    车辆管理
                </div>
                <div :class="menu3Class" @click="changeMenu(2)">
                    批量导入
                </div>
            </div>
            <div class = "right">
                <div v-if="type ==0" class="user">
                    <div class="user-left">
                        <Tree
                            class="item"
                            :item="userTreeData"
                            @clickItem = "nextPage"
                        ></Tree>
                        <!-- <Tree
                            class="item"
                            :item="userTreeData"
                            @make-folder="makeFolder"
                            @add-item="addItem"
                        ></Tree> -->
                    </div>
                    <div class="user-right">
                        <div class="opt">
                            <form id="search" class="search">
                                按帐号查询 <input name="query" v-model="searchQuery" />
                            </form>
                            <div class="addnew" @click="showAddForm">新增客户</div>
                        </div>
                        
                        <Table
                            :heroes = "pageUsers"
                            :columns = "userGridColumns"
                            :columnNames = "userColumnNames"
                            :filter-key = "searchQuery"
                            :currentPage = "currentPage"
                            :showFoot = 0
                            @prePage = "prePage"
                            @nextPage = "nextPage"
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
    background #f6f6f6
}
.body{
    margin 1%
    height 93%
    display flex
}
.left{
    flex 1
    background #ffffff
    border-radius 15px
    margin 5px
}
.menu{
    width 100%
    height 80px
    text-align center
    line-height  80px
    border-bottom 1px solid #ddd
}
.menu-selected{
    width 100%
    height 80px
    text-align center
    line-height  80px
    border-bottom 1px solid #ddd
    background #f6f4e9
}
.right{
    flex 5
    border-radius 15px
}
.user{
    display flex
    height 100%
    width 100%
}
.user-left{
    flex 1
    padding 10px
    background #ffffff
    margin 5px
    border-radius 15px
}
.user-right{
    flex 5
    margin 5px
    padding 50px
    background #ffffff
    border-radius 15px
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
    background #f6f4e9
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
    background #f6f4e9
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