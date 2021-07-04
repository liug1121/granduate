
import api from "../../api/api";

const state = () => ({
    token:''
});

const getters = {
    getToken: state=>{
        return state.token;
    }
    // getCardInfos: state => {
    //     return state.cards;
    // },
    // getCardDetails: state=>{
    //     return state.cardDetails;
    // },
    // getBindStatus: state=>{
    //     return state.bindStatus
    // }
};

const actions = {
    login({commit}, wechatCode){
        let queryParams = {}
        queryParams.code = wechatCode
        return new Promise((resolve) => {
            api.login(resp => {
                commit("setToken", resp);
                resolve(resp); 
                }, null,queryParams)
        })
        
    }
//   getCardInfos({commit}){
//     api.getCardInfos(resp => {
//       commit("setCardInfos", resp);
//     }, null)
//     },
//     getCardDetails({commit}, queryParams){
//         api.getCardDetails(resp => {
//             commit("setCardDetails", resp);
//         }, null,queryParams)
//     },
//     unbindCard({commit}, queryParams){
//         api.unbindCard(resp=>{
//             commit("setCardBindStatus", resp);
//         }, null, queryParams)
//     },
//     bindCard({commit}, queryParams){
//         return new Promise((resolve) => {
//             api.bindCard(resp=>{
//                 resolve(resp); 
//                 commit("setBindResult", resp);
//             }, null, queryParams)
//         })
//     },
//     queryCardBindInfo({commit}, queryParams){
//         return new Promise((resolve) => {
//             api.queryCardBindInfo(resp=>{
//                 resolve(resp); 
//                 commit("setCardBindInfo", resp);
//             }, null, queryParams)
//         })
//     }
};

const mutations = {
    setToken(state, resp){
        if(resp.data.resultCode == 0){
            state.token = resp.data.data
        } 
    }
    // setCardBindStatus(state, resp){
    //     if(resp.data.resultCode == 0){
    //         state.bindStatus = 0
    //     }
        
    // },
    // setCardInfos(state, resp) {
    //     if(resp.data.resultCode == 0){
    //         let cards=resp.data.data
    //         state.cards = cards
    //         if(state.cards.length == 0)
    //             state.bindStatus = 0
    //         else
    //             state.bindStatus = 1
    //     }
    // },
    // setCardDetails(state, resp){
    //     if(resp.data.resultCode == 0){
    //         let cardDetails=resp.data.data
    //         state.cardDetails = cardDetails
    //     }
    // },
    // setCardBindInfo(state, resp){
    //     state.bindInfo = resp.data
    // },
    // setBindResult(state, resp){
    //     state.bindResult = resp.data
    // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
