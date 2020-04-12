<template>
  <div>
    <!-- Table of existing notes -->
    <q-markup-table class="row">
      <thead>
        <tr>
          <th class="text-left">Note</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(note, i) in library.notes" :key="i">
          <td class="text-left" v-html="note"></td>
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

    <!-- note editor -->
    <div class="row text-weight-medium editor-title">
      {{ action }} Note <q-space />
      <div class="text-caption">Ctrl/Cmd + Enter to submit</div>
    </div>

    <div class="row justify-center items-center">
      <div class="col-12" >
        <!-- <q-input v-model="newTag" label="Add new tag"></q-input> -->
        <q-editor
          v-model="newNote"
          hint="Add new note"
          @keypress.ctrl.enter.stop="saveNote"
          @input="logInput"
        >
        </q-editor>
      </div>
    </div>

    <div class="row justify-end add-btn">
      <q-btn
        class="col-2"
        @click="saveNote"
        :label="action == 'Add' ? 'Add' : 'Save'"
      ></q-btn>
    </div>
  </div>
</template>

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
    editNote: function(noteId) {
      this.editNoteId = noteId;
      this.action = "Edit";
      this.newNote = this.library.notes[noteId];
    },
    removeNote: function(noteId) {
      this.$store.dispatch("removeNote", { libraryId: this.libraryId, noteId });
    },
    logInput(e, a, b, c) {
        console.log(e);
        console.log(a);
        console.log(b);
        console.log(c);
    }
  }
};
</script>

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
