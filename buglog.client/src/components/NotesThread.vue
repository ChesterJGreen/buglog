<template>
  <div class="col-md-12 p-2 m-0">
    <div class="row m-0">
      <div class="col-md-1.5 ml-auto pt-2">
        <button type="button" class="btn btn-info rounded textr" data-toggle="modal" data-target="#createNote">
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
          <div class="col-md-10 bg-white darken-10 py-2 textr">
            <div class="row px-4">
              <span class="px-2">
                <img :src="note.creator.picture" class="rounded-pill" height="25">
              </span>
              {{ note.creator.name }}
            </div>
            <div class="row border border-dark my-2 mx-2 pb-3">
              <div class="col-md-12 pt-3 px-5">
                {{ note.body }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 py-2 pl-5">
                {{ new Date(note.createdAt).toLocaleString() }}
              </div>
            </div>
          </div>
          <div class="col-md-2 pt-2 text-right bg-white darken-10" v-if="account.id === note.creatorId">
            <button class="btn btn-outline-primary p-1 textr" title="delete" @click="destroyNote(note.id)">
              <i class="mdi mdi-delete mdi-24px"></i>
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
        await notesService.getAllNotesByBugId(props.bug.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      notes: computed(() => {
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
                'Your note has been deleted.',
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
.borderb{
  border: 10px, solid, blueviolet;
}
.action{
  :hover{
    cursor: pointer;
  }
}
.nav-bg{
 background: rgb(0,0,0);
background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(11,17,128,1) 50%, rgba(255,22,22,1) 100%);;
}
.nav-bg-r{
  background: rgb(0,0,0);
background: linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(11,17,128,1) 50%, rgba(255,22,22,1) 100%);
}
hr {width: 98% ;margin-left: auto;margin-right: auto;height: 1px; opacity: 0.1;}
.text:hover {
  text-shadow: 1px 1px 2px black,
  0 0 5px rgb(253, 253, 253),
    0 0 5px rgb(128, 4, 0);
  cursor: pointer;
}
.textr {
  color: rgb(255, 255, 255);
text-shadow: -1px 1px 12px #161803,
1px 1px 2px #161803,
       1px -1px 2px #161803,
      -1px -1px 2px #161803;
}
.card-bg{
  background: rgb(0,0,0);
background: linear-gradient(270deg, rgba(0,0,0,0.6102590694480917) 0%, rgba(128,11,105,1) 50%, rgba(225,255,22,1) 100%);
}
</style>
