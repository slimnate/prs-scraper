<template>
  <q-expansion-item
    group="libraries"
    :default-opened="index === 0"
    @click="click()"
    dense
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="contact_mail" />
      </q-item-section>

      <q-item-section>
        <b>{{ library.title }} : </b>
        <span :id="'ruler-' + index"></span>
        <span class="short-description">{{ shortDescription }}</span>
      </q-item-section>

      <q-item-section side>
        <link-panel :links="library.links" />
      </q-item-section>
    </template>
    <q-card>
      <q-card-section>
        {{ library.description }}
      </q-card-section>

      <!--q-card-section v-if="getWebsiteLink(index) !== undefined">
                <iframe :src="getWebsiteLink(index).url" height="400px"></iframe>
            </q-card-section-->
    </q-card>
  </q-expansion-item>
</template>

<style>
.short-description {
  margin: 3px;
  font-weight: lighter;
  text-overflow: ellipsis;
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
    return {};
  },

  computed: {
    shortDescription: function() {
      return this.library.description.substring(0, 150) + ". . .";
    }
  },
  
  methods: {
    click() {
      console.log(this.index);
    }
  }
};
</script>
