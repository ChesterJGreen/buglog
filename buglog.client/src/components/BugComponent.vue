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
            <span v-if="account.id">
              <button class="btn btn-info shadow rounded" type="button" data-target="#create-bug-modal" data-toggle="modal">
                Submit Log
              </button>
            </span>
            <CreateBugModal />
          </div>
          <div class="col-md-12 bg-warning shadow p-2 mb-3">
            <div class="row m-0 p-0">
              <div class="col-md-3 col-sm pb-2">
                Title
              </div>
              <div class="col-md-3 col-sm pb-2">
                Reported By
              </div>
              <div class="col-md-3 col-sm pb-2">
                Last Updated
              </div>
              <div class="col-md-3 col-sm mb-2">
                <div v-if="state.fSwitch===true" class="custom-control custom-switch">
                  <button type="button"
                          checked
                          data-toggle="toggle"
                          class="bg-dark "
                          id="cswitch"
                          @click="state.fSwitch=!state.fSwitch"
                  >
                    Filter out Closed
                  </button>
                </div>
                <div v-else class="custom-control custom-switch">
                  <button type="button"
                          checked
                          data-toggle="toggle"
                          class="bg-dark "
                          id="cswitch"
                          @click="state.fSwitch=!state.fSwitch"
                  >
                    No Filter
                  </button>
                </div>
              </div>
              <div v-if="state.fSwitch===true" class="col-md-12 p-0 border-primary">
                <BugCard v-for="b in state.bugs" :key="b.id" :bug="b" />
              </div>
              <div v-else class="col-md-12 p-0 border-primary">
                <BugCard v-for="b in state.filteredBugs" :key="b.id" :bug="b" />
              </div>
              <!-- <div class="col-md-12 p-0" v-else>
                <BugCardF v-for="b in state.bugs" :key="b.closed" :bug="b" />
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
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

    const state = reactive({
      fSwitch: false,
      bugs: computed(() => AppState.bugs),
      filteredBugs: computed(() => AppState.bugs.filter(b => b.closed === false))
    })
    return {
      state,
      computed: {
        sortedClosed() {
          this.bugs = this.bugs.sort((a, b) => {
            if (a.closed && !b.closed) {
              return -1
            } else if (!a.closed && b.closed) {
              return 1
            } else {
              return 0
            }
          })
        }
      },
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async fSwitch() {
        if (state.fSwitch === true) {
          state.bugs = this.bugs.filter(b => b.closed === false)
        } else {
          state.bugs = this.bugs
        }
        state.fSwitch = !state.fSwitch
      }

    }
  },

  components: {
    CreateBugModal
  }
}
</script>

<style lang="scss" scoped>

</style>
