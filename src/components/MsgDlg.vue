<script>
export default {
  name: "MsgDlg",
  methods: {
    close() {
      this.$emit("close");
    }
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
          <slot name="header"> <img class="img" src="../assets/th.png"/></slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div class="info">
              您搜索的专业学长名额紧张, 应学长要求不对外展示信息
              请加学姐微信对接该学长
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <div class="ok-btn" @click="close">
              <p class="ok-btn-text">好的</p>
            </div>

            <!-- I'm the default footer!

            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Close me!
            </button> -->
          </slot>
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
  height:400px;
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
  padding: 15px;
  display: flex;
  width:500px;
  height:134px;
  background:rgba(51,143,255,1);
  border-radius:12px 12px 0px 0px;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}
.modal-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  font-size:24px;
  color:rgba(0,0,0,1);
}

.info{
  width:292px;
  height:95px;
  font-size:24px;
  color:rgba(0,0,0,1);
  margin-left:104px;
}

.ok-btn{
  width:246px;
  height:46px;
  background:linear-gradient(90deg,rgba(140,186,255,1),rgba(51,143,255,1));
  border-radius:23px 22px 23px 23px;
  margin-top:35px;
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

.img
  width 74px
  height 67px
  margin-left 200px
  margin-top 33px
</style>
