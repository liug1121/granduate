<template>
  <div class="student">
    <table>
      <tr>
        <td class="name-text">{{name}}</td>
        <td class="sys-number">编号：{{number}}</td>
        <td class="sys-date">{{indate}} 加入</td>
      </tr>
    </table>

    <table>
      <tr>
        <td class="info-text">{{school}}</td>
        <td><div class="info-split"></div></td>
        <td class="info-text">{{major}}</td>
      </tr>
    </table>

    <table>
      <tr>
        <td class="grade-text">{{grade}}级</td>
        <td><img class="icon-img" src="../../assets/zs.png" /></td>
        <td class="grade-text">{{gradeinfo}}</td>
      </tr>
    </table>
  </div> </template>

<script>
export default {
  name: "Student",
  props: ['name', 'number','indate', 'school', 'major', 'grade', 'gradeinfo']
};
</script>

<style scoped lang="stylus">
.student
    margin-top 10px;
.name-text
    font-size 32px;
    color rgba(51,51,51,1);

.sys-number
    font-size 20px;
    color rgba(114,112,114,1);
    padding-left 5px;

.sys-date
    font-size 20px;
    color rgba(114,112,114,1);
    padding-left 20px;

.info-text
    padding-left 7px;
    font-size 24px;
    color rgba(114,112,114,1);

.info-split
    width 2px;
    height 24px;
    background rgba(231,231,231,1);

.grade-text
    font-size 20px;
    color rgba(51,143,255,1);

.icon-img
    padding-left 40px;
    padding-top 10px;
    width 30px;
    height 20px;
</style>
