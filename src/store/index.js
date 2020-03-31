import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import libraryData from "../../data/libraries.json";
import search from "../lib/search.js";

let vuexLocalStorage = new VuexPersist({
  key: "prs-scraper"
});

Vue.use(Vuex);

/**
 * Returns true if the library is tagged with one or more terms in `filterTags`
 * @param {object} library Library object to check for tags
 * @param {array<string>} filterTags List of tags to search for
 */
function hasRelevantTag(library, filterTags) {
  let res = false;

  //search each tag on library
  library.tags.forEach(libraryTag => {
    if (filterTags.indexOf(libraryTag) !== -1) {
      //add library if any tags on library are in filterTags
      res = true;
    }
  });

  return res;
}

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
      console.log("store.init()");
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
    libraryFilter: (state) => filter => {
      var { searchText, favorites, filterTags } = filter;

      console.log(filter);

      //get initial search results
      var results = searchText ? search.search(searchText) : state.libraries;

      console.log("post-search: ", results);

      if (favorites) {
        results = results.filter(library => library.favorites);
      }

      if (filterTags && filterTags.length > 0) {
        results = results.filter(library => hasRelevantTag(library, filterTags));
      }

      return results;
    },
    tagList: (state) => {
      var tagList = state.libraries.reduce((res, item) => {
        console.log(item.tags);
        item.tags.forEach((tag) => { //for each tag in item
          console.log("tag=", tag);
          if(res.indexOf(tag) == -1) { //if tag is not in result
            res.push(tag);
          }
        });

        return res;
      }, []);
      console.log("tagList: ", tagList);

      return tagList;
    }
  },
  plugins: [vuexLocalStorage.plugin],
  modules: {}
});
