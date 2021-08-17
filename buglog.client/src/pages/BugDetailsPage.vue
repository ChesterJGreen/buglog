<template>
  <div class="col-md-12 shadow p-2">
    <div class="row">
      <div class="col-md-12 px-5 pt-5">
        <div class="row" id="bug-detail-change">
          <div v-if="bug" class="content col-md-12 border ">
            <BugDetails :bug="bug" />
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div v-if="bug" class="content col-md-12 border ">
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
import { logger } from '../utils/Logger'
import $ from 'jquery'

export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getById(route.params.id)
        await notesService.getAllNotesByBugId(route.params.id)
        logger.log('onmounted bug' + route.params.id)
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

<style lang="scss" scoped>
</style>
