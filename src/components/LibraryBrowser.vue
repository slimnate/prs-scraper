<template>
  <q-page class="flex flex-center">
    <q-list class="library-browser" bordered>
      <div v-for="(library, index) in libraries" :key="index">
        <library :index="index" :library="library" />
        <q-separator />
      </div>
    </q-list>
  </q-page>
</template>

<style>
.library-browser {
    width: 100%;
}
</style>

<script>
import libraries from "../../data/libraries.json";
import Library from "./Library.vue";

export default {
  name: "LibraryBrowser",

  components: {
    Library
  },

  data() {
    return {
      libraries
    };
  },
  
  methods: {}
};
</script>
