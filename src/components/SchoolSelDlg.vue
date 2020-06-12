<script>
import { mapGetters} from 'vuex'

export default {
  name: "SchoolSelDlg",
  methods: {
    close() {
      this.$emit("close");
    },

    getSchools(index, province){
        this.$store.dispatch('schools/getByProvinceName', province)
        this.proviceSelectedIndex = index
    },

    selectedSchool(index, schoolName){
        // console.log(schoolName)
        this.schoolSelectedIndex = index
        this.$emit('onSelectedSchool', schoolName)
    }
  },

   computed:{
    ...mapGetters('schools', {
        schools: 'getSchools'
    }),
    ...mapGetters('provinces',{
        provinces: 'getNames'
    })

   },
   
  beforeCreate() {
    this.$store.dispatch('schools/getByProvinceName', '北京')
    this.$store.dispatch('provinces/getAll')
  },

  data(){
      return {
          isSchoolSelVisible: false,
          proviceSelectedIndex:0,
          schoolSelectedIndex:0
      }
  }
};
</script>

<template>
  <transition name="modal-fade">
         
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <table class="model-header-btn">
              <tr>
                <td @click="close">
                  <p class="model-header-btn-cancel">取消</p>
                </td>
                <td @click="close"><p class="model-header-btn-ok">确定</p></td>
              </tr>
            </table>
            
          </slot>
          
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div class="head-split"></div>
            <table class="items">
              <tr>
                <td>
                  <div class="province-items" >
                    <div v-for="(province, index) in provinces" :key="province"  @click="getSchools(index, province)" class="items-infos">
                        <div v-bind:class="[index == proviceSelectedIndex ? 'items-selected' : 'items-unselected']">{{province}}</div>
                        <div class="items-split"></div> 
                    </div>
                  </div>
                </td>
                <td>
                  <div class="school-items">
                    <div v-for="(school, index) in schools" :key="school"  @click="selectedSchool(index, school)" class="items-infos">
                        <div v-bind:class="[index == schoolSelectedIndex ? 'items-selected' : 'items-unselected']">{{school}}</div>
                        <div class="items-split"></div>
                    </div>
                    
                    <!-- <div>北京大学</div>
                    <div class="items-split"></div> -->
                  </div>
                </td>
              </tr>
            </table>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>


<style scoped lang="stylus">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  position: fixed;
  margin: auto;
  bottom: 0;
  flex-direction: column;
  width:750px;
  height:603px;
  border-radius:12px 12px 0px 0px;
}

.head-split
  width:750px;
  height:2px;
  background:rgba(231,231,231,1);

.modal-header{
  display: flex;
  width:750px;
  height:80px;
  background:rgba(255,255,255,1);
  justify-content: space-between;
}
.model-header-btn{
    width:100%;
}

.model-header-btn-cancel{
    text-align : left
    margin-left :20px;
    margin-top :25px;
    font-size:32px;
    color:rgba(127,127,127,1);
}

.model-header-btn-ok{
    text-align : right
    margin-right :20px;
    margin-top :25px;
    font-size:32px;
    color:rgba(51,143,255,1);
}

.province-items{
  width:343px;
  background:rgba(255,255,255,1);
  margin-left:49px;
  font-size:28px;
  color:rgba(114,112,114,1);
  overflow scroll;
  height 600px;
}

.school-items{
  width:343px;
  background:rgba(246,245,245,1);
  font-size:28px;
  color:rgba(114,112,114,1);
  overflow scroll;
  height 600px;
}

.items-infos
  height 82px

.items{
    border-collapse:collapse;
    font-size:28px;

    
}

.items-split{
  width:343px;
  height:2px;
  background:rgba(232,232,232,1);
}

.items-selected{
  font-size:28px;
  color:rgba(51,143,255,1);
  margin-bottom 28px;
  margin-top:27px;
}

.items-unselected{
  font-size:28px;
  color:rgba(113,111,113,1);
  margin-bottom 28px;
  margin-top:27px;
}

.modal-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  font-size:24px;
  color:rgba(0,0,0,1);
}

.ok-btn{
  width:246px;
  height:46px;
  background:linear-gradient(90deg,rgba(140,186,255,1),rgba(51,143,255,1));
  border-radius:23px 22px 23px 23px;
}

.ok-btn-text{
  text-align: center;
  font-size:26px;
  color:rgba(255,255,255,1);
  padding-top: 5px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease
}
</style>
