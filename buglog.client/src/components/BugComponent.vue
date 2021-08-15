<template>
  <div class="bug-component col-md-12 bg-light px-5">
    <div class="row">
      <div class="col-md-12 mt-5">
        <div class="row">
          <div class="col-md-1 offset-1 py-3">
            <h3>
              Bugs
            </h3>
          </div>

          <div class="col-md-3 offset-7 py-3">
            <button class="btn btn-info shadow rounded" type="button" data-target="#create-bug-modal" data-toggle="modal">
              Submit Log
            </button>
            <CreateBugModal />
          </div>
          <div class="col-md-12 bg-warning shadow p-2">
            <div class="row m-0">
              <div class="col-md-3 col-sm">
                Title
              </div>
              <div class="col-md-3 col-sm">
                Reported By
              </div>
              <div class="col-md-3 col-sm">
                Last Updated
              </div>
              <div class="col-md-3 col-sm">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input outline bg-dark" id="customSwitch1">
                  <label class="custom-control-label" for="customSwitch1">Closed/All</label>
                </div>
              </div>
              <div class="col-md-12 p-0">
                <BugCard v-for="b in bugs" :key="b.id" :bug="b" />
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
import CreateBugModal from '../components/CreateBugModal.vue'

export default {
  name: 'BugComponent',

  setup() {
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        console.log(error)
        Pop.toast(error, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs),
      async createBug() {
        try {
          await bugsService.createBug()
        } catch (error) {
          Pop.toast("Couldn't create Bug " + error, 'error')
        }
      }
    }
  },

  components: {
    // CreateBugModal
  }
}
</script>

<style lang="scss" scoped>

</style>
