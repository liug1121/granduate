<template>
  <div>
    <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="getImgUrl(currentImg)" @click="go(currentImg)"/>
      </div>
    </transition-group>
    <!-- <div :class = 'btn1Class'></div>
    <div :class = 'btn2Class'></div> -->
    <!-- <a class="prev" @click="prev" href="#">&#10094; Previous</a>
    <a class="next" @click="next" href="#">&#10095; Next</a> -->
    
  </div>
</template>
<script>
function changeBtnStatus(currentIndex){
    let btnsClass = ['img-sel1 ','img-sel2 ']
    let btnsSelected = ['', '']
    btnsSelected[currentIndex] = 'img-sel-selected'
    let btn1Class = btnsClass[0] + btnsSelected[0]
    let btn2Class = btnsClass[1] + btnsSelected[1]
    return{
            btn1Class : btn1Class,
            btn2Class : btn2Class
    }
}
export default {
  name: "Slider",
  data() {
    return {
      images: [
        "banner1",
        "banner2",
      ],
      imageUrls:{
        banner1:'',
        banner2:'/register'
       },
      timer: null,
      currentIndex: 0,
      btn1Class:'img-sel1 img-sel-selected',
      btn2Class:'img-sel2 '
    };
  },

  mounted: function() {
    this.startSlide();
  },

  methods: {
    startSlide: function() {
      this.timer = setInterval(this.next, 4000);
    },

    next: function() {
      this.currentIndex += 1;
      let currentIndex = Math.abs(this.currentIndex) % this.images.length
      let retStatus = changeBtnStatus(currentIndex)
      this.btn1Class = retStatus.btn1Class
      this.btn2Class = retStatus.btn2Class
    },

    prev: function() {
      this.currentIndex -= 1;
      let currentIndex = Math.abs(this.currentIndex) % this.images.length
      changeBtnStatus(currentIndex)
      let retStatus = changeBtnStatus(currentIndex)
      this.btn1Class = retStatus.btn1Class
      this.btn2Class = retStatus.btn2Class
    },

    getImgUrl(imageName) {
      let images = require.context('../assets/', false, /\.png$/)
      return images('./' + imageName + ".png")
    },
    go(currentImg){
      let url = this.imageUrls[currentImg]
      if(url != '')
        this.$router.push('/register')
    },
  },

  computed: {
    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width:100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width:100%;
  opacity: 0;
}

img {
  width: 690px;
  height: 290px;
  margin-left: 30px;
  margin-top: 36px;
}

.img-sel1{
  width:14px;
  height:14px;
  background:rgba(187,213,253,1);
  border-radius:50%;
  position: relative;
  top: -50px;
  left:352px;
}

.img-sel2{
  width:14px;
  height:14px;
  background:rgba(187,213,253,1);
  /* background:rgba(255,255,255,1); */
  border-radius:50%;
  position: relative;
  top: -64px;
  left:384px;
}

.img-sel-selected{
  background:rgba(255,255,255,1);
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.9);
}
</style>>