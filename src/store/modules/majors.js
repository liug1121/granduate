import respUtils from './resp'
import api from '../../api/api'

const state = () =>({
    names:[]
})

const getters = {
    getNames: state => {return state.names}
}

const actions = {
    getAll({commit}){
        api.getMajors(resp=>{
            commit('setMajors', resp)
        })
    },

    getByMajorName({commit}, majorName){
        api.getMajorsByName(resp=>{
            commit('setMajors', resp)
        }, majorName)
    }
}

const mutations = {
    setMajors(state, resp){
        let majorsResult = respUtils.toCommonResult(resp)
        state.names = majorsResult.data 
    }
}

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}