<template>
  <q-scroll-area class="library-browser-scroll">
    <q-list class="library-browser" bordered>
      <div v-for="(library, index) in libraries" :key="index">
        <library :index="index" :library="library" />
        <q-separator />
      </div>
    </q-list>
  </q-scroll-area>
</template>

<style>
.q-splitter {
  min-height: inherit;
  min-width: inherit;
}
.q-splitter__panel {
  min-height: inherit;
  min-width: inhert;
}
.scroll.fit {
  min-width: inherit;
  min-height: inherit;
}
.library-browser-scroll {
  min-width: inherit;
  min-height: inherit;
}
.library-browser {
  height: 100%;
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
      libraries: libraries
    };
  },

  methods: {}
};
</script>
