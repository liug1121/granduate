
import api from "../../api/api";

const state = () => ({
  buyRecords:[]
});

const getters = {
    getBuyRecords: state => {
        return state.buyRecords;
    }
};

const actions = {
  getBuyRecords({commit}, queryParams){
      api.getBuyRecords(resp => {
        commit("setBuyRecords", resp);
      }, null, queryParams)
  }
};

const mutations = {
    setBuyRecords(state, resp) {
        if(resp.data.resultCode == 0){
            let buyRecords=resp.data.data
            state.buyRecords = buyRecords
        }
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
