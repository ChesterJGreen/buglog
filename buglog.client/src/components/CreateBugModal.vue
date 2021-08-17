<template>
  <div class="create-bug-form">
    <div class="modal fade" id="create-bug-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Create Bug
            </h5>
            <button type="button" class="btn-close btn btn-outline-danger" data-dismiss="modal" aria-label="Close" title="close">
              X
            </button>
          </div>
          <div class="modal-body">
            <input
              class="form-control"
              type="text"
              v-model="state.rawBug.title"
              id="name"
              placeholder="Name Bug..."
            >
            <br>
            <textarea
              class="form-control"
              id="description"
              v-model="state.rawBug.description"
              rows="5"
              placeholder="Description..."
            >
          </textarea>
          </div>
          <div class="modal-footer">
            <button type="submit" @click="createBug" class="btn btn-primary" data-toggle="modal" data-target="#createBug">
              Submit Bug
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
import $ from 'jquery'
export default {
  name: 'CreateBugModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      rawBug: {}
    })
    return {
      state,
      router,
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      async createBug() {
        try {
          const newBug = await bugsService.createBug(state.rawBug)
          state.rawBug = {}
          Pop.toast('Bug Created', 'success')
          $('#create-bug-modal').modal('toggle')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>

</style>
