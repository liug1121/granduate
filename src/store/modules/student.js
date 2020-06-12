import respUtils from './resp'
import api from '../../api/api'
import cookies from 'js-cookie'

const state = () =>({
    student:{
        id:-1,
        name:"",
        sex:2 , //0 male， 1 female
        school:"",
        major:"",
        year:"", //yyyy
        score:"",
        rank:"",
        allRank:"",
        professionOne:"",
        professionTwo:"",
        professionTwoScore:"",
        phone:"",
        wechat:"",
        introduction:"",
        eductionInfo:"",
        createTime:"",
        isRandom:false,
        type:1
    },

    students:[],
    randomStudents:[],
    addedSuccess:false,
    addImageResult:{}
})

const getters = {
    getStudents:state =>{
        return state.students
    },
    getRandomStudents: state =>{
        return state.randomStudents
    },
    getAddImageResult: state => {
        return state.addImageResult
    },
    
    addedStatus: state => {return state.addedSuccess},
    
    getStudentFromCookie:() => {
        let students = JSON.parse(cookies.get('students'))
        return students
    },
}

const actions = {
    getStudents({commit}, queryParams){
        api.getStudents(resp =>{
            commit('setStudents', resp)
        }, queryParams)
    },

    getStudentByRandom({commit}){
        api.getStudentByRandom(resp =>{
            commit('setRandomStudents', resp)
        })
    },

    addStudent({commit}, student){
        api.addStudent(() => {
            commit('setAddedSuccess')
        }, () =>{
            commit('setAddedError')
        },student)
    },
    
    addStudentImage({commit}, formData){
        api.addStudentImage(formData,(resp) =>{
            commit('setAddedImageSuccess', resp)
        }, (resp) =>{
            commit('setAddedImageError', resp)
        })
    },

    deleteStudentImage({commit}){
        commit('setNotAddedImage')
    },

    addStudent2Cookie({commit}, student){
        let studentsInCookie = cookies.get('students')
        if(studentsInCookie == undefined)
            studentsInCookie = '[]'
        studentsInCookie = JSON.parse(studentsInCookie)
        let id = student.id
        for(let i = 0; i < studentsInCookie.length; i++){
            if(studentsInCookie[i].id == id){
                return
            }
        }
        if(studentsInCookie.length > 3){
            studentsInCookie.shift()
        }
        studentsInCookie.push(student)
        commit('setStudent2Cookie', studentsInCookie)
        cookies.set('students', studentsInCookie)
    }
}

const mutations = {
    setStudents(state, resp){
        let studentsResult = respUtils.toCommonResult(resp)
        state.students = studentsResult.data
        for(let i = 0; i < state.students.length; i++){
            state.students[i].isRandom = false
        }
    },

    setRandomStudents(state,resp){
        let randomStudents = respUtils.toCommonResult(resp)
        state.randomStudents = randomStudents.data
        for(let i = 0; i < state.randomStudents.length; i++){
            state.randomStudents[i].isRandom = true
        }
    },

    setAddedError(state){
        state.addedSuccess = false
    },

    setAddedSuccess(state){
        state.addedSuccess = true
    },

    setAddedImageSuccess(state, resp){
        state.addImageResult = resp.data
    },

    setAddedImageError(state, resp){
        state.addImageResult = resp
    },
    
    setNotAddedImage(state){
        let resp = {}
        resp.code = -1
        state.addImageResult = resp
    },

    setStudent2Cookie(studentsInCookie){
        console.log('setStudent2Cookie....' + studentsInCookie)
    }
}

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}

