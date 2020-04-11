<template>
  <div class="row items-center">
    <!-- TODO: implement editable notes panel -->
    <p v-for="(note, i) in library.notes" :key="i">
      {{ note }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Notes",

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
