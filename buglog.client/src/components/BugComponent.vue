<template>
  <div class="bug-component col-md-12 px-5">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-sm-12 col-md-2 offset-1 mr-5 py-4 border rounded mb-5 title-o">
            <h3>
              <i class="mdi mdi-spider"></i>BugLog
            </h3>
          </div>
        </div>
        <div class="row">
          <div class=" col-sm-12 col-md-12 py-3">
            <span v-if="account.id">
              <button class="btn btn-info shadow rounded action text textr" type="button" data-target="#create-bug-modal" data-toggle="modal">
                Submit Log
              </button>
            </span>
            <CreateBugModal />
          </div>
        </div>

        <div class="col-md-12 d-md-block d-sm-none bg-warning shadow darken-40 border p-4 mb-3">
          <div class="row m-0 p-0">
            <div class="col-md-3 col-sm-6 pb-2 pt-2 textr">
              Title
            </div>
            <div class="d-none d-md-block col-md-4 pb-2 pt-2 textr">
              Reported By
            </div>
            <div class="d-none d-md-block col-md-2 d-sm-none  pb-2 pt-2 textr">
              Last Updated
            </div>
            <div class="col-md-3 d-sm-6 mb-3">
              <div v-if="state.fSwitch===true" class="custom-control custom-switch">
                <button type="button"
                        checked
                        data-toggle="toggle"
                        class="btn btn-dark text"
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
                        class=" btn btn-dark text"
                        id="cswitch"
                        @click="state.fSwitch=!state.fSwitch"
                >
                  No Filter
                </button>
              </div>
            </div>
            <div v-if="state.fSwitch===true" class="col-md-12 p-0 border-white rounded">
              <BugCard v-for="b in state.bugs" :key="b.id" :bug="b" />
            </div>
            <div v-else class="col-md-12 p-0 border-white rounded">
              <BugCard v-for="b in state.filteredBugs" :key="b.id" :bug="b" />
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
        Pop.toast(error, 'error')
      }
    })

    const state = reactive({
      fSwitch: true,
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
h3 {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
.title-o{
  background-color: #8cbeff3a;
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
</style>
