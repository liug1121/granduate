<template>
  <div class="card">
    <table>
      <tr>
        <td><div class="title">评价</div></td>
        <td class="title-star">
          <img class="star" src="../../assets/wjx.png" />
        </td>
        <td class="title-star">
          <img class="star" src="../../assets/wjx.png" />
        </td>
        <td class="title-star">
          <img class="star" src="../../assets/wjx.png" />
        </td>
        <td class="title-star">
          <img class="star" src="../../assets/wjx.png" />
        </td>
        <td class="title-star">
          <img class="star" src="../../assets/wjx.png" />
        </td>
        <td class="title-score">5分</td>
      </tr>
    </table>

    <div class="split-line"></div>
    <div class="content">{{ comment }}</div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      student: {},
      comment: null,
      comments: [
        {
          notice: "满意，人超nice的",
          sex: -1
        },
        {
          notice:
            "对接之前还怕学长信息造假，不过考研派的学姐很用心的帮我确认了真实性，总体很满意 ",
          sex: 0
        },
        {
          notice: "学姐非常温柔细心，每次都会主动找我，帮我解决了很多问题",
          sex: 1
        },
        {
          notice: "总体上还行",
          sex: -1
        },
        {
          notice: "很像找了个私人老师，问问题也不厌其烦，解决了大部分问题 ",
          sex: -1
        },
        {
          notice: "优秀的大佬",
          sex: -1
        },
        {
          notice: "学姐非常耐心认真，温和可亲，有问必答，强烈推荐！",
          sex: 1
        },
        {
          notice: "学长非常优秀，和优秀的人学习，自己提升的页非常快。",
          sex: 0
        },
        {
          notice: "很好",
          sex: -1
        },
        {
          notice: "很棒",
          sex: -1
        },
        {
          notice: "人很好，不仅是学习上，考研日常生活中也能给我帮助",
          sex: -1
        }
      ]
    };
  },
  created() {
    let student = this.$route.params;
    this.student = student;
    let sex = student.sex;
    let comments = this.comments.filter(comment => {
      return (comment.sex = sex || comment.sex == -1);
    });
    let index = Math.floor(Math.random() * (comments.length - 1));
    this.comment = comments[index].notice;
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
    font-size 28px;
    color rgba(51,51,51,1);
    padding-right 300px;
    padding-left 23px
    height 67px
    padding-top 23px

.title-star
    width 28px;
    height 27px;
    text-align center;

.title-score
    font-size 24px;
    color:rgba(104,106,108,1);
    padding-right 23px
    padding-bottom 10px

.content
    font-size 24px;
    color:rgba(104,106,108,1);
    padding-left 23px
    padding-top 34px

.star
  width:28px;
  height:27px;
  margin-right 12px
</style>
