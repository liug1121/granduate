import respUtils from "./resp";
import api from "../../api/api";
import cookies from "js-cookie";

const state = () => ({
  student: {
    id: -1,
    name: "",
    sex: 2, //0 male， 1 female
    school: "",
    major: "",
    year: "", //yyyy
    score: "",
    rank: "",
    allRank: "",
    professionOne: "",
    professionTwo: "",
    professionTwoScore: "",
    phone: "",
    wechat: "",
    introduction: "",
    eductionInfo: "",
    createTime: "",
    isRandom: false,
    type: 1
  },

  students: [],
  randomStudents: [],
  addedSuccess: false,
  addImageResult: {},
  studentsInCookie:[]
});

const getters = {
  getStudents: state => {
    return state.students;
  },
  getRandomStudents: state => {
    return state.randomStudents;
  },
  getAddImageResult: state => {
    return state.addImageResult;
  },

  addedStatus: state => {
    return state.addedSuccess;
  },

  getStudentFromCookie: state => {
    return state.studentsInCookie;
  }
};

const actions = {
  getStudents({ commit }, queryParams) {
    api.getStudents(resp => {
      commit("setStudents", resp);
    }, queryParams);
  },

  getStudentForCookie({commit}){
    let studentIds = JSON.parse(cookies.get("students"));
    commit("clearStudentInCookie")
    for(let i = 0; i < studentIds.length; i++){
        let param = {id: studentIds[i]}
        api.getStudent(resp => {
            commit("addStudentInCookie", resp);
          }, param);
    }
  },

  getStudentByRandom({ commit }, params) {
    let index = Math.floor(Math.random() * 6);
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDate() - index;
    let createDate = year + "-" + month + "-" + day;
    let student = {
      id: "-1",
      name: "XXX学长",
      sex: 2, //0 male， 1 female
      school: params.school,
      major: params.major,
      year: "****", //yyyy
      score: "保密",
      rank: "",
      allRank: "",
      professionOne: "保密",
      professionTwo: "保密",
      professionTwoScore: "保密",
      phone: "保密",
      wechat: "保密",
      introduction: "保密",
      eductionInfo: "保密",
      createTime: createDate,
      isRandom: true,
      type: -1
    };
    let students = [];
    students.push(student);
    index = Math.floor(Math.random() * 6);
    day = nowDate.getDate() - index;
    createDate = year + "-" + month + "-" + day;
    student = {
      id: "-2",
      name: "XXX学长",
      sex: 2, //0 male， 1 female
      school: params.school,
      major: params.major,
      year: "****", //yyyy
      score: "保密",
      rank: "",
      allRank: "",
      professionOne: "保密",
      professionTwo: "保密",
      professionTwoScore: "保密",
      phone: "保密",
      wechat: "保密",
      introduction: "保密",
      eductionInfo: "保密",
      createTime: createDate,
      isRandom: true,
      type: -1
    };
    students.push(student);
    let resp = {};
    resp.data = {};
    resp.data.data = students;
    commit("setRandomStudents", resp);

    // api.getStudentByRandom(resp =>{
    //     commit('setRandomStudents', resp)
    // })
  },

  addStudent({ commit }, student) {
    api.addStudent(
      () => {
        commit("setAddedSuccess");
      },
      () => {
        commit("setAddedError");
      },
      student
    );
  },

  addStudentImage({ commit }, formData) {
    api.addStudentImage(
      formData,
      resp => {
        commit("setAddedImageSuccess", resp);
      },
      resp => {
        commit("setAddedImageError", resp);
      }
    );
  },

  deleteStudentImage({ commit }) {
    commit("setNotAddedImage");
  },

  addStudent2Cookie({ commit }, student) {

    let studentsInCookie = cookies.get("students");
    if (studentsInCookie == undefined) studentsInCookie = "[]";
    studentsInCookie = JSON.parse(studentsInCookie);
    let id = student.id;
    for (let i = 0; i < studentsInCookie.length; i++) {
      if (studentsInCookie[i] == id) {
        return;
      }
    }
    studentsInCookie.push(student.id);
    commit("setStudent2Cookie", studentsInCookie);
    cookies.set("students", studentsInCookie);




    // let studentsInCookie = cookies.get("students");
    // if (studentsInCookie == undefined) studentsInCookie = "[]";
    // studentsInCookie = JSON.parse(studentsInCookie);
    // let id = student.id;
    // for (let i = 0; i < studentsInCookie.length; i++) {
    //   if (studentsInCookie[i].id == id) {
    //     return;
    //   }
    // }
    // if (studentsInCookie.length > 3) {
    //   studentsInCookie.shift();
    // }
    // studentsInCookie.push(student);
    // commit("setStudent2Cookie", studentsInCookie);
    // cookies.set("students", studentsInCookie);
  }
};

const mutations = {
  setStudents(state, resp) {
    let studentsResult = respUtils.toCommonResult(resp);
    state.students = studentsResult.data;
    for (let i = 0; i < state.students.length; i++) {
      state.students[i].isRandom = false;
    }
  },

  setRandomStudents(state, resp) {
    let randomStudents = respUtils.toCommonResult(resp);
    state.randomStudents = randomStudents.data;
    for (let i = 0; i < state.randomStudents.length; i++) {
      state.randomStudents[i].isRandom = true;
    }
  },

  setAddedError(state) {
    state.addedSuccess = false;
  },

  setAddedSuccess(state) {
    state.addedSuccess = true;
  },

  setAddedImageSuccess(state, resp) {
    state.addImageResult = resp.data;
  },

  setAddedImageError(state, resp) {
    state.addImageResult = resp;
  },

  setNotAddedImage(state) {
    let resp = {};
    resp.code = -1;
    state.addImageResult = resp;
  },

  setStudent2Cookie(studentsInCookie) {
    console.log("setStudent2Cookie...." + studentsInCookie);
  },
  addStudentInCookie(state, resp){
      let student = respUtils.toCommonResult(resp);
      state.studentsInCookie.push(student.data)
  },
  clearStudentInCookie(){
    this.studentsInCookie = []
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
