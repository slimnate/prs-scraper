<template>
  <q-expansion-item
    group="libraries"
    :default-opened="index === 0"
    dense
  >
    <!-- expansion header -->
    <template v-slot:header>
      <!-- favorites star -->
      <q-item-section avatar>
        <q-avatar
          v-if="library.favorite"
          size="xl"
          icon="star"
          class="text-yellow"
          color="grey-2"
          @click.stop="toggleFavorite"
        />
        <q-avatar
          v-else
          size="xl"
          icon="star_outline"
          color="grey-2"
          @click.stop="toggleFavorite"
        />
      </q-item-section>

      <q-item-section>
        <div class="text-weight-bolder">
          {{ library.title }} :
          <q-badge v-for="tag in library.tags" :key="tag" align="middle" style="margin:2px;">
            {{ tag }} </q-badge
          >
        </div>
        <span :id="'ruler-' + index" class="display: none;"></span>
        <span :id="'shrtdsc-' + index" class="short-description">{{
          shortDescription
        }}</span>
      </q-item-section>

      <q-item-section side>
        <link-panel :links="library.links" />
      </q-item-section>
    </template>

    <!-- expansion body -->
    <q-card>
      <q-tabs v-model="tab" dense>
        <q-tab name="description" label="Description"></q-tab>
        <q-tab name="notes" label="Notes"></q-tab>
        <q-tab name="tags" label="Tags"></q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- description tab -->
        <q-tab-panel name="description">
          <div class="text-h6">Description</div>

          <div
            class="text-body2 description"
            v-html="library.description"
          ></div>
        </q-tab-panel>

        <!-- notes tab-->
        <q-tab-panel name="notes">
          <div class="text-h6">Notes</div>

          <library-notes :library="library"></library-notes>
        </q-tab-panel>

        <!-- tags tab -->
        <q-tab-panel name="tags">
          <div class="text-h6">Tags</div>

          <library-tags :library="library" :libraryId="index"></library-tags>
        </q-tab-panel>
      </q-tab-panels>

      <!-- create tag editing components. -->
    </q-card>
  </q-expansion-item>
</template>

<style>
.short-description {
  margin: 3px;
  font-weight: lighter;
  text-overflow: ellipsis;
}

.description {
  margin-left: 40px;
}
</style>

<script>
import LinkPanel from "./Library/LinkPanel.vue";
import LibraryNotes from "./Library/Notes.vue";
import LibraryTags from "./Library/Tags.vue";

export default {
  name: "Library",

  components: {
    LinkPanel,
    LibraryNotes,
    LibraryTags
  },

  props: {
    index: Number,
    library: Object
  },

  data() {
    return {
      shortDescription: "",
      tab: "description"
    };
  },

  computed: {},

  methods: {
    toggleFavorite() {
        this.$store.dispatch("toggleFavorite", this.index);
    },
    onResize() {
      this.fitShortDescription();
    },
    fitShortDescription() {
      let width = document.getElementById("shrtdsc-" + this.index).offsetWidth;
      let text = this.library.descriptionPreview;
      let linkCount = this.library.links.length;

      let extraSpace = 200 - 25 * linkCount;
      let divisor = width >= 300 ? 9 : 12;

      let strLen = Math.floor((width + extraSpace) / divisor);

      this.shortDescription = text.substring(0, strLen) + "...";
    }
  },

  mounted() {
    //Listen for screen resizes and update short description
    window.addEventListener("resize", this.onResize);
    this.$root.$on("splitterResize", this.onResize);
    //perform initial resize
    this.fitShortDescription();
  },

  beforeDestroy() {
    //Clean up event handlers
    window.removeEventListener("resize", this.onResize);
    this.$root.$off("splitterResize", this.onResize);
  }
};
</script>
