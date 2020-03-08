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
      </q-toolbar>
    </q-header>

    <q-page-container>
      <library-browser />
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

export default {
  name: "LayoutDefault",

  components: {
    LibraryBrowser
  },

  data() {
    return {};
  }
};
</script>

<style></style>
