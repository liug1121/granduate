<template>
  <div>
      <div v-if="isFromCookie == 'false'">
        <div v-for="student in studentForDisplay" :key="student.id" class="list-item">
            <table class="body" @click="router2Detail(student.id, studentForDisplay)">
                <tr>
                <td>
                    <table>
                    <tr>
                        <td><img class="img-tc" src="../../assets/tc51.png" /></td>
                        <td><Student :name ='student.name' :number='student.id' :indate='student.year' :school='student.school' 
                                    :major='student.major' :grade='student.year' :gradeinfo='type2Name(student.type)' /></td>
                    </tr>
                    </table>
                </td>
                </tr>
                <tr>
                <td>
                    <Ranking :rank = 'student.rank' :allrank = 'student.allRank'/>
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
        <div v-for="student in myLookedStudents" :key="student.id" class="list-item">
            <table class="body" @click="router2Detail(student.id, myLookedStudents)">
                <tr>
                <td>
                    <table>
                    <tr>
                        <td><img class="img-tc" src="../../assets/tc51.png" /></td>
                        <td><Student :name ='student.name' :number='student.id' :indate='student.year' :school='student.school' 
                                    :major='student.major' :grade='student.year' :gradeinfo='type2Name(student.type)' /></td>
                    </tr>
                    </table>
                </td>
                </tr>
                <tr>
                <td>
                    <Ranking :rank = 'student.rank' :allrank = 'student.allRank'/>
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
import { mapGetters} from 'vuex' 
export default {
  name: "ListItem",
  props:['isFromCookie'],
  components: {
    Student,
    Ranking,
  },

  methods:{
    router2Detail(studentNum, stus){
        let students = stus
        let student = undefined
        for(let i = 0; i < students.length; i++){
            let stuNum = students[i].id
            if(stuNum == studentNum){
                student =students[i]
                break
            }
        }
        if(student == undefined)
            return
        if(student.isRandom){
            this.$emit('onSelectedRandom', true)
            return
        }
            
        this.$store.dispatch('student/addStudent2Cookie', student)
        this.$router.push({name: 'Senior', params: student});
    },

    type2Name(type){
        return type == 0 ? '学硕' : '专硕'
    },

    date2Year(date){
        return date.substring(0, 10)
    }
  },

    computed:{
    ...mapGetters('student',{
        students : 'getStudents',
        randomStudents:'getRandomStudents',
        myLookedStudents : 'getStudentFromCookie'
      }) ,
      studentForDisplay(){
          if(this.students.length == 0){
              if(this.randomStudents.length == 0)
                this.$store.dispatch('student/getStudentByRandom')
              return this.randomStudents
          }else{
              return this.students
          }
      }
  },
 
  beforeCreate(){
    this.$store.dispatch('student/getStudents', { page_no:1, page_size:1})
  },

  data(){
      return{
          isModalVisible: false,
      }
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
