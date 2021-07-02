
import api from "../../api/api";

const state = () => ({
  cards:[],
  cardDetails:{},
  bindStatus:0,
  bindInfo:{}
});

const getters = {
    getCardInfos: state => {
        return state.cards;
    },
    getCardDetails: state=>{
        return state.cardDetails;
    },
    getBindStatus: state=>{
        return state.bindStatus
    },
    getBindInfo: state=>{
        let bindInfo = {}
        if(state.bindInfo.resultCode == -1){
            console.log('*****ss:' + JSON.stringify(state.bindInfo.data))
            let bindNickName = state.bindInfo.data.weixin
            let msg = '该卡已经绑定用户' + bindNickName
            bindInfo.msg=msg
            bindInfo.canBind = false
            return bindInfo
        }else {
            bindInfo.canBind = true
            return bindInfo
        }
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
    },
    unbindCard({commit}, queryParams){
        api.unbindCard(resp=>{
            commit("setCardBindStatus", resp);
        }, null, queryParams)
    },
    queryCardBindInfo({commit}, queryParams){

        return new Promise((resolve) => {
            api.queryCardBindInfo(resp=>{
                resolve(resp); 
                commit("setCardBindInfo", resp);
            }, null, queryParams)
        })
    }
};

const mutations = {
    setCardBindStatus(state, resp){
        if(resp.data.resultCode == 0){
            state.bindStatus = 0
        }
        
    },
    setCardInfos(state, resp) {
        if(resp.data.resultCode == 0){
            let cards=resp.data.data
            state.cards = cards
            if(state.cards.length == 0)
                state.bindStatus = 0
            else
                state.bindStatus = 1
        }
    },
    setCardDetails(state, resp){
        if(resp.data.resultCode == 0){
            let cardDetails=resp.data.data
            state.cardDetails = cardDetails
        }
    },
    setCardBindInfo(state, resp){
        console.log('setCardBindInfo:' + JSON.stringify(resp))
        state.bindInfo = resp.data
        // console.log(callback)s
        
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
