<template>
  <div>
    <div class="split"></div>
    <table class="student">
      <tr>
        <td><img class="img-tc" :src="require('../../assets/' + student.icon + '.png')" /></td>
        <td>
          <table class="student-info">
            <tr>
              <td class="student-info-name">{{ student.name }}</td>
            </tr>
            <tr>
              <td class="student-info-id">
                编号：{{ student.id }}
              </td>
            </tr>
          </table>

          <table class="student-grade">
            <tr>
              <td class="student-grade-level">{{ student.year }}级</td>
              <td><img class="icon-img" src="../../assets/zs.png" /></td>
              <td>{{ student.type }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  data() {
    return {
      student: {}
    };
  },

  created() {
    let student = this.$route.params;
    student.type = student.type == 0 ? "学硕" : "专硕";
    this.student = student;
    let name = ''
    let icon = ''
    if(student.sex == 0){
      name = "XXX学长"
      icon = 'male'
    }else if(student.sex == 1){
       name = "XXX学姐"
       icon = 'female'
    }else{
      name = "XXX"
      icon = 'secret'
    }
    this.student.name = name
    this.student.icon = icon
  }
};
</script>

<style scoped lang="stylus">
.icon-img
    width 30px;
    height 20px;
    margin-top 10px;


.img-tc
    width 137px
    height 137px
    margin-bottom 39px

.student
  margin-left 50px
  margin-top 30px
  margin-bottom 39px

.student-info
  margin-left 32px

.student-info-name
  margin-bottom 14px
  font-size:36px;
  color:rgba(51,51,51,1);

.student-info-id
  font-size:26px;
  color:rgba(61,148,255,1);

.student-grade
  margin-left 32px
  font-size:20px;
  color:rgba(51,143,255,1);
  margin-bottom 50px

.student-grade-level
  padding-right 40px

.split
  width:750px;
  height:1px;
  background:rgba(223,223,223,1);
</style>
