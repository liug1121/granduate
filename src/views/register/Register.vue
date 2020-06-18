<template>
  <div class="register">
    <div class="title">
      <p class="title-big-text">研究生兼职信息登记表</p>
      <p class="title-small-text">
        数据表明填写的信息越全面，兼职的次数就越多。
      </p>
      <p class="title-small-text">
        我们的研究生辅导月均收入会在1500-6000之间。
      </p>
    </div>
    <form class="form">
      <table>
        <tr>
          <td class="label">*姓名：</td>
          <td><input v-model="name" v-bind:class="checkInput('name')" /></td>
          <td><p v-if="nameError" class="error">请输入姓名</p></td>
        </tr>
        <tr class="form-tr">
          <td class="label">*性别：</td>
          <td>
            <div v-bind:class="checkInput('sex')" @click="onSexSel">
              {{ sexNick }}
            </div>
          </td>
          <td><p v-if="sexError" class="error">请选择性别</p></td>
        </tr>
        <tr>
          <td class="label">*研究生学校：</td>
          <td>
            <div v-bind:class="checkInput('school')" @click="onSchoolSel">
              {{ school }}
            </div>
          </td>
          <td><p v-if="schoolError" class="error">请选择您的学校</p></td>
        </tr>
        <tr>
          <td class="label">*研究生专业：</td>
          <td>
            <div v-bind:class="checkInput('major')" @click="onSpecialtySel">
              {{ major }}
            </div>
          </td>
          <td><p v-if="majorError" class="error">请选择您的专业</p></td>
        </tr>
        <tr>
          <td class="label">*入学年份：</td>
          <td>
            <div v-bind:class="checkInput('year')" @click="onYearSel">
              {{ year == 1900 ? '' : year }}
            </div>
          </td>
          <td><p v-if="yearError" class="error">请选择入学年份</p></td>
        </tr>
        <tr>
          <td class="label">类型：</td>
          <td>
            <input type="radio" value="1" v-model="type" /><label
              class="type-radio"
              >一志愿上岸</label
            >
            <input type="radio" value="2" v-model="type" /><label
              class="type-radio"
              >调剂</label
            >
            <input type="radio" value="3" v-model="type" /><label
              class="type-radio"
              >保研</label
            >
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="label">初试分数：</td>
          <td><input v-model.number="score1" class="input" type="number" oninput="if(value.length>3) value = value.slice(0,3)"/></td>
          <td></td>
        </tr>
        <tr>
          <td class="label">初试排名：</td>
          <td><input v-model.number="rank" class="input" type="number" oninput="if(value.length>3) value = value.slice(0,3)"/></td>
          <td></td>
        </tr>
        <tr>
          <td class="label">总排名：</td>
          <td>
            <input v-model.number="allRank" class="input" type="number" oninput="if(value.length>3) value = value.slice(0,3)"/>
          </td>
          <td></td>
        </tr>
      </table>

      <table>
        <tr>
          <td class="label label">*专业课程一：</td>
          <td>
            <input v-model="course1" v-bind:class="checkInput('course1')" />
          </td>
          <td>*分值：</td>
          <td>
            <input
              v-model.number="course1Score"
              v-bind:class="checkInput('course1Score')"
              type="number" oninput="if(value.length>3) value = value.slice(0,3)"
            />
          </td>
        </tr>
        <tr>
          <td class="label label">专业课程二：</td>
          <td><input v-model="course2" class="input-small" /></td>
          <td>分值：</td>
          <td>
            <input
              v-model.number="course2Score"
              class="input-small"
              type="number" oninput="if(value.length>3) value = value.slice(0,3)"
            />
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td class="label">*手机：</td>
          <td><input v-model="phone" v-bind:class="checkInput('phone')" /></td>
          <td><p v-if="phoneError" class="error">请输入手机</p></td>
        </tr>
        <tr>
          <td class="label">微信：</td>
          <td><input v-model="weChart" class="input" /></td>
          <td></td>
        </tr>
      </table>

      <table>
        <tr>
          <td class="label">自我介绍：</td>
          <td>
            <textarea
              v-model="comment"
              class="textarea"
              placeholder="可以谈一谈自己擅长的方面和优势，或者简单介绍一下专业课参考书目以及自己的备考经验。"
            >
内容</textarea
            >
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td class="label">学历认证：</td>
          <td>
            <p class="notice">
              上传您的研究生学生证或校园卡，录取通知书，学信网待录取通知，拟录取名单截图的其中一种（填写此项可以让学生更信任您的学历信息，非必填）
            </p>
          </td>
        </tr>
      </table>

      <div>
        <div v-if="hasNoImg" class="upload">
          <img class="icon" src="../../assets/addfile.png" />
          <p class="upload-btn-text">上传照片</p>
          <input class="input-select" @change="add_img" type="file" />
        </div>
        <div v-else class="upload">
          <div v-for="(item, index) in imgs" :key="item">
            <img :src="item" class="image" />
            <span @click="delete_img(index)" class="image-delete"
              ><img
                src="../../assets/delete.png"
                v-if="addImageResult.code == 0"
            /></span>
          </div>
        </div>
      </div>
      <div class="submit" @click="addStudent()">
        <p class="submit-text">提交</p>
      </div>
    </form>
    <div class="toast" v-show="toastShow">
      {{ toastText }}
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
    <YearSelDlg
      v-show="isYearSelDlgVisible"
      @close="closeYearSelDlgModal"
      @onSelectYear="onSelectYear($event)"
    />
    <SexSelDlg
      v-show="isSexSelDlgVisible"
      @close="closeSexSelDlgModal"
      @onSelectSex="onSelectSex($event)"
    ></SexSelDlg>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SchoolSelDlg from "../../components/SchoolSelDlg.vue";
import SpecialtySelDlg from "../../components/SpecialtySelDlg.vue";
import YearSelDlg from "../../components/YearSelDlg.vue";
import SexSelDlg from "../../components/SexSelDlg.vue";
import common from "../../utils/common";
export default {
  name: "Register",

  components: {
    SchoolSelDlg,
    SpecialtySelDlg,
    YearSelDlg,
    SexSelDlg
  },

  computed: {
    ...mapState("student", {
      addImageResult: "addImageResult"
    })
  },

  methods: {
    onYearSel() {
      this.isYearSelDlgVisible = true;
      common.fixedPage();
    },
    closeYearSelDlgModal() {
      this.isYearSelDlgVisible = false;
      common.unfixedPage();
    },
    onSchoolSel() {
      this.isSchoolSelVisible = true;
      common.fixedPage();
    },

    closeSchoolSel() {
      this.isSchoolSelVisible = false;
      common.unfixedPage();
    },

    onSpecialtySel() {
      this.isSpecialtySelDlgVisible = true;
      common.fixedPage();
    },
    closeSpecialtySelDlgModal() {
      this.isSpecialtySelDlgVisible = false;
      common.unfixedPage();
    },

    onSexSel() {
      this.isSexSelDlgVisible = true;
      common.fixedPage();
    },
    closeSexSelDlgModal() {
      this.isSexSelDlgVisible = false;
      common.unfixedPage();
    },

    onSelectSex(sex) {
      console.log(sex)

      if (sex == "男") {
        this.sex = 0; 
        this.sexNick = '男';
      }
      else if(sex == '女'){
        this.sex = 1; 
        this.sexNick = '女'
      }
      else {
        this.sex=2; 
        this.sexNick = '保密'
      }
      console.log(this.sex)
      console.log(this.sexNick)

      
    },

    onSelectedMajor(major) {
      this.major = major;
    },

    onSelectedSchool(schoolName) {
      this.school = schoolName;
    },

    onSelectYear(year) {
      this.year = year;
    },

    delete_img(item) {
      this.imgs.splice(item, 1);
      this.hasNoImg = true;
      this.$store.dispatch("student/deleteStudentImage");
    },

    add_img(event) {
      var reader = new FileReader();
      var img1 = event.target.files[0];
      this.file = img1;

      reader.readAsDataURL(img1);
      var that = this;
      reader.onloadend = function() {
        that.imgs.push(reader.result);
        that.hasNoImg = false;
        that.uploadImage();
      };
    },

    uploadImage() {
      const formData = new FormData();
      formData.append("file", this.file, "test.jpg");
      this.$store.dispatch("student/addStudentImage", formData);
    },

    addStudent() {
      this.initErrorStatus();
      if (this.name == "") {
        this.nameError = true;
      }
      if (this.sex == -1) {
        this.sexError = true;
      }
      if (this.school == "") {
        this.schoolError = true;
      }
      if (this.major == "") {
        this.majorError = true;
      }
      if (this.year == 1900) {
        this.yearError = true;
      }
      if (this.phone == "") this.phoneError = true;
      if (this.course1 == "") this.course1Error = true;
      if (this.course1Score == 0) this.course1ScoreError = true;

      if (
        this.nameError ||
        this.sexError ||
        this.schoolError ||
        this.majorError ||
        this.phoneError ||
        this.course1Error ||
        this.course1ScoreError
      ) {
        return;
      }

      let student = {
        name: this.name,
        sex: this.sex,
        school: this.school,
        major: this.major,
        year: this.year,
        score: this.score1,
        rank: this.rank,
        allRank: this.allRank,
        professionOne: this.course1,
        professionOneScore: this.course1Score,
        professionTwo: this.course2,
        professionTwoScore: this.course2Score,
        phone: this.phone,
        wechat: this.weChart,
        introduction: this.comment,
        eductionInfo: this.addImageResult.eductionInfo,
        type: this.type
      };

      this.$store.dispatch("student/addStudent", student);

      this.toast("添加成功");
      this.$router.push("/");
    },

    initErrorStatus() {
      this.nameError = false;
      this.sexError = false;
      this.schoolError = false;
      this.majorError = false;
      this.yearError = false;
      this.phoneError = false;
      this.course1Error = false;
      this.course1ScoreError = false;
    },

    checkInput(type) {
      if (type == "name") return !this.nameError ? "input" : "input-error";
      if (type == "sex") return !this.sexError ? "input" : "input-error";
      if (type == "school") return !this.schoolError ? "input" : "input-error";
      if (type == "major") return !this.majorError ? "input" : "input-error";
      if (type == "year") return !this.yearError ? "input" : "input-error";
      if (type == "phone") return !this.phoneError ? "input" : "input-error";
      if (type == "course1")
        return !this.course1Error ? "input-small" : "input-small-error";
      if (type == "course1Score")
        return !this.course1ScoreError ? "input-small" : "input-small-error";
    },

    toast(str) {
      let v = this;
      v.toastText = str;
      v.toastShow = true;
      setTimeout(function() {
        v.toastShow = false;
      }, 1500);
    }
  },

  data() {
    return {
      name: "",
      sex: 0,
      sexNick:'男',
      school: "",
      major: "",
      year: 1900,
      score1: null,
      rank: null,
      allRank: null,
      course1: "",
      course1Score: null,
      course2: "",
      course2Score: null,
      phone: "",
      weChart: "",
      comment: "",
      type: 1,

      nameError: false,
      sexError: false,
      schoolError: false,
      majorError: false,
      yearError: false,
      phoneError: false,
      course1Error: false,
      course1ScoreError: false,
      hasNoImg: true,
      imgs: [],
      toastShow: false,
      toastText: "",

      isSchoolSelVisible: false,
      isSpecialtySelDlgVisible: false,
      isYearSelDlgVisible: false,
      isSexSelDlgVisible: false
    };
  }
};
</script>

<style scoped lang="stylus">
.register
    width 750px;
    height 1721px;
    background:rgba(246,245,245,1);
.title
    width 750px;
    height 160px;
    background rgba(51,143,255,1);

.title-big-text
    font-size 36px;
    color rgba(255,255,255,1);
    padding-top 23px;
    padding-bottom 10px;
    margin-left 182px;

.title-small-text
    font-size:18px;
    color:rgba(255,255,255,1);
    margin-left 145px;

.form
    margin-top 24px;
    margin-left 67px;

.label
    font-size 26px;
    color rgba(51,51,51,1);
    text-align right;
    width 180px;

tr{
  height 60px
}

.input
    width 300px;
    height 46px;
    background rgba(255,255,255,1);
    border 1px solid rgba(160,160,160,1);
    border-radius 6px;

.input-error
    width 300px;
    height 46px;
    background rgba(255,255,255,1);
    border 1px solid rgba(249,93,67,1);
    border-radius 6px;

.input-small
    width 160px;
    height 46px;
    background rgba(255,255,255,1);
    border 1px solid rgba(160,160,160,1);
    border-radius 6px;

.input-small-error
    width 160px;
    height 46px;
    background rgba(255,255,255,1);
    border 1px solid rgba(249,93,67,1);
    border-radius 6px;

.textarea
    width 452px;
    height 208px;
    background rgba(255,255,255,1);
    border 1px solid rgba(160,160,160,1);
    border-radius 6px;
    margin-top 15px
    font-size:18px;

.notice
    font-size 18px;
    color rgba(86,86,86,1);
    width:458px

.addfile
    width 220px;
    height 150px;
    background rgba(248,248,250,1);
    border 1px solid rgba(160,160,160,1);
    border-radius 6px;
    margin-left 180px;

.addfile-btn-img
    width 43px;
    height 43px;
    padding-left 88px;
    padding-top 53px;

.addfile-btn-text
    width 100px;
    height 18px;
    font-size 18px;
    color rgba(43,42,44,1);
    padding-left 72px;

.submit
    width 382px;
    height 70px;
    background linear-gradient(90deg,rgba(140,186,255,1),rgba(51,143,255,1));
    border-radius 35px 35px 35px 35px;
    margin-top 30px;
    margin-left 100px;


.submit-text
    font-size 28px;
    color rgba(255,255,255,1);
    text-align center;
    padding-top 15px;

.error
  color:rgba(249,93,67,1)

.upload{
      width:220px;
      height:150px;
      background:rgba(247,247,249,1);
      border:1px solid rgba(159,159,159,1);
      border-radius:6px;
      margin-left :185px;
      margin-top:29px;
  }

.icon{
    margin-left: 88px;
    margin-top: 42px;
    width:43px
    height:43px
}

.upload-btn-text{
  margin-left:63px
  font-size:18px;
  color:rgba(43,42,44,1);
}

.input-select{
    width: 220px;
    height: 150px;
    border:1px solid #e1e1e1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background:rgba(247,247,249,1);
    border:1px solid rgba(159,159,159,1);
    border-radius:6px;
    top: -110px;
    left: 0px;
    z-index: 99999;
    opacity: 0;
}

.image{
    width:220px;
    height:150px;
}

.image-delete{
    position: relative;
    top:-185px;
    left:190px;
}

.toast {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 45%;
  transition: all .5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  color: #FFF;
  background: rgba(17, 17, 17, 0.7);
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  max-width: 150px;
}

.type-radio{
  margin-left 7px
  margin-right 7px
}
</style>
