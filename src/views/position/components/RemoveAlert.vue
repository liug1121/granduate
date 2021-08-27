<script>
import position from "../../../api/position";
export default {
  name: "RemoveAlert",
  data() {
    return {
      alertInfos:[],
      groups:[]
    }
  },
  created() {
    this.getAlertInfos()
  },
  methods: {
    getAlertInfos:function(){
      let params = {};
      params.pageNumber = 1;
      params.pageSize = 200;
      // let that = this
      position.getGroup(
        params,
        res => {
          // console.log('res:' + JSON.stringify(res.data))
          if (res.data.flag == 1) {
            this.groups = res.data.obj.data;
            this.groups.forEach(group => {
              let groupId = group.groupId
              let params = {}
              params.alarmTypes = 'isIllegalRemove'
              params.pageNumber = 1
              params.pageSize = 200
              params.findType = 0
              params.groupId = groupId
              console.log('group:' + group.groupId)
              position.getAlartInfos(params, res1=>{
                console.log('res1:' + JSON.stringify(res1.data))
                if(res1.data.flag == 1){
                  // that.alertInfos.push(res.data.obj.data)
                }
              }, null)
            });
            

          }
        },
        null
      );
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
<template>
  <transition name="modal-fade">
    <div class="pop-container" @touchmove.prevent @click="close">
      <div class="pop-display">
        <div class="pop-head">
          <span class="pop-title">拆除报警</span>
          <div class="pop-close" @click="close">关闭</div>
        </div>
        <div>
          <table class="pop-table">
            <tr>
              <td class="pop-td">序号</td>
              <td class="pop-td">车牌号</td>
              <td class="pop-td">车组名称</td>
              <td class="pop-td">车架号</td>
              <td class="pop-td">报警类型</td>
              <td class="pop-td">报警时间</td>
              <td class="pop-td">报警地点</td>
              <td class="pop-td">关注度等级</td>
              <td class="pop-td">关注备注</td>
              <td class="pop-td">备注</td>
              <td class="pop-td">当前地址</td>
            </tr>
            <tr v-for="(alertInfo, index) in alertInfos"
                    :key="index">
              <td class="pop-td">序号</td>
              <td class="pop-td">{{alertInfo.plate}}</td>
              <td class="pop-td">{{alertInfo.groupName}}</td>
              <td class="pop-td"></td>
              <td class="pop-td">{{alertInfo.type}}</td>
              <td class="pop-td">{{alertInfo.startTime}}</td>
              <td class="pop-td"></td>
              <td class="pop-td"></td>
              <td class="pop-td"></td>
              <td class="pop-td"></td>
              <td class="pop-td"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped lang="stylus">
@import '../../../assets/css/poptable.css'
</style>
