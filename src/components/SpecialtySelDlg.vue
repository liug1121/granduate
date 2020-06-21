<script>
import { mapGetters } from "vuex";
import common from "../utils/common";
export default {
  name: "SpecialtySelDlg",
  methods: {
    close() {
      if (this.major == "") 
        this.major = this.majors[this.majorSelectIndex];
      this.$emit("onSelectedMajor", this.major);
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    },
    selectMajor(index, major) {
      this.majorSelectIndex = index;
      this.$emit("onSelectedMajor", major);
    },
    search() {
      let majorName = this.$refs["searchtext"].value;
      if (majorName == "") {
        this.$store.dispatch("majors/getAll");
      } else {
        this.$store.dispatch("majors/getByMajorName", majorName);
      }
      this.majorSelectIndex = 1;
      this.$refs.items.scrollTop = 0;
      this.major == ""
    },
    majorScroller() {
      let majorSelectIndex = common.getScrollPosition(
        this.$refs.items,
        this.getMajorsForList.length
      );
      this.majorSelectIndex = majorSelectIndex + 1
      this.major = this.majors[this.majorSelectIndex - 1];
    }
  },
  beforeCreate() {
    this.$store.dispatch("majors/getAll");
  },
  computed: {
    ...mapGetters("majors", {
      majors: "getNames"
    }),
    getMajorsForList() {
      let majors = [];
      majors.push({ name: "", valid: false });
      
      for (let i = 0; i < this.majors.length; i++) {
        let major = {
          name: this.majors[i],
          valid: true
        };
        majors.push(major);
      }
      majors.push({ name: "", valid: false });
      majors.push({ name: "", valid: false });
      majors.push({ name: "", valid: false });
      return majors;
    }
  },
  watch:{
    getMajorsForList(){
      this.major = this.majors[this.majorSelectIndex - 1];
    }
  },
  data() {
    return {
      majorSelectIndex: 1,
      major: ""
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
                <td @click="cancel">
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
            <div class="search">
              <table>
                <tr>
                  <td><input class="search-input" ref="searchtext" /></td>
                  <td>
                    <div class="search-btn">
                      <p class="search-btn-text" @click="search">搜索</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="split"></div>
            <div class="items" @scroll="majorScroller" ref="items">
              <div
                v-for="(major, index) in getMajorsForList"
                :key="index"
                v-bind:class="[
                  index == majorSelectIndex ? 'item item-selected' : 'item'
                ]"
              >
                {{ major.name }}
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
  height:603px;
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

.search{
    height : 126px
}
.search-input{
  width:362px;
  height:72px;
  background:rgba(255,255,255,1);
  border:2px solid rgba(227,227,227,1);
  border-radius:6px;
  margin-top:25px;
  margin-left:124px;
}

.search-btn{
  width:122px;
  height:72px;
  background:rgba(51,143,255,1);
  border-radius:6px;
  margin-top:25px;
  margin-left:14px;
}

.search-btn-text{
  font-size:24px;
  color:rgba(255,255,255,1);
  text-align:center;
  padding-top:16px;
}

.items{
    font-size:36px;
    text-align: center;
    overflow scroll;
    height 260px;
}

.item-selected{
    color:rgba(51,143,255,1);
}

.item{
    margin-top:54px;
    height 31px
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
