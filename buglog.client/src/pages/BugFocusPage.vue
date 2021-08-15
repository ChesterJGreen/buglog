<template>
  <div class="bug-focus-page">
    <div class="col-md-12 bg-warning shadow p-2">
      <div class="row">
        <div class="col-md-3 col-sm">
          {{ bug.id }}
        </div>
        <div class="col-md-3 col-sm">
          <img :src="bug.creator.picture" height="25">
          {{ bug.creator.name }}
        </div>
        <div class="col-md-3 col-sm">
          {{ bug.updatedAt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
export default {
  name: 'BugFocusPage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        console.log('onmounted bug' + route.params.id)
      } catch (error) {
        Pop.toast('FAILED TO LOAD BUG ' + error, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs.filter(b => b.id === route.params.id))
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
