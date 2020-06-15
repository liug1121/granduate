<template>
  <div>
    <div v-if="isFromCookie == 'false'">
      <div
        v-for="student in studentForDisplay"
        :key="student.id"
        class="list-item"
      >
        <table
          class="body"
          @click="router2Detail(student.id, studentForDisplay)"
        >
          <tr>
            <td>
              <table>
                <tr>
                  <td><img class="img-tc" src="../../assets/tc51.png" /></td>
                  <td>
                    <Student
                      :name="student.nickName"
                      :number="student.id < 0 ? '****' : student.id"
                      :indate="student.createDateStr"
                      :school="student.school"
                      :major="student.major"
                      :grade="student.year"
                      :gradeinfo="type2Name(student.type)"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <Ranking
                :rank="student.rankDisplay"
                :allrank="student.allRankDisplay"
              />
            </td>
          </tr>
          <tr>
            <td class="notice-text">* 为保护学长隐私，不对外展示姓名</td>
          </tr>
        </table>
      </div>
    </div>
    <!--从cookie中加载数据-->
    <div v-if="isFromCookie == 'true'">
      <div
        v-for="student in myLookedStudents"
        :key="student.id"
        class="list-item"
      >
        <table
          class="body"
          @click="router2Detail(student.id, myLookedStudents)"
        >
          <tr>
            <td>
              <table>
                <tr>
                  <td><img class="img-tc" src="../../assets/tc51.png" /></td>
                  <td>
                    <Student
                      :name="student.nickName"
                      :number="student.id < 0 ? '****' : student.id"
                      :indate="student.createDateStr"
                      :school="student.school"
                      :major="student.major"
                      :grade="student.year"
                      :gradeinfo="type2Name(student.type)"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <Ranking
                :rank="student.rankDisplay"
                :allrank="student.allRankDisplay"
              />
            </td>
          </tr>
          <tr>
            <td class="notice-text">* 为保护学长隐私，不对外展示姓名</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Student from "./Student.vue";
import Ranking from "./Ranking.vue";
import { mapGetters } from "vuex";
export default {
  name: "ListItem",
  props: ["isFromCookie", "selectedSchool", "selectedMajor"],
  components: {
    Student,
    Ranking
  },

  methods: {
    router2Detail(studentNum, stus) {
      let students = stus;
      let student = undefined;
      for (let i = 0; i < students.length; i++) {
        let stuNum = students[i].id;
        if (stuNum == studentNum) {
          student = students[i];
          break;
        }
      }
      if (student == undefined) return;
      if (student.isRandom) {
        this.$emit("onSelectedRandom", true);
        return;
      }

      this.$store.dispatch("student/addStudent2Cookie", student);
    //   this.$router.push({ name: "Senior", params: student });
        location.href = "https://www.okaoyan.com/parttime/${student.id}.html"
        
    },

    type2Name(type) {
      if (type == "-1") return "****";
      return type == 0 ? "学硕" : "专硕";
    },

    date2Year(date) {
      return date.substring(0, 10);
    },
    convert2Display(students) {
      for (let i = 0; i < students.length; i++) {
        if (students[i].sex == 0) {
          students[i].nickName = "XXX学长";
        } else if (students[i].sex == 1) {
          students[i].nickName = "XXX学姐";
        } else {
          students[i].nickName = "XXX";
        }
        let createDate = students[i].createTime.substring(0, 10).split("-");
        let createDateStr =
          createDate[0] + "-" + createDate[1] + "-" + createDate[2];
        students[i].createDateStr = createDateStr;

        let rank = students[i].rank;
        if (rank == 0 || rank == "" || rank == undefined)
          students[i].rankDisplay = "保密";
        else students[i].rankDisplay = "第" + rank + "名";
        let allRank = students[i].allRank;
        if (allRank == 0 || allRank == "" || allRank == undefined)
          students[i].allRankDisplay = "保密";
        else students[i].allRankDisplay = "第" + allRank + "名";
      }
      return students;
    }
  },

  computed: {
    ...mapGetters("student", {
      students: "getStudents",
      randomStudents: "getRandomStudents",
      myLookedStudents: "getStudentFromCookie"
    }),
    studentForDisplay() {
      if (this.students.length == 0) {
        let params = {
          school: this.selectedSchool == "学校" ? "****" : this.selectedSchool,
          major: this.selectedMajor == "专业" ? "****" : this.selectedMajor
        };
        this.$store.dispatch("student/getStudentByRandom", params);
        return this.convert2Display(this.randomStudents);
      } else {
        return this.convert2Display(this.students);
      }
    }
  },

  beforeCreate() {
    this.$store.dispatch("student/getStudents", { page_no: 1, page_size: 1 });
  },

  data() {
    return {
      isModalVisible: false
    };
  }
};
</script>

<style scoped lang="stylus">
.list-item
    width 690px;
    height 276px;
    background rgba(255,255,255,1);
    box-shadow 0px 4px 15px 0px rgba(0, 0, 0, 0.05);
    border-radius 10px;
    margin-left 30px;
    margin-top 15px;
    margin-bottom 15px;

.body
    margin-left:28px;

.notice-text
    padding-left 188px;
    font-size:20px;
    color:rgba(126,124,126,1);

.img-tc
    width 120px;
    height 120px;
    padding-top 28px;
</style>
