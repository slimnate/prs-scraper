<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar v-ripple>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="album" size="lg" />
          </q-avatar>
          Music Content Libraries
        </q-toolbar-title>

        <q-select
          label="Tags"
          style="min-width: 200px;"
          label-color="white"
          multiple
          clearable
          v-model="filterTags"
          :options="tagOptions"
        />

        <q-input
          dark
          dense
          standout
          label="Search"
          v-model="searchText"
          debounce="600"
          input-class="text-right"
          class="q-ml-md search"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="searchText = ''"
            />
          </template>
        </q-input>

        <q-btn flat round icon="clear" @click="clearPreview">
          <q-tooltip>Clear Preview</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center">
        <q-splitter v-model="splitterModel" @input="onSplitterResize">
          <template v-slot:before>
            <library-browser :filter="searchText" :libraries="libraries" />
          </template>

          <template v-slot:after>
            <site-preview :url="activePreview"> </site-preview>
          </template>
        </q-splitter>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar v-ripple>
        <div>
          <q-toolbar-title>
            prs-scraper
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import LibraryBrowser from "./components/LibraryBrowser.vue";
import SitePreview from "./components/SitePreview.vue";

export default {
  name: "LayoutDefault",

  data() {
    return {
      searchText: "",
      filterFavorites: false,
      filterTags: [],
      splitterModel: 70
    };
  },

  components: {
    LibraryBrowser,
    SitePreview
  },

  computed: {
    activePreview: function() {
      console.log("activePreview = ", this.$store.state.activePreview);
      return this.$store.state.activePreview;
    },
    libraries: function() {
      let filter = {
        searchText: this.searchText,
        favorites: this.filterFavorites,
        filterTags: this.filterTags
      };

      return this.$store.getters.libraryFilter(filter);
    },
    tagOptions: function() {
      return ["tag1", "tag2"]; //todo read tags from libraries
    }
  },

  methods: {
    clearPreview() {
      //clear preview url
      this.$store.dispatch("setPreview", "");
    },
    onSplitterResize() {
      //listened for by Library component to resize its shortened description
      this.$root.$emit("splitterResize");
    }
  },

  created() {
    console.log("initing store");
    this.$store.dispatch("init");
  }
};
</script>

<style>
.q-splitter {
  width: 100%;
  height: 100%;
}

.search {
  width: 30%;
}
</style>
