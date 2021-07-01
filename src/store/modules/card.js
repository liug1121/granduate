
import api from "../../api/api";

const state = () => ({
  cards:[],
  cardDetails:{}
});

const getters = {
    getCardInfos: state => {
        return state.cards;
    },
    getCardDetails: state=>{
        return state.cardDetails;
    }
};

const actions = {
  getCardInfos({commit}){
    api.getCardInfos(resp => {
      commit("setCardInfos", resp);
    }, null)
},
getCardDetails({commit}, queryParams){
    api.getCardDetails(resp => {
        commit("setCardDetails", resp);
      }, null,queryParams)
}
};

const mutations = {
    setCardInfos(state, resp) {
        if(resp.data.resultCode == 0){
            let cards=resp.data.data
            state.cards = cards
        }
    },
    setCardDetails(state, resp){
        if(resp.data.resultCode == 0){
            let cardDetails=resp.data.data
            state.cardDetails = cardDetails
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
