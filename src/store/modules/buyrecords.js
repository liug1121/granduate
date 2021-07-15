import api from "../../api/api";

const state = () => ({
  buyRecords:[],
  buyResp:{}
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
  },
  buy({commit}, buyParams){
    return new Promise((resolve) => {
      let params = {}
      params = buyParams
      console.log('params::' + JSON.stringify(params))
      api.buyProduct(resp=>{
          commit("setBuyProduct", resp);
          resolve(resp);
        },null, params)
      })
  }
};
const mutations = {
    setBuyRecords(state, resp) {
        if(resp.data.resultCode == 0){
            let buyRecords=resp.data.data
            state.buyRecords = buyRecords
        }
    },
    setBuyProduct(state, resp){
      console.log('setBuyProduct')
      if(resp.data.resultCode == 0){
        console.log('setBuyProduct success')
      }else{
        console.log('setBuyProduct faild')
      }
      state.buyResp = resp.data
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
