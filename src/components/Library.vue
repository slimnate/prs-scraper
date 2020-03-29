<template>
  <q-expansion-item
    group="libraries"
    :default-opened="index === 0"
    @click="click"
    dense
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="contact_mail" />
      </q-item-section>

      <q-item-section>
        <b>{{ library.title }} : </b>
        <span :id="'ruler-' + index" class="display: none;"></span>
        <span :id="'shrtdsc-' + index" class="short-description">{{
          shortDescription
        }}</span>
      </q-item-section>

      <q-item-section side>
        <link-panel :links="library.links" />
      </q-item-section>
    </template>
    <q-card>
      <q-card-section v-html="library.description" class="description"></q-card-section>
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
import LinkPanel from "./LinkPanel.vue";

export default {
  name: "Library",

  components: {
    LinkPanel
  },

  props: {
    index: Number,
    library: Object
  },

  data() {
    return {
      shortDescription: ""
    };
  },

  computed: {},

  methods: {
    click() {
      console.log(this.index);
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
