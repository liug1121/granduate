<script>
export default {
  name: "TwoAlert",
  methods: {
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
          <span class="pop-title">二押点报警</span>
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
              <td class="pop-td">二押点名称</td>
              <td class="pop-td">报警地址</td>
              <td class="pop-td">关注度等级</td>
              <td class="pop-td">关注备注</td>
              <td class="pop-td">备注</td>
              <td class="pop-td">当前地址</td>
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
