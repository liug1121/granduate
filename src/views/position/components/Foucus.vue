<script>
export default {
  name: "Foucus",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
<template>
  <transition name="modal-fade">
    <div class = "pop-container" @touchmove.prevent @click="close">
      <div class="pop-display">
          <div class="pop-head">
              <span class="pop-title">关注重点</span>
              <div class="pop-close" @click="close">关闭</div>
          </div>
          <div>
              <table  class="pop-table">
                  <tr>
                      <td class="pop-td">序号</td>
                      <td class="pop-td">车牌号</td>
                      <td class="pop-td">车组名称</td>
                      <td class="pop-td">关注度等级</td>
                      <td class="pop-td">车架号</td>
                      <td class="pop-td">设备类型</td>
                      <td class="pop-td">速度</td>
                      <td class="pop-td">最后上线时间</td>
                      <td class="pop-td">定位</td>
                      <td class="pop-td">状态时长</td>
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