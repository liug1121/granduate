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
    <div class = "container" @touchmove.prevent>
      <div class="display">
          <div class="head">
              <span class="title">关注重点</span>
              <div class="close">关闭</div>
          </div>
          <div class="table">
              <table>
                  <tr>
                      <td>序号</td>
                      <td>车牌号</td>
                      <td>车组名称</td>
                      <td>关注度等级</td>
                      <td>车架号</td>
                      <td>设备类型</td>
                      <td>速度</td>
                      <td>最后上线时间</td>
                      <td>定位</td>
                      <td>状态时长</td>
                  </tr>
              </table>
          </div>
      </div>
    </div>
  </transition>
</template>
<style scoped lang="stylus">
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display flex
  justify-content center
  text-align center
}
.display{
    width 1600px;
    height 900px;
    background white
}
.title{
    flex 1
    text-align left
    padding-left 5px
    margin-top 10px
}
.close{
    flex 1
    text-align right
    padding-right 5px
    margin-top 10px
}
.head{
    width 100%
    height 60px
    background gray
    text-align center
    display flex
}

table{
    width 100%
    border-collapse: collapse;
}
table, th, td {
  border 1px solid #ddd
}
</style>