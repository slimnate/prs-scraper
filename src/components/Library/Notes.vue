<template>
  <div>
    <!-- Table of existing notes -->
    <q-markup-table class="row">
      <!-- table header -->
      <thead>
        <tr>
          <th class="text-left">Note</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <!-- table body -->
      <tbody>
        <tr v-for="(note, i) in library.notes" :key="i">
          <!-- note -->
          <td class="text-left" v-html="note"></td>
          <!-- action buttons -->
          <td>
            <q-btn
              flat
              round
              color="neutral"
              icon="edit"
              @click="editNote(i)"
            />
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="removeNote(i)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <br />

    <!-- editor title-->
    <div class="row text-weight-medium editor-title">
      {{ action }} Note <q-space />
      <div class="text-caption">Note editor</div>
    </div>

    <!-- note editor -->
    <div class="row justify-center items-center">
      <div class="col-12">
        <q-editor v-model="newNote"> </q-editor>
      </div>
    </div>

    <!-- editor save action -->
    <div class="row justify-end add-btn">
      <q-btn
        class="col-2"
        @click="saveNote"
        :label="action == 'Add' ? 'Add' : 'Save'"
      ></q-btn>
    </div>
  </div>
</template>

<style scoped>
th:nth-of-type(1) {
  width: 80%;
}
td:nth-of-type(1) {
  width: 80%;
}

.add-btn {
  margin-top: 5px;
}

.editor-title {
  margin: 10px;
}
</style>

<script>
export default {
  name: "Notes",

  props: {
    library: Object,
    libraryId: Number
  },

  data() {
    return {
      newNote: "",
      editNoteId: null,
      action: "Add" // Add or Edit
    };
  },

  computed: {},

  methods: {
    /**
     * Depending on the current value of `this.action`:
     * Add new note OR save changes to note being edited.
     */
    saveNote: function() {
      if (this.action == "Add" && this.newNote.length > 0) {
        //add action
        this.$store
          .dispatch("addNote", {
            libraryId: this.libraryId,
            note: this.newNote
          })
          .then(() => {
            console.log("note added");
          });
        this.newNote = "";
      } else if (this.action == "Edit") {
        //save edit action
        this.$store.dispatch("editNote", {
          libraryId: this.libraryId,
          noteId: this.editNodeId,
          note: this.newNote
        });
      }
    },

    /**
     * Modify the editor mode to edit selected note
     */
    editNote: function(noteId) {
      this.editNoteId = noteId;
      this.action = "Edit";
      this.newNote = this.library.notes[noteId];
    },

    /**
     * Remove the selected note from list
     */
    removeNote: function(noteId) {
      this.$store.dispatch("removeNote", { libraryId: this.libraryId, noteId });
    }
  }
};
</script>
