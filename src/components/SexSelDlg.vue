<script>
import common from "../utils/common";
export default {
  name: "SexSelDlg",
  computed: {
    getAllSex() {
      let allSex = [];
      allSex.push("男");
      allSex.push("女");
      allSex.push("保密")
      allSex.push("");
      return allSex;
    }
  },

  methods: {
    close() {
      if (this.sex == "") 
        this.sex = this.getAllSex[this.selectedIndex];
      this.$emit("onSelectSex", this.sex);
      this.$emit("close");
    },

    sexScroller() {
      this.selectedIndex = common.getScrollPosition(
        this.$refs.items,
        this.getAllSex.length
      );
      if (this.selectedIndex >= 3) return;
      this.sex = this.getAllSex[this.selectedIndex];
    }
  },

  data() {
    return {
      selectedIndex: 0,
      sex: ""
    };
  }
};
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <table class="model-header-btn">
              <tr>
                <td @click="close">
                  <p class="model-header-btn-cancel">取消</p>
                </td>
                <td @click="close"><p class="model-header-btn-ok">确定</p></td>
              </tr>
            </table>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div class="split"></div>
            <div class="items" @scroll="sexScroller" ref="items">
              <div
                v-bind:class="[
                  index == selectedIndex ? 'item item-selected' : 'item'
                ]"
                v-for="(sex, index) in getAllSex"
                :key="index"
              >
                {{ sex }}
              </div>
            </div>
            <div class="split split-bottom"></div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>
<style scoped lang="stylus">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  position: fixed;
  margin: auto;
  bottom: 0;
  flex-direction: column;
  width:750px;
  height:474px;
  border-radius:12px 12px 0px 0px;
}

.modal-header{
  display: flex;
  width:750px;
  height:91px;
  background:rgba(255,255,255,1);
  justify-content: space-between;
}
.model-header-btn{
    width:100%;
}

.model-header-btn-cancel{
    text-align : left
    margin-left :20px;
    margin-top:28px;
    font-size:32px;
    color:rgba(127,127,127,1);
}

.model-header-btn-ok{
    text-align : right
    margin-right :20px;
    margin-top:28px;
    font-size:32px;
    color:rgba(51,143,255,1);
}

.modal-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
}

.modal-body {
  position: relative;
  font-size:24px;
  color:rgba(0,0,0,1);
}

.split{
    width:750px;
    height:2px;
    background:rgba(232,232,232,1);
}

.split-bottom{
    margin-top:85px;
}

.items{
    font-size:36px;
    text-align: center;
    overflow scroll;
    height 200px;
}

.item-selected{
    color:rgba(51,143,255,1);
}

.item{
    margin-top:54px;
}

.ok-btn{
  width:246px;
  height:46px;
  background:linear-gradient(90deg,rgba(140,186,255,1),rgba(51,143,255,1));
  border-radius:23px 22px 23px 23px;
}

.ok-btn-text{
  text-align: center;
  font-size:26px;
  color:rgba(255,255,255,1);
  padding-top: 5px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease
}
</style>
