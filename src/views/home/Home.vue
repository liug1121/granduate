<template>
  <div class="body" @click="hideTwoCodeDlg">
    <transition name="fade">
      <div v-if="show" class="opt">
        <div class="slider"><slider /></div>
      </div>
    </transition>
    <table class="btns">
      <tr>
        <td>
          <div class="btn-school btn-box">
            <table class="btn-text">
              <tr @click="onSchoolSel">
                <td>
                  <div class="selected-text">
                    {{
                      selectedSchool.length > 4
                        ? selectedSchool.substring(0, 4)
                        : selectedSchool
                    }}
                  </div>
                </td>
                <td><div class="triangle"></div></td>
              </tr>
            </table>
          </div>
        </td>
        <td>
          <div class="btn-pro btn-box">
            <table class="btn-text">
              <tr @click="onSpecialtySel">
                <td>
                  <div class="selected-text">
                    {{
                      selectedMajor.length > 4
                        ? selectedMajor.substring(0, 4)
                        : selectedMajor
                    }}
                  </div>
                </td>
                <td><div class="triangle"></div></td>
              </tr>
            </table>
          </div>
        </td>
        <td>
          <div v-bind:class="change('btn')">
            <p v-bind:class="change('text')" @click="myLooked">浏览记录</p>
          </div>
        </td>
      </tr>
    </table>

    <table v-if="isListTitleShow">
      <tr>
        <td><div class="list-title-split" /></td>
        <td class="list-title">最新审核通过</td>
      </tr>
    </table>

    <div :class="getListClass" ref="listcontainer">
      <item
        :isFromCookie="isFromCookie"
        :selectedSchool="selectedSchool"
        :selectedMajor="selectedMajor"
        @onSelectedRandom="onSelectedRandom($event)"
      />
    </div>
    <div class="textscroller"><textscroller /></div>

    <div class="submit-container">
      <div class="submit-vertical-split"></div>
      <table class="submit">
        <tr>
          <td class="submit-horizontal-split"></td>
          <td class="submit-left">提交需求，我想被辅导</td>
          <td class="submit-right">
            <router-link to="/register" class="submit-right-text"
              ><p>我是研究生,提交表单做兼职</p></router-link
            >
          </td>
          <td class="submit-horizontal-split"></td>
        </tr>
      </table>
    </div>
    <SchoolSelDlg
      v-show="isSchoolSelVisible"
      @close="closeSchoolSel"
      @onSelectedSchool="onSelectedSchool($event)"
    />
    <SpecialtySelDlg
      v-show="isSpecialtySelDlgVisible"
      @close="closeSpecialtySelDlgModal"
      @onSelectedMajor="onSelectedMajor($event)"
    />
    <MsgDlg v-show="isModalVisible" @close="closeModal" />
    <TwoCodeDlg
      id="twoCodeDlg"
      v-show="isTwoCodeDlgVisible"
      @close="closeTwoCodeDlgModal"
    />
  </div>
</template>

<script>
import Slider from "../../components/Slider.vue";
import ListItem from "./ListItem.vue";
import TextScroller from "../../components/TextScroller.vue";
import SchoolSelDlg from "../../components/SchoolSelDlg.vue";
import SpecialtySelDlg from "../../components/SpecialtySelDlg.vue";
import MsgDlg from "../../components/MsgDlg.vue";
import TwoCodeDlg from "../../components/TwoCodeDlg.vue";
import common from "../../utils/common";

export default {
  name: "Home",
  components: {
    slider: Slider,
    item: ListItem,
    textscroller: TextScroller,
    SchoolSelDlg,
    SpecialtySelDlg,
    MsgDlg,
    TwoCodeDlg
  },
  beforeCreate() {
    this.isFromCookie = "false";
  },
  computed: {
    getListClass() {
      return this.listClass;
    }
  },

  methods: {
    hideTwoCodeDlg(event) {
      let twoCodeDlg = document.getElementById("twoCodeDlg");
      if (twoCodeDlg) {
        if (twoCodeDlg.contains(event.target)) {
          this.closeTwoCodeDlgModal();
        }
      }
    },
    hideTop() {
      console.log("hideTop");
    },
    onSchoolSel() {
      this.isSchoolSelVisible = true;
      common.fixedPage();
    },

    closeSchoolSel() {
      this.isSchoolSelVisible = false;
      common.unfixedPage();
    },

    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
      this.isTwoCodeDlgVisible = true;
      let info = ""
      if(this.selectedSchool != "学校")
        info = this.selectedSchool + "学校";
      if(this.selectedMajor != "专业")
        info =  info + this.selectedMajor + "专业"
      this.$copyText("学姐您好，我想找" + info + "的学长，可以帮我对接下吗？").then(
        function(e) {
          console.log(e);
        },
        function(e) {
          console.log(e);
        }
      );
    },

    onSpecialtySel() {
      this.isSpecialtySelDlgVisible = true;
      // this.fixedPage()
      common.fixedPage();
    },
    closeSpecialtySelDlgModal() {
      this.isSpecialtySelDlgVisible = false;
      common.unfixedPage();
    },
    closeTwoCodeDlgModal() {
      this.isTwoCodeDlgVisible = false;
    },

    onSelectedSchool(schoolName) {
      this.isListTitleShow = true;
      this.selectedSchool = schoolName;
      this.searchStudents();
      this.isListTitleShow = false;
    },
    onSelectedRandom(isRandom) {
      if (isRandom) this.showModal();
      else this.closeModal();
    },

    onChangeOptDisplay(show) {
      console.log(show);
    },

    onSelectedMajor(major) {
      this.isListTitleShow = true;
      this.selectedMajor = major;
      this.searchStudents();
      this.isListTitleShow = false;
    },

    searchStudents() {
      this.isFromCookie = "false";
      let params = {
        page_no: 1,
        page_size: 50
      };
      if (this.selectedSchool != "学校") params.school = this.selectedSchool;
      if (this.selectedMajor != "专业") params.major = this.selectedMajor;
      this.$store.dispatch("student/getStudents", params);
    },
    myLooked() {
      this.isFromCookie = "true";
      this.selectedSchool = "学校";
      this.selectedMajor = "专业";
      this.isListTitleShow = false;
    },
    change(type) {
      if (type == "btn") {
        return this.isFromCookie == "true"
          ? "btn-record-selected"
          : "btn-record";
      }

      if (type == "text") {
        return this.isFromCookie == "true"
          ? "btn-text-right-selected"
          : "btn-text-right";
      }
    },

    setScrollPosition() {
      if (this.$refs.listcontainer.scrollTop > 150) {
        this.show = false;
        this.listClass = "list-container-long";
      } else {
        this.show = true;
        this.listClass = "list-container";
      }
    }
    // fixedPage(){
    //   let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    //   document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px;'
    // },
    // unfixedPage(){
    //   let body = document.body
    //   body.style.position = ''
    //   let top = body.style.top
    //   document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
    //   body.style.top = ''
    // }
  },

  data() {
    return {
      isSchoolSelVisible: false,
      isSpecialtySelDlgVisible: false,
      selectedSchool: "学校",
      selectedMajor: "专业",
      isFromCookie: "false",
      show: true,
      isModalVisible: false,
      listClass: "list-container",
      isListTitleShow: true,
      isTwoCodeDlgVisible: false
    };
  },

  mounted() {
    let listcontainer = this.$refs.listcontainer;
    if (listcontainer == undefined) return;
    listcontainer.addEventListener("scroll", this.setScrollPosition);
  },
  destroyed() {
    let listcontainer = this.$refs.listcontainer;
    if (listcontainer == undefined) return;
    listcontainer.removeEventListener("scroll", this.setScrollPosition);
  }
};
</script>

<style scoped lang="stylus">
.body
  width 750px;
  height 1313px;
  background rgba(246,245,245,1);


.slider
  width 690px;
  height 290px;
  margin-bottom 50px


.opt
  width 748px;
  height 290px;
  background rgba(255,255,255,1);


.carousel
    width 690px;
    height 290px;

.btns
    width 748px;
    height 180px;

    background rgba(255,255,255,1);
    border-radius 0px 0px 30px 30px;
    padding-top 55px


.btn-school
    margin-right 5px;
    margin-left 27px;

.btn-pro
    margin-left 5px;
    margin-right 5px;

.btn-record
    margin-left 5px;
    width 170px;
    height 72px;
    background:rgba(255,255,255,1);
    border:2px solid rgba(51,143,255,1);
    border-radius 6px;

.btn-record-selected
    margin-left 10px;
    width:170px;
    height:72px;
    background:rgba(51,143,255,1);
    border-radius:6px;

.btn-box
    width 208px;
    height 72px;
    background rgba(255,255,255,1);
    border 2px solid rgba(51,143,255,1);
    border-radius 6px;

.btn-record-box
    width 170px;
    height 72px;
    background rgba(255,255,255,1);
    border 2px solid rgba(51,143,255,1);
    border-radius 6px;

.btn-text
    margin-left 30px;
    margin-top 10px;
    font-size 28px;

.selected-text
    width 115px;
    height 28px;

.btn-text-right
    margin-left 30px;
    padding-top 12px;
    font-size 28px;
    color:rgba(51,143,255,1);

.btn-text-right-selected
    margin-left 30px;
    padding-top 12px;
    font-size 28px;
    color:rgba(255,255,255,1);

 .triangle
    width 0px;
    height 0px;
    border-width 10px;
    border-style solid;
    border-color rgba(130,130,141,1) transparent transparent transparent;

    margin-top 14px
    margin-left 5px

.list-container
  -webkit-overflow-scrolling touch;
  overflow-scrolling touch;
  overflow scroll;
  height 728px;

.list-container-long
  -webkit-overflow-scrolling touch;
  overflow-scrolling touch;
  overflow scroll;
  height 978px;

.list-title
    font-size 36px;
    padding-top 22px
    padding-left 16px
    padding-bottom 22px

.list-title-split
    width 8px;
    height 32px;
    background rgba(51,143,255,1);
    margin-top 22px
    margin-left 30px
    margin-bottom 22px

.submit-container
    width 750px;
    height 119px;
    background rgba(255,255,255,1);
    box-shadow 0px -4px 15px 0px rgba(51,143,255,0.05);
    position fixed
    bottom 0

.submit
    border-collapse collapse;

.submit-left
    width 302px;
    height 70px;
    background linear-gradient(90deg,rgba(255,195,88,1),rgba(253,179,45,1));
    border-radius 35px 0px 0px 35px;
    font-size 26px;
    color rgba(255,255,255,1);
    padding-left 22px;

.submit-right
    width 382px;
    height 70px;
    background linear-gradient(90deg,rgba(140,186,255,1),rgba(51,143,255,1));
    border-radius 0px 35px 35px 0px;
    padding-left 32px;

.submit-right-text
    font-size 26px;
    color rgba(255,255,255,1);
    text-decoration: none;

.submit-horizontal-split
    width 32px;

.submit-vertical-split
    height 25px;

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform translateY(-70px)
}
.textscroller
  position fixed

  bottom 119px
</style>
