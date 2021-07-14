
import api from "../../api/api";

const state = () => ({
    token:'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvTjhKSTB4TVF0WUJoSWs5eG40clZ0X2dCMXRFIiwidHlwZSI6IjQifQ.Oj2cQB3DkSxUwF4NXFaQKaKeY70AT05E5mHghokRGN4eBPlsuuNOa9xudgxDgGI1jXvSLObeZPwpPgxsoLBKag'
});

const getters = {
    getToken: state=>{
        return state.token;
    }
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
};

const mutations = {
    setToken(state, resp){
        if(resp.data.resultCode == 0){
            state.token = resp.data.data
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
