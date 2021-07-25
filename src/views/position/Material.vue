<script>
import position from "../../api/position";
// import Vue from "vue";
import Tree from "./components/Tree.vue";
import Table from "./components/Table.vue";
export default {
  name: "positionMaterial",
  components: {
    Tree,
    Table
  },
  data() {
    return {
      pageUsers: [],
      currentPage: 0,
      menu1Class: "menu-selected",
      menu2Class: "menu",
      menu3Class: "menu",
      type: 0, //0 用户管理  1 车辆管理  2导入管理
      userTreeData: {},
      carTreeData: {},
      searchQuery: "",
      userGridColumns: [
        "userName",
        "pwd",
        "loginName",
        "type",
        "parentAccount",
        "parentCompany",
        "createTime",
        "operation"
      ],
      userColumnNames: {
        userName: "登录帐号",
        pwd: "密码",
        loginName: "客户名称",
        type: "类型",
        parentAccount: "上级帐号",
        parentCompany: "上级公司",
        createTime: "创建时间",
        operation: "操作"
      },
      carGridColumns: [
        "carNo",
        "sim",
        "device",
        "deviceType",
        "cardFrameNo",
        "mac",
        "addTime",
        "status"
      ],
      carColumnNames: {
        carNo: "车牌号",
        sim: "sim卡号",
        device: "设备号",
        deviceType: "设备类型",
        cardFrameNo: "车架号",
        mac: "MAC",
        addTime: "添加时间",
        status: "车辆状态"
      },
      isAddFormShow: false,
      isChangeCardGroupShow: false,
      isAddCardShow: false,
      users: [],
      groups: [],
      groupTreeData: {},
      cars: [],
      group2Move: {},
      carSelectedRow: null,
      carData2Add: {},
      terminalTypes: [
        {
          type: "A5B",
          typemap: "A5B"
        },
        {
          type: "A5C",
          typemap: "A5C"
        },
        {
          type: "A5C-3",
          typemap: "A5C-3"
        },
        {
          type: "A5C-5",
          typemap: "A5C-5"
        },
        {
          type: "A5C-9",
          typemap: "A5C-9"
        },
        {
          type: "A5D",
          typemap: "A5D"
        },
        {
          type: "A5E",
          typemap: "A5E"
        },
        {
          type: "A5M",
          typemap: "A5M"
        },
        {
          type: "A5E-3",
          typemap: "A5E-3"
        },
        {
          type: "A5H",
          typemap: "A5H"
        },
        {
          type: "M6",
          typemap: "M6"
        },
        {
          type: "M11",
          typemap: "M11"
        },
        {
          type: "GPRS-部标",
          typemap: "GPRS-部标"
        },
        {
          type: "mini",
          typemap: "mini"
        },
        {
          type: "Acar",
          typemap: "Acar"
        },
        {
          type: "Bcar",
          typemap: "Bcar"
        },
        {
          type: "Otrack",
          typemap: "Otrack"
        },
        {
          type: "KM-08",
          typemap: "KM-08"
        },
        {
          type: "KM-02",
          typemap: "KM-02"
        },
        {
          type: "KM-01",
          typemap: "KM-01"
        },
        {
          type: "GT02D",
          typemap: "GT02D"
        },
        {
          type: "K10",
          typemap: "K10"
        },
        {
          type: "K9",
          typemap: "K9"
        },
        {
          type: "K11",
          typemap: "K11"
        },
        {
          type: "K10A",
          typemap: "K10A"
        },
        {
          type: "TQ",
          typemap: "TQ"
        },
        {
          type: "A5C-8",
          typemap: "A5C-8"
        },
        {
          type: "A5C-8W",
          typemap: "A5C-8W"
        },
        {
          type: "FS-A8S",
          typemap: "FS-A8S"
        },
        {
          type: "A5C-9W",
          typemap: "A5C-9W"
        },
        {
          type: "A5C-10W",
          typemap: "A5C-10W"
        },
        {
          type: "A5C-11W",
          typemap: "A5C-11W"
        },
        {
          type: "OCAR-3",
          typemap: "OCAR-3"
        },
        {
          type: "A5C-1W",
          typemap: "A5C-1W"
        },
        {
          type: "KM-10",
          typemap: "KM-10"
        },
        {
          type: "KM-06R",
          typemap: "KM-06R"
        },
        {
          type: "OTRACK5",
          typemap: "OTRACK5"
        },
        {
          type: "GH01",
          typemap: "GH01"
        },
        {
          type: "X6",
          typemap: "X6"
        },
        {
          type: "A5E-5",
          typemap: "A5E-5"
        },
        {
          type: "A5C-4G",
          typemap: "A5C-4G"
        },
        {
          type: "KM-08-V3",
          typemap: "KM-08-V3"
        },
        {
          type: "KM-06M",
          typemap: "KM-06M"
        },
        {
          type: "A5",
          typemap: "A5"
        },
        {
          type: "A7",
          typemap: "A7"
        },
        {
          type: "OCAR-5",
          typemap: "OCAR-5"
        },
        {
          type: "A5E-8W",
          typemap: "A5E-8W"
        },
        {
          type: "BMS",
          typemap: "BMS"
        },
        {
          type: "UA11",
          typemap: "UA11"
        },
        {
          type: "LA-01",
          typemap: "LA-01"
        },
        {
          type: "X7",
          typemap: "X7"
        },
        {
          type: "A5C-2W",
          typemap: "A5C-2W"
        },
        {
          type: "DS703",
          typemap: "DS703"
        },
        {
          type: "EG05W",
          typemap: "EG05W"
        },
        {
          type: "AG-01W",
          typemap: "AG-01W"
        }
      ]
    };
  },
  created() {
    this.allUser();
    this.allGroups();
  },
  methods: {
    listToGroupTree: function(groupDatas) {
      let that = this;
      let groups = groupDatas;
      groups.forEach(element => {
        element.name = element.groupName;
        element.clickFun = that.getCarsByTreeNode;
        element.groupFun = that.selectGroup;
        let parentId = element.parentId;
        if (parentId != null && parentId != "" && parentId != undefined) {
          groups.forEach(ele => {
            if (ele.groupId == parentId) {
              if (!ele.children) {
                ele.children = [];
              }
              ele.children.push(element);
            }
          });
        }
      });
      groups = groups.filter(ele => ele.children != undefined);
      return groups;
    },
    listToUserTree: function(userDatas) {
      let that = this;
      let users = userDatas;
      users.forEach(element => {
        element.name = element.userName;
        element.clickFun = that.getUsersByTreeNode;
        let parentId = element.parentId;
        if (parentId != null && parentId != "" && parentId != undefined) {
          users.forEach(ele => {
            if (ele.userId == parentId) {
              if (!ele.children) {
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
    getUsersByTreeNode: function(item) {
      let parentId = item.userId;
      let params = {};
      params.pageNumber = 1;
      params.pageSize = 200;
      let users = this.users.filter(
        user => user.parentId == parentId || user.userId == parentId
      );
      this.pageUsers = this.getPageUsers(params, users);
    },
    getCarsByTreeNode: function(item) {
      let groupId = item.groupId;
      let params = {};
      params.groupId = groupId;
      params.pageNumber = 1;
      params.pageSize = 200;
      position.getcars(
        params,
        res => {
          if (res.data.flag == 1) {
            this.cars = [];
            let cars = res.data.obj.data;
            cars.forEach(one => {
              let car = {};
              car.carNo = one.iccid;
              car.sim = one.sim;
              car.device = one.terminalNo;
              car.deviceType = one.terminalType;
              car.cardFrameNo = one.frameNo;
              car.mac = "";
              car.comment = "";
              car.addTime = one.installDate;
              car.status = "";
              car.operation = "";
              this.cars.push(car);
            });
          }
        },
        null
      );
    },
    getPageUsers: function(params, users) {
      let startIndex = (params.pageNumber - 1) * params.pageSize;
      let endIndex = params.pageNumber * params.pageSize;
      if (endIndex >= users.length) endIndex = users.length;
      let pageUsers = [];
      for (let i = startIndex; i < endIndex && i < users.length; i++) {
        let parentId = users[i].parentId;
        this.users.forEach(user => {
          if (user.userId == parentId) {
            users[i].parentAccount = user.userName;
          }
        });
        pageUsers.push(users[i]);
      }
      return pageUsers;
    },
    allUser: function() {
      let params = {};
      params.pageNumber = 1;
      params.pageSize = 200;
      position.getUser(
        params,
        res => {
          if (res.data.obj.data.length > 0) {
            this.users = res.data.obj.data;
            let treeDatas = this.listToUserTree(this.users);
            if (treeDatas.length > 0) this.userTreeData = treeDatas[0];
          }
        },
        null
      );
    },
    allGroups: function() {
      let params = {};
      params.pageNumber = 1;
      params.pageSize = 200;
      position.getGroup(
        params,
        res => {
          if (res.data.obj.data.length > 0) {
            // console.log(JSON.stringify(res.data.obj.data))
            this.groups = res.data.obj.data;
            let treeDatas = this.listToGroupTree(this.groups);
            if (treeDatas.length > 0) this.groupTreeData = treeDatas[0];
            console.log(JSON.stringify(this.groupTreeData));
          }
        },
        null
      );
    },
    selectGroup: function(item) {
      this.group2Move = item;
    },
    selectRow: function(row) {
      console.log(JSON.stringify(row));
      this.carSelectedRow = row;
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
    changeMenu: function(type) {
      this.type = type;
      if (type == 0) {
        this.menu1Class = "menu-selected";
        this.menu2Class = "menu";
        this.menu3Class = "menu";
      } else if (type == 1) {
        this.menu1Class = "menu";
        this.menu2Class = "menu-selected";
        this.menu3Class = "menu";
      } else if (type == 2) {
        this.menu1Class = "menu";
        this.menu2Class = "menu";
        this.menu3Class = "menu-selected";
      }
    },
    showAddForm: function() {
      this.isAddFormShow = true;
    },
    hideAddForm: function() {
      console.log("sdsd");
      this.isAddFormShow = false;
    },
    showChangeCardGroupForm: function() {
      if (this.carSelectedRow == null) {
        alert("请选择要转移的车辆信息");
        return;
      }
      this.isChangeCardGroupShow = true;
    },
    showAddCarForm: function() {
      this.isAddCardShow = true;
    },
    hideAddCarForm: function() {
      this.isAddCardShow = false;
    },
    hideChangeCardGroupForm: function() {
      this.isChangeCardGroupShow = false;
    },
    saveCarInfo: function() {
      let car = this.carSelectedRow;
      let group = this.group2Move;
      if (group.groupName == undefined) {
        alert("请选择要转移到的组信息");
        return;
      }
      let groupId = group.groupId;
      let terminalNo = car.device;
      let params = {};
      params.groupId = groupId;
      params.terminalNo = terminalNo;
      position.modifyCarGroup(
        params,
        res => {
          console.log(JSON.stringify(res.data));
          if (res.data.flag == 1) {
            alert("转移成功");
            this.isChangeCardGroupShow = false;
          } else {
            alert("转移失败");
          }
        },
        null
      );
    },
    checkAddCarData: function() {
      // this.carData2Add
      if (this.carData2Add.plate == undefined || this.carData2Add.plate == "") {
        alert("车牌号不能为空");
        return false;
      }
      if (this.carData2Add.sim == undefined || this.carData2Add.sim == "") {
        alert("sim号不能为空");
        return false;
      }
      if (
        this.carData2Add.terminalType == undefined ||
        this.carData2Add.terminalType == ""
      ) {
        alert("设备类型不能为空");
        return false;
      }
      if (
        this.carData2Add.terminalNo == undefined ||
        this.carData2Add.terminalNo == ""
      ) {
        alert("设备号不能为空");
        return false;
      }
      if (
        this.carData2Add.groupId == undefined ||
        this.carData2Add.groupId == ""
      ) {
        alert("组信息不能为空");
        return false;
      }
      if (
        this.carData2Add.serviceCode == undefined ||
        this.carData2Add.serviceCode == ""
      ) {
        alert("服务密码不能为空");
        return false;
      }
      if (
        this.carData2Add.installDate == undefined ||
        this.carData2Add.installDate == ""
      ) {
        alert("安装时间不能为空");
        return false;
      }
      var a = /^(\d{4})-(\d{2})-(\d{2})$/;
      if (!a.test(this.carData2Add.installDate)) {
        alert("日期格式应为XXXX-XX-XX!");
        return false;
      }
      return true;
    },
    addCar: function() {
      if (!this.checkAddCarData()) {
        return;
      }
      let that = this;
      position.addCar(
        this.carData2Add,
        res => {
          if (res.data.flag == 1) {
            alert("添加车辆成功");
            that.hideAddCarForm();
          } else {
            alert("添加车辆失败");
          }
        },
        null
      );
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
      <div class="right">
        <div v-if="type == 0" class="user">
          <div class="user-left">
            <Tree
              class="item"
              :item="userTreeData"
              @clickItem="getUsersByTreeNode"
            ></Tree>
          </div>
          <div class="user-right">
            <!-- <div class="opt">
              <form id="search" class="search">
                按帐号查询 <input name="query" v-model="searchQuery" />
              </form>
              <div class="addnew" @click="showAddForm">新增客户</div>
            </div> -->
            <Table
              :heroes="pageUsers"
              :columns="userGridColumns"
              :columnNames="userColumnNames"
              :filter-key="searchQuery"
              :currentPage="currentPage"
              :showFoot="0"
            >
            </Table>
          </div>
        </div>
        <div v-if="type == 1" class="user">
          <div class="user-left">
            <Tree
              class="item"
              :item="groupTreeData"
              type="forCar"
              @clickItem="getCarsByTreeNode"
            ></Tree>
          </div>
          <div class="user-right">
            <div class="opt">
              <div class="opt-button" @click="showChangeCardGroupForm">
                车辆转移
              </div>
              <div class="opt-button" @click="showAddCarForm">
                新增车辆
              </div>
            </div>
            <Table
              :heroes="cars"
              :columns="carGridColumns"
              :columnNames="carColumnNames"
              :filter-key="searchQuery"
              :currentPage="currentPage"
              :showFoot="0"
              @selectRow="selectRow"
            >
            </Table>
          </div>
        </div>
        <div v-if="type == 2">
          <div class="import">
            <div>
              <input class="import-input" />
              <div class="import-button">导入</div>
            </div>
            <div class="import-notice">
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
      <div class="pop-container">
        <div class="pop-display">
          <div class="pop-head">
            <span class="pop-title">编辑客户</span>
            <div class="pop-close" @click="hideAddForm">关闭</div>
          </div>
          <table class="addform">
            <tr>
              <td class="label">登录账户</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">密码</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">客户名称</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">绑定车组</td>
              <td class="input">新账号请 选择绑定车组 或 创建一个车组</td>
            </tr>
            <tr>
              <td class="label">账户类型</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">上级账户</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">断油电/恢复油电权限</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">删除用户权限</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">删除车组权限</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">删除车辆权限</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">联系电话</td>
              <td class="input"><input /></td>
            </tr>
            <tr>
              <td class="label">备注</td>
              <td class="input"><input /></td>
            </tr>
          </table>

          <div>
            更改删除用户权限、删除车组权限、删除车辆权限都会改变子级账号对应的权限
          </div>
          <div>
            <div class="button" @click="hideAddForm">保存</div>
            <div class="button" @click="hideAddForm">取消</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade" v-if="isChangeCardGroupShow">
      <div class="pop-container">
        <div class="pop-display">
          <div class="pop-head">
            <span class="pop-title">车辆转移</span>
            <div class="pop-close" @click="hideChangeCardGroupForm">关闭</div>
          </div>
          <table class="addform">
            <tr>
              <td class="label">转移到</td>
              <td class="input">
                <input v-model="group2Move.groupName" readonly />
              </td>
            </tr>
          </table>

          <div class="select-group">
            <span class="select-group-notice">请选择要转移到的车组</span>
            <Tree
              class="item"
              :item="groupTreeData"
              type="forGroup"
              @clickItem="selectGroup"
            ></Tree>
          </div>
          <div>
            <div class="button" @click="saveCarInfo">保存</div>
            <div class="button" @click="hideChangeCardGroupForm">取消</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade" v-if="isAddCardShow">
      <div class="pop-container">
        <div class="pop-display">
          <div class="pop-head">
            <span class="pop-title">新增车辆</span>
            <div class="pop-close" @click="hideAddCarForm">关闭</div>
          </div>
          <table class="add-table">
            <tr>
              <td class="add-tr">车牌号<span class="add-required">*</span></td>
              <td class="add-tr"><input v-model="carData2Add.plate" /></td>
              <td class="add-tr">SIM卡号<span class="add-required">*</span></td>
              <td class="add-tr"><input v-model="carData2Add.sim" /></td>
            </tr>
            <tr>
              <td class="add-tr">
                设备类型<span class="add-required">*</span>
              </td>
              <td class="add-tr">
                <select v-model="carData2Add.terminalType">
                  <option
                    v-for="(option, index) in terminalTypes"
                    :key="index"
                    :value="option.type"
                    >{{ option.type }}</option
                  >
                </select>
              </td>
              <td class="add-tr">设备号<span class="add-required">*</span></td>
              <td class="add-tr"><input v-model="carData2Add.terminalNo" /></td>
            </tr>
            <tr>
              <td class="add-tr">
                所属车组<span class="add-required">*</span>
              </td>
              <td class="add-tr"><input v-model="carData2Add.groupId" /></td>
              <td class="add-tr">车架号</td>
              <td class="add-tr"><input /></td>
            </tr>
            <tr>
              <td class="add-tr">发动机号</td>
              <td class="add-tr"><input /></td>
              <td class="add-tr">车型</td>
              <td class="add-tr"><input /></td>
            </tr>
            <tr>
              <td class="add-tr">ICCID</td>
              <td class="add-tr"><input /></td>
              <td class="add-tr">
                服务密码<span class="add-required">*</span>
              </td>
              <td class="add-tr">
                <input v-model="carData2Add.serviceCode" />
              </td>
            </tr>
            <tr>
              <td class="add-tr">激活时间</td>
              <td class="add-tr"><input /></td>
              <td class="add-tr">
                安装时间<span class="add-required">*</span>
              </td>
              <td class="add-tr">
                <input v-model="carData2Add.installDate" />
              </td>
            </tr>
            <tr>
              <td class="add-tr">车主</td>
              <td class="add-tr"><input /></td>
              <td class="add-tr">备注</td>
              <td class="add-tr"><input /></td>
            </tr>
            <tr>
              <td class="add-tr">证件号</td>
              <td class="add-tr"><input /></td>
              <td class="add-tr">联系方式</td>
              <td class="add-tr"><input /></td>
            </tr>
            <tr>
              <td class="add-tr">车主地址</td>
              <td class="add-tr"><input /></td>
              <td class="add-tr">安装人员</td>
              <td class="add-tr"><input /></td>
            </tr>
            <tr>
              <td class="add-tr">安装地点</td>
              <td class="add-tr"><input /></td>
              <td class="add-tr">安装备注</td>
              <td class="add-tr"><input /></td>
            </tr>
          </table>

          <!-- <div class="select-group">
              <span class="select-group-notice">请选择车辆所属的车组</span>
              <Tree
              class="item"
              :item="groupTreeData"
              type="forGroup"
              @clickItem="selectGroup"
            ></Tree>
          </div> -->
          <div>
            <div class="button" @click="addCar">保存</div>
            <div class="button" @click="hideAddCarForm">取消</div>
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
    display flex
    width 30%
}
.search{
    margin-bottom 10px
    display inline-block
}
.opt-button{
    flex 1
    margin-left 10px
    border 1px solid #ddd
    display inline-block
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
.select-group{
    width 50%
    margin-left 30%
    text-align left
}
.select-group-notice{
    color red
}
.addform{
    width 100%
    text-align left
    margin 100px
    margin-left 20%
    margin-bottom 20px
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
.add-table{
    margin 30px
}
.add-tr{
    padding-top 15px
    padding-bottom 15px
}
select{
    width 100%
}
.add-required{
    color red
}
</style>
