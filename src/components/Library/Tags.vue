<template>
  <div class="row items-center">
    <!-- TODO: implement editable tags panel -->
    <p v-for="(tag, i) in library.tags" :key="i">
      {{ tag }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Tags",

  props: {
    library: Object
  },

  data() {
    return {};
  },

  computed: {},

  methods: {}
};
</script>

<style></style>
