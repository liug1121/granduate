<template>
  <div @click="hideTwoCodeDlg" class="wrapper">
    <div class="header"><baseinfo /></div>
    <div class="split-line"></div>
    <div class="base-item">
      <table>
        <tr>
          <td><p class="base-item-label">研究生院校：</p></td>
          <td>
            <p class="base-item-text">{{ student.school }}</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="split-line"></div>
    <div class="base-item">
      <table>
        <tr>
          <td><p class="base-item-label">研究生专业：</p></td>
          <td>
            <p class="base-item-text">{{ student.major }}</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="split-line"></div>
    <div class="base-item">
      <table>
        <tr>
          <td>
            <p class="base-item-label">
              专业课程一（{{ student.professionOne }}）：
            </p>
          </td>
          <td>
            <p class="base-item-text">{{ student.professionOneScore == 0|| student.professionOneScore == undefined ? '保密' : student.professionOneScore + '分' }}</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="split-line"></div>
    <div class="base-item">
      <table>
        <tr>
          <td>
            <p class="base-item-label">
              专业课程二（{{ student.professionTwo }}）：
            </p>
          </td>
          <td><p class="base-item-text">保密</p></td>
        </tr>
      </table>
    </div>
    <div class="split-line"></div>
    <div class="base-item">
      <table>
        <tr>
          <td><p class="base-item-label">初试排名：</p></td>
          <td><p class="base-item-text">保密</p></td>
        </tr>
      </table>
    </div>
    <div class="split-line"></div>
    <div class="base-item">
      <table>
        <tr>
          <td><p class="base-item-label">总排名：</p></td>
          <td><p class="base-item-text">保密</p></td>
        </tr>
      </table>
    </div>
    <div class="split-line"></div>
    <div class="base-item">
      <table>
        <tr>
          <td><p class="base-item-label">专业课参考书目：</p></td>
          <td><p class="base-item-text">保密</p></td>
        </tr>
      </table>
    </div>
    <div class="split-line"></div>
    <div class="others">
      <div class="others-card others-mine"><mine /></div>
      <p class="others-notice">
        *以上信息为研究生自主填写，已经过考研派初审，但不能确保完全没有错漏之处，
        在您和研究生学长对接时，考研派学姐会帮您确认信息真
      </p>
      <div class="others-card others-comment"><comment /></div>
    </div>
    <div
      id="contact"
      class="contact"
      @click="showTwoCodeDlgModal"
      v-clipboard:copy="notice"
      v-clipboard:success="handleCopyStatus(true)"
      v-clipboard:error="handleCopyStatus(false)"
    >
      <p id="contact-text" class="contact-text">立即联系学长/学姐</p>
    </div>
    <TwoCodeDlg
      id="twoCodeDlg"
      v-show="isTwoCodeDlgVisible"
      @close="closeTwoCodeDlgModal"
    />
  </div>
</template>

<script>
import BaseInfo from "./BaseInfo.vue";
import Mine from "./Mine.vue";
import Comment from "./Comment.vue";
import TwoCodeDlg from "../../components/TwoCodeDlg.vue";
export default {
  name: "Senior",
  components: {
    baseinfo: BaseInfo,
    mine: Mine,
    comment: Comment,
    TwoCodeDlg
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
    showTwoCodeDlgModal() {
      this.isTwoCodeDlgVisible = true;
    },
    closeTwoCodeDlgModal() {
      this.isTwoCodeDlgVisible = false;
    },
    handleCopyStatus(status) {
      this.copySucceeded = status;
    }
  },
  data() {
    return {
      student: {},
      isTwoCodeDlgVisible: false,
      copySucceeded: null,
      notice: null
    };
  },
  created() {
    let student = this.$route.params;
    this.student = student;
    let id = student.id;
    let sex = student.sex == 0 ? "学长" : "学姐";
    this.notice =
      "学姐您好，我想找编号" + id + "的" + sex + "研究生，可以帮我对接一下吗？";
  }
};
</script>

<style scoped lang="stylus">
.wrapper

  width 750
.header
    width 750px;
    height 200px;

.split-line
    width 750px;
    height 1px;
    background rgba(223,223,223,1);

.base-item
    width 750px;
    height 98px;
    padding-top 38px
    margin-left 50px

.base-item-label
  font-size:32px;
  color:rgba(51,51,51,1);

base-item-text
  font-size:28px;
  color:rgba(103,105,107,1);
  margin-left 15px

.others
    width 750px;
    height 600px;
    background rgba(246,245,245,1);
    padding-top:30px;

.others-card
    width 690px;
    height 200px;
    background rgba(255,255,255,1);
    box-shadow 0px -4px 15px 0px rgba(0, 0, 0, 0.05);
    border-radius 10px;

.others-mine
    margin-left 30px;

.others-comment
    margin-top 29px;
    margin-left 30px;

.others-notice
  width:644px;
  height:45px;
  font-size:18px;
  color:rgba(103,105,107,1);
  padding-left 55px
  padding-top 15px
  padding-bottom 29px

.contact
    width 382px;
    height 70px;
    background linear-gradient(90deg,rgba(140,186,255,1),rgba(51,143,255,1));
    border-radius 35px 35px 35px 35px;

    position fixed
    top 1010px
    left 20px
    margin-left 184px

.contact-text
    font-size 28px;
    color rgba(255,255,255,1);
    text-align center;
    padding-top 15px;
</style>
