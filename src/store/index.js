import Vue from "vue";
import Vuex from "vuex";

import majors from "./modules/majors";
import provinces from "./modules/provinces";
import schools from "./modules/schools";
import student from "./modules/student";
import notices from "./modules/notices";
import buyRecords from "./modules/buyrecords"

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { majors, provinces, schools, student, notices, buyRecords },
  strict: debug
});
