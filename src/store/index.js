import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activePreview: ""
  },
  mutations: {
    SET_PREVIEW(state, url) {
      state.activePreview = url;
    }
  },
  actions: {
    setPreview({ commit }, url) {
      commit("SET_PREVIEW", url);
    }
  },
  modules: {}
});
