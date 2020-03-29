import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import libraryData from "../../data/libraries.json";
import search from "../lib/search.js";

let vuexLocalStorage = new VuexPersist({
  key: "prs-scraper"
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activePreview: "",
    libraries: []
  },
  mutations: {
    SET_PREVIEW(state, url) {
      state.activePreview = url;
    },
    SET_LIBRARIES(state, libraries) {
      state.libraries = libraries;
      //init search module to keep search index up to date
      search.init(state.libraries);
    },
    UPDATE_LIBRARY(state, { id, library }) {
      state.libraries[id] = library;
      //init search module to keep search index up to date
      search.init(state.libraries);
    }
  },
  actions: {
    init({ commit, state }) {
      console.log("store.init()")
      if (state.libraries.length == 0) {
        console.log("setting library data");
        commit("SET_LIBRARIES", libraryData);
      }
      search.init(state.libraries);
    },
    setPreview({ commit }, url) {
      commit("SET_PREVIEW", url);
    }
  },
  getters: {
    libraries: state => {
      return state.libraries;
    },
    librarySearch: () => searchTerm => {
      return search.search(searchTerm);
    }
  },
  plugins: [vuexLocalStorage.plugin],
  modules: {}
});
