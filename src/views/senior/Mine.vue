<template>
  <div class="card">
    <div class="title">自我介绍</div>
    <div class="split-line"></div>
    <div class="content">{{ student.introduction }}</div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      student: {}
    };
  },
  created() {
    let student = this.$route.params;
    this.student = student;
  }
};
</script>

<style scoped lang="stylus">
.card
    width 100%;
    height 100%;
    background rgba(255,255,255,1);
    box-shadow 0px -4px 15px 0px rgba(0, 0, 0, 0.05);
    border-radius 10px;
.split-line
    width 100%;
    height 1px;
    background rgba(223,223,223,1);

.title
    font-size 28px
    color rgba(51,51,51,1)
    height 67px
    padding-left 23px
    padding-top 23px

.content
    font-size 24px;
    color rgba(104,106,108,1);
    height 92px
    padding-left 23px
    padding-top 34px
</style>
