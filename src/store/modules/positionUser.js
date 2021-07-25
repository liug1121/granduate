// import api from "../../api/api";

const state = () => ({
  key: "c13e5b0f-dba6-407f-a269-56c108a7ca4c",
  token:''
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
                commit("setToken", loginInfo.userName);
                resolve(1);
            }else{
                resolve(-1);
            }
          });
    }
};

const mutations = {
    setToken(state, userName) {
        state.token = userName
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
