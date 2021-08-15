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
            <!-- VModel -->
            <input
              class="form-control"
              type="text"
              v-model="state.rawBug.name"
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
export default {
  name: 'CreateBugModal',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
