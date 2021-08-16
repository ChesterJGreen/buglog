<template>
  <div class="col-md-12 p-2">
    <div class="row m-0">
      <div class="col-md-1.5 ml-auto">
        <button type="button" class="btn btn-info rounded">
          Create Note
        </button>
        <CreateNote :bug="bug" />
      </div>
    </div>
  </div>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <div class="row" v-for="n in notes" :key="n.id">
          <div class="m-4 p-3 border col-md-11">
            <div class="row">
              <div class="col-md-10">
                <Creator :bug="bug" />
                <!-- {{ bug.creator.name }} -->
                <br>
                {{ note.body }}
                <br>
                <br>
                {{ new Date(note.createdAt).toLocaleString() }}
              </div>
              <div class="col-md-2 text-right">
                <button class="btn btn-outline-primary" title="delete" @click="destroyNote(n.id)">
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Swal from 'sweetalert2'

export default {
  name: 'NotesThread',
  setup() {
    return {
      notes: computed(() => AppState.notes),
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
