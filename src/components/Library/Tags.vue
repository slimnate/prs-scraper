<template>
  <div>
    <!-- Table of existing tags -->
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-center">Tag</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tag, i) in library.tags" :key="i">
          <td class="text-center">
            {{ tag }}
          </td>
          <td>
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="removeTag(i)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- Add tag section -->
    <div class="row justify-end items-center">
      <div class="col-8">
        <!-- tag editor dropdown -->
        <q-select
          v-model="newTag"
          use-input
          @new-value="newTagValue"
          @input="addTag"
          :options="tagList"
          input-debounce="100"
          hint="Tag this library"
        >
          <template v-slot:append>
            <!-- clear input button -->
            <q-icon
              v-if="newTag !== null"
              class="cursor-pointer"
              name="clear"
              @click.stop="newTag = null"
            />
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  name: "Tags",

  props: {
    library: Object,
    libraryId: Number
  },

  data() {
    return {
      newTag: null
    };
  },

  computed: {
    tagList: function() {
      return this.$store.getters.tagList;
    }
  },

  methods: {
    /**
     * Remove selected tag
     */
    removeTag: function(tagIndex) {
      this.$store.dispatch("removeTag", {
        libraryId: this.libraryId,
        tagIndex
      });
    },

    /**
     * Add a tag to the library
     */
    addTag: function(tag) {
      tag = tag || this.newTag; //use tag if provided, otherwise use q-select value

      if (tag.length !== 0) {
        this.newTag = null;

        this.$store.dispatch("addTag", {
          libraryId: this.libraryId,
          tag: tag
        });
      }
    },

    /**
     * Called by q-select component when the user inputs a new tag,
     * proxies work to `addTag` method with the user input
     */
    newTagValue: function(val, done) {
      this.addTag(val);
      done();
    }
  }
};
</script>
