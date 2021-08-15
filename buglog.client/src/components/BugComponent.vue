<template>
  <div class="bug-component col-md-12 bg-light px-5">
    <div class="row">
      <div class="col-md-12 px-4 mt-5">
        <div class="row">
          <div class="col-md-1 offset-1 py-3">
            <h3>
              Bugs
            </h3>
          </div>

          <div class="col-md-3 offset-7 py-3">
            <Button class="btn btn-warning shadow rounded" @click="createBug">
              Submit Log
            </Button>
          </div>
          <div class="col-md-12 bg-primary shadow p-2">
            <div class="row">
              <div class="col-md-3">
                Title
              </div>
              <div class="col-md-3">
                Reported By
              </div>
              <div class="col-md-3">
                Last Updated
              </div>
              <div class="col-md-3">
                <Button>All Bugs/Open Bugs</Button>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-12">
                    <BugCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'

export default {
  name: 'BugComponent',
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs)
    }
  },

  components: {}
}
</script>

<style lang="scss" scoped>

</style>
