// import api from "../../api/api";

const state = () => ({
  key: "c13e5b0f-dba6-407f-a269-56c108a7ca4c",
  token: null
});

const getters = {
  getKey: state => {
    return state.key;
  },
  getToken: state =>{
      return state.token
  }
};

const actions = {
    login({ commit }, loginInfo) {
        // if(loginInfo.pwd == '111111'){
        //     commit("setToken", loginInfo.userName);
        // }

        return new Promise(resolve => {
            if(loginInfo.pwd == '111111'){
                let date = new Date();  
                let longDate = date.getTime() + 10000
                let token = {}
                token.userName = loginInfo.userName
                token.longDate = longDate
                commit("setToken", token);
                resolve(1);
            }else{
                resolve(-1);
            }
          });
    }
};

const mutations = {
    setToken(state, token) {
        console.log('setToken:' + JSON.stringify(token))
        state.token = token
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
