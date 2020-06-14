<script>
export default {
  name: "YearSelDlg",
  methods: {
    close() {
      this.$emit("close");
    },
    selectYear(index, year){
          this.yearSelectedIndex = index
        //   console.log(year)
          this.$emit('onSelectYear', year)
      }
  },
  computed:{
      years() {
          let d = new Date()
          let year = d.getYear() + 1900
          let years = []
          years.push(year)
          for(let i = 0; i < 4; i++){
              year = year - 1
              years.push(year)
          }
          return years
      }
  },
  data(){
    return {
        yearSelectedIndex:0
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
            <div class="items">
              <div v-for="(year, index) in years" :key="year"  @click="selectYear(index, year)"
              v-bind:class="[index == yearSelectedIndex ? 'item item-selected' : 'item']">
              {{year}}
              </div>
              <!-- <div class="item item-selected">2021</div>
              <div class="item">2020</div>
              <div class="item">2019</div>
              <div class="item">{{years}}</div> -->
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
    height 300px;
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
