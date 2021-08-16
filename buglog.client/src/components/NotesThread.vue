<template>
  <div class="col-md-12 p-2 m-0">
    <div class="row m-0">
      <div class="col-md-1.5 ml-auto">
        <button type="button" class="btn btn-info rounded" data-toggle="modal" data-target="#createNote">
          Create Note
        </button>
        <CreateNote :bug="bug" />
      </div>
    </div>
  </div>
  <div class="col-md-12">
    <div class="row p-2" v-for="note in notes" :key="note.id">
      <!-- <NoteCard :note="note" /> -->
      <div class=" p-3 border col-md-12 my-2 bg-blue lighten-30">
        <div class="row ">
          <div class="col-md-10 bg-white darken-10 py-2">
            <img :src="note.creator.picture" height="25">
            {{ note.creator.name }}
            <br>
            {{ note.body }}
            <br>
            <br>
            {{ new Date(note.createdAt).toLocaleString() }}
          </div>
          <div class="col-md-2 text-right bg-white darken-10">
            <button class="btn btn-outline-primary" title="delete" @click="destroyNote(note.id)">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Swal from 'sweetalert2'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'

export default {
  name: 'NotesThread',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(async() => {
      try {
        logger.log('onMounted')
        logger.log(props.bug.id)
        await notesService.getAllNotesByBugId(props.bug.id)
        logger.log(AppState.notes)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      notes: computed(() => {
        logger.log(AppState.notes)
        return AppState.notes
      }),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),

      async destroyNote(id) {
        try {
          await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              await notesService.destroyNote(id)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
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
