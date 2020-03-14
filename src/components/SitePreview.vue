<template>
  <div class="site-preview">
    <div v-if="url === ''" class="preview-placeholder">
      Preview Pane
    </div>
    <iframe v-if="url !== ''" class="preview-frame" :src="url"></iframe>
  </div>
</template>

<style>
.site-preview {
  min-width: inherit;
  min-height: inherit;
}

.preview-frame {
  width: 100%;
  min-height: inherit;
}

.preview-placeholder {
  font-size: 32px;
  font-weight: 200;
  text-align: center;
  margin-top: 50px;
}
</style>

<script>
export default {
  name: "SitePreview",

  components: {},

  props: {
    url: String
  },

  data() {
    return {};
  },

  methods: {}
};
</script>
