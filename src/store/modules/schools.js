import respUtils from './resp'
import api from '../../api/api'

const state = () =>({
    names:[]
})

const getters = {
    getSchools : state => {return state.names}
}

const actions = {
    getByProvinceName({commit}, provinceName){
        api.getSchoolsByProvince(resp => {
            commit("setNames", resp)
        }, provinceName)
    }
}

const mutations ={
    setNames(state,resp){
        let schoolsResult = respUtils.toCommonResult(resp)
        state.names = schoolsResult.data
    }
}

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}


