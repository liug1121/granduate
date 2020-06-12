import respUtils from './resp'
import api from '../../api/api'

const state = () => ({
    names:{}
})

const  getters = {
    getNames: state => {return state.names}
}

const actions = {
    getAll({commit}){
        api.getProvinces(resp =>{
            commit('setNames', resp)
        })
    }
}

const mutations = {
    setNames(state, resp){
        let provincesResult = respUtils.toCommonResult(resp)
        state.names = provincesResult.data
    }
}

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
