
import api from "../../api/api";

const state = () => ({
  cards:[]
});

const getters = {
    getCardInfos: state => {
        return state.cards;
    }
};

const actions = {
  getCardInfos({commit}){
    api.getCardInfos(resp => {
      commit("setCardInfos", resp);
    }, null)
}
};

const mutations = {
    setCardInfos(state, resp) {
        if(resp.data.resultCode == 0){
            let cards=resp.data.data
            state.cards = cards
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
