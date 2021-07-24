import api from "../../api/api";

const state = () => ({
  addPackagesForCard: [],
  packagesForCard: []
});

const getters = {
  getAddPackagesForCard: state => {
    console.log("******" + JSON.stringify(state.addPackagesForCard));
    return state.addPackagesForCard;
  },
  getPackagesForCard: state => {
    return state.packagesForCard;
  }
};

const actions = {
  callAddPackagesForCard({ commit }, queryParams) {
    api.getAddPackagesForCard(
      resp => {
        commit("setAddPackagesForCard", resp);
      },
      null,
      queryParams
    );
  },
  callPackagesForCard({ commit }, queryParams) {
    api.getPackagesForCard(
      resp => {
        commit("setPackagesForCard", resp);
      },
      null,
      queryParams
    );
  }
};

const mutations = {
  setAddPackagesForCard(state, resp) {
    if (resp.data.resultCode == 0) {
      let addPackagesForCard = resp.data.data;
      state.addPackagesForCard = addPackagesForCard;
    }
  },
  setPackagesForCard(state, resp) {
    if (resp.data.resultCode == 0) {
      let packagesForCard = resp.data.data;
      state.packagesForCard = packagesForCard;
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
