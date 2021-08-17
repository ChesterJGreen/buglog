<template>
  <div class="col-md-12 shadow p-2 hero-img">
    <div class="row">
      <div class="col-md-12 px-5 pt-5">
        <div class="row" id="bug-detail-change">
          <div v-if="bug" class="content col-md-12 ">
            <BugDetails :bug="bug" />
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div v-if="bug" class="content col-md-12 mt-4 border ">
        <NotesThread :bug="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'

export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getById(route.params.id)
        await notesService.getAllNotesByBugId(route.params.id)
      } catch (error) {
        Pop.toast('FAILED TO LOAD BUG ' + error, 'error')
      }
    })
    return {
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes)
    }
  },
  components: {}
}
</script>

<style lang="scss">
a {
  color: inherit;
  text-decoration: inherit;
}
hr {width: 98% ;margin-left: auto;margin-right: auto;height: 1px; opacity: 0.1;}
.procard:hover{
  color: #0875db65;
  transform: scale(1.02);
  cursor: pointer;
}
h3 {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
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
.hero-img{
    // min-height: 60vh;
  background-image: url(https://images.unsplash.com/photo-1628853383704-916b69d5a14c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60);
  background-size: cover;
  background-position: center;
  padding-top: 5%;
}
</style>
