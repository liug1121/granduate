import respUtils from './resp'
import api from '../../api/api'

const state = () =>({
    notices:{}
})

const getters = {
    getNotices: state => {
        return state.notices
    }
}

const actions = {
    getNotices({commit}){
        api.getNotices(resp =>{
            commit('setNotices', resp)
        })
    }
}

const mutations = {
    setNotices(state, resp){
        let noticesResult = respUtils.toCommonResult(resp)
        state.notices = noticesResult.data
    }
}

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}