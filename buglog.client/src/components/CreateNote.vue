<template>
  <div class="modal fade" id="createNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content">
        <form @submit.prevent="createNote">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Notes
            </h5>
            <button type="button" class="btn-close btn btn-outline-danger" data-dismiss="modal" aria-label="Close" title="close">
              <i class="mdi mdi-close"></i>
            </button>
          </div>

          <div class="modal-body modal-body-scrollable">
            <textarea
              class="form-control"
              v-model="state.newNote.body"
              id="note"
              rows="3"
              placeholder="Note..."
              required
              minlength="4"
            >
          </textarea>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#createNote">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from '@vue/reactivity'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
export default {
  name: 'CreateNote',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const route = useRoute()
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      async createNote() {
        try {
          state.newNote.bugId = route.params.id
          const newNote = await notesService.createNote(state.newNote)
          state.newNote = {}
          Pop.toast('Note Created', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
