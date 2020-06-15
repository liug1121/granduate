<script>
export default {
  name: "TwoCode",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @touchmove.prevent>
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            加助教微信，联系此学长/学姐
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div></div>
            <div class="tow-code">
              <img
                class="tow-code-img"
                src="https://customer.okaoyan.com/api/v1/wechat_nos/random_qr?channer_id=1"
              />
            </div>
            <div class="notice">学长编号已复制,快去粘贴给助教吧！</div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer"> </slot>
        </footer>
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
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width:500px;
  height:350px;
  border-radius:12px 12px 0px 0px;
}

/* .modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  position: fixed;
  margin: auto;
  bottom: 0;
} */

.modal-header{
  padding-top: 15px;
  display: flex;
  width:500px;
  height:134px;
  background:rgba(51,143,255,1);
  border-radius:12px 12px 0px 0px;
  justify-content: center;
  font-size:24px;
  color:rgba(255,255,255,1);
}

.body-top{
  width:500px;
  height:67px;
  background:rgba(51,143,255,1);
}

.tow-code{
  width:214px;
  height:214px;
  background:rgba(246,245,245,1);
  position: absolute;
  z-index:999;
  top:-70px;
  left:144px
  border-radius:12px 12px 12px 12px;
}

.tow-code-img{
  width:100%;
  height:100%;
}

.notice{
  margin-top:140px;
  margin-left:88px;
  font-size:20px;
  color:rgba(0,0,0,1);
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
