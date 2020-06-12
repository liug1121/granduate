<template>
  <div class="scroll-up" ref="scroll">
    <ul>
      <li class="text">  
        当前已有{{notice.counsel_nums}}位学长学姐加入，{{notice.senior_nums}}位学长正在辅导
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
  name: "TextScroller",
  data() {
    return {
      scrollArea: "",
      speed: 20,
      timer: null,
      delay: 3000,
      liHeight: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
    //   this.scrollArea = this.$refs.scroll;
    //   let li = this.scrollArea.getElementsByTagName("li");
    //   this.liHeight = li[0].offsetHeight;
    //   this.scrollArea.scrollTop = 0;
    //   this.scrollArea.innerHTML += this.scrollArea.innerHTML;
    //   1 > 1 && setTimeout(this.startScroll, this.delay);
    // //   this.scrollData.length > 1 && setTimeout(this.startScroll, this.delay);
    });
  },
  methods: {
    startScroll() {
      this.timer = setInterval(this.scrollUp, this.speed);
      this.scrollArea.scrollTop++;
    },
    scrollUp() {
      if (this.scrollArea.scrollTop % this.liHeight == 0) {
        clearInterval(this.timer);
        setTimeout(this.startScroll, this.delay);
      } else {
        this.scrollArea.scrollTop++;
        if (this.scrollArea.scrollTop >= this.scrollArea.scrollHeight / 2) {
          this.scrollArea.scrollTop = 0;
        }
      }
    }
  },
    computed:{
        ...mapGetters('notices',{
        notice : 'getNotices',
        })
 
    },
    beforeCreate(){
        this.$store.dispatch('notices/getNotices')
    },
};
</script>

<style scoped lang="stylus">
.scroll-up{
    height:50px;
    line-height:50px;
    overflow:hidden;
}

.text
    width:750px;
    height:50px;
    background:rgba(254,180,45,1);
    font-size:22px;
    color:rgba(255,255,255,1);
    text-align center
</style>
