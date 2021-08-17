<template>
  <div class="edit-bug-form row">
    <div class="modal fade" id="edit-bug-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" title="Edit Bug" value="Edit Bug" id="exampleModalLabel">
              Edit Bug
            </h6>
            <button type="button" class="btn-close btn btn-outline-danger" data-dismiss="modal" aria-label="Close" title="close">
              X
            </button>
          </div>
          <div class="modal-body">
            <input
              class="form-control"
              type="text"
              v-model="state.bug.title"
              id="name"
              required
              minlength="4"
              placeholder="Title of Bug..."
            >
            <br>
            <label>Is this where you enter a label?</label>
            <textarea
              class="form-control"
              id="description"
              v-model="state.bug.description"
              rows="5"
              required
              minlength="4"
              placeholder="Description of Bug..."
            >
          </textarea>
          </div>
          <div class="modal-footer">
            <button type="submit" @click="editBug" class="btn btn-primary" data-toggle="modal" data-target="#editBug">
              Save
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
import { useRoute, useRouter } from 'vue-router'
import $ from 'jquery'
export default {
  name: 'EditBugModal',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      bug: {
        title: '',
        description: '',
        id: props.bug.id
      }
    })
    return {
      state,
      router,
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      async editBug() {
        try {
          state.bug.id = route.params.id
          const newBug = await bugsService.editBug(state.bug)
          $('#edit-bug-modal').modal('toggle')
          Pop.toast('Bug Edited', 'success')
          return newBug
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
