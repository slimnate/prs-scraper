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
 * Returns true if the `library` is tagged with one or more terms in `filterTags`
 * - Used by tag filtering logic
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

/**
 * Returns true if the `library` object contains specified `tag`
 * @param {object} library Library object
 * @param {string} tag Tag to check for
 */
function hasTag(library, tag) {
  return library.tags.indexOf(tag) !== -1;
}

//TODO: use in methods
/*function makeCopy(obj) {
  return Object.assign({}, obj);
}*/

export default new Vuex.Store({
  //STATE
  state: {
    activePreview: "",
    libraries: []
  },

  //MUTATIONS
  mutations: {
    /** Sets active preview pane url */
    SET_PREVIEW(state, url) {
      state.activePreview = url;
    },
    /** Sets the libraries array directly */
    SET_LIBRARIES(state, libraries) {
      state.libraries = libraries;
      //init search module to keep search index up to date
      search.init(state.libraries);
    },
    /** Updates a library based on it's id (index) */
    UPDATE_LIBRARY(state, { id, library }) {
      var mapped = state.libraries.map((curr, index) => {
        return index == id ? library : curr;
      });
      state.libraries = mapped;

      //init search module to keep search index up to date
      search.init(state.libraries);
    }
  },

  //ACTIONS
  actions: {
    /**
     * Initializes the library collection upon FIRST application run (data
     * is read from the persistent storage upon subsequent startups), also
     * initializes the search index.
     */
    init({ commit, state }) {
      console.log("store.init()");
      if (state.libraries.length == 0) {
        console.log("setting library data");
        commit("SET_LIBRARIES", libraryData);
      }
      search.init(state.libraries);
    },

    /**
     * Sets the active preview pane url
     * @param {*} url url to preview
     */
    setPreview({ commit }, url) {
      commit("SET_PREVIEW", url);
    },

    /**
     * Add a tag to a library entry
     * @param {number} data.libraryId Library id (index)
     * @param {string} data.tag Tag to add
     */
    addTag({ commit, state }, { libraryId, tag }) {
      //grab copy of library obj to work on
      var lib = Object.assign({}, state.libraries[libraryId]);

      if (!hasTag(lib, tag)) {
        lib.tags.push(tag);

        commit("UPDATE_LIBRARY", { id: libraryId, library: lib });
      }
    },

    /**
     * Remove specified tag from specified library entry
     * @param {number} data.libraryId Library id (index)
     * @param {number} data.tagIndex index of tag to remove
     */
    removeTag({ commit, state }, { libraryId, tagIndex }) {
      //grab copy of library obj to work on
      var lib = Object.assign({}, state.libraries[libraryId]);

      lib.tags = lib.tags.filter((t, i) => i !== tagIndex);

      commit("UPDATE_LIBRARY", { id: libraryId, library: lib });
    },

    /**
     * Toggles the `favorite` property on the library
     * @param {number} libraryId index of library
     */
    toggleFavorite({ commit, state }, libraryId) {
      //grab copy of library obj to work on
      var lib = Object.assign({}, state.libraries[libraryId]);

      lib.favorite = !lib.favorite;

      commit("UPDATE_LIBRARY", { id: libraryId, library: lib });
    },

    /**
     * Adds a new `note` to a library
     * @param {number} data.libraryId Library id (index)
     * @param {string} data.note New note contents
     */
    addNote({ commit, state }, { libraryId, note }) {
      //grab copy of library obj to work on
      var lib = Object.assign({}, state.libraries[libraryId]);

      lib.notes.push(note);

      commit("UPDATE_LIBRARY", { id: libraryId, library: lib });
    },

    /**
     * Replaces the note at specified `noteId` with new `note`
     * @param {number} data.libraryId Library id (index)
     * @param {number} data.noteId Note id (index)
     * @param {string} data.note Updated note contents
     */
    editNote({ commit, state }, { libraryId, noteId, note }) {
      //grab copy of library obj to work on
      var lib = Object.assign({}, state.libraries[libraryId]);

      lib.notes[noteId] = note;

      commit("UPDATE_LIBRARY", { id: libraryId, library: lib });
    },

    /**
     * Removes the note with specified `noteId`
     * @param {number} data.libraryId Library id (index)
     * @param {number} data.noteId Note id (index)
     */
    removeNote({ commit, state }, { libraryId, noteId }) {
      //grab copy of library obj to work on
      var lib = Object.assign({}, state.libraries[libraryId]);

      lib.notes = lib.notes.filter((n, i) => i !== noteId);

      commit("UPDATE_LIBRARY", { id: libraryId, library: lib });
    }
  },

  //GETTERS
  getters: {
    /** Returns all libraries */
    libraries: state => {
      return state.libraries;
    },

    /**
     * Returns list of libraries that match specified filter params
     *
     * @param {string} filter.searchText search string
     * @param {boolean} filter.favorites filter by favorites if true
     * @param {array} filter.filterTags list of tags to filter by (must match one or more tags)
     */
    libraryFilter: state => filter => {
      var { searchText, favorites, filterTags } = filter;

      //get initial search results
      var results = searchText ? search.search(searchText) : state.libraries;

      if (favorites) {
        results = results.filter(library => library.favorite);
      }

      if (filterTags && filterTags.length > 0) {
        results = results.filter(library =>
          hasRelevantTag(library, filterTags)
        );
      }

      return results;
    },

    /**
     * Returns an aggregate list of all tags found on one or more libraries
     * for use in the tag filter selector.
     */
    tagList: state => {
      var tagList = state.libraries.reduce((res, item) => {
        item.tags.forEach(tag => {
          //for each tag in item
          if (res.indexOf(tag) == -1) {
            //if tag is not in result, add
            res.push(tag);
          }
        });

        return res;
      }, []);

      return tagList;
    }
  },

  plugins: [vuexLocalStorage.plugin],

  modules: {}
});
