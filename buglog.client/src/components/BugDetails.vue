<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-6 mt-3 bg-secondary">
        <div class="row">
          <div class="col-md-6 py-3">
            <h4>{{ bug.title }}</h4>
          </div>
          <div class="col-md-2 offset-4 mt-2" v-if="account.id === bug.creatorId && bug.closed===false">
            <button class="btn btn-primary btn-outline" data-target="#edit-bug-modal" data-toggle="modal">
              edit
            </button>
            <EditBugModal :bug="bug" />
          </div>
        </div>
      </div>
      <div class="col-md-12 bg-primary lighten-10 px-5 borderb py-3">
        <span class="text-right action" v-if="bug.closed===false" title="Close Out Bug" @click="destroyBug(bug.id)">
          <h3>
            X
          </h3>
        </span>
        <div class="row border border-">
          <div class="col-md-10 px-4 py-3 bg-light darken-5">
            {{ bug.description }}
          </div>
          <div class="col-md-2 px-4 py-3 bg-light darken-5" v-if="bug.closed===true">
            Closed <i class="mdi mdi-spider mdi-48px text-red">
            </i>
          </div>
          <div class="col-md-2 px-4 py-3 bg-light darken-5" v-else>
            Open<br> <i class="mdi mdi-spider mdi-48px text-green">
            </i>
          </div>
        </div>
        <div class="row bg-light darken-15">
          <div class="col-md-3 d-flex py-2 ">
            <img class="px-2" :src="bug?.creator.picture" height="25">
            {{ bug.creator?.name }}
          </div>
          <div class="col-md-4 offset-5 py-2">
            Last Updated: {{ updatedDate }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { api } from "../services/AxiosService"
import { bugsService } from "../services/BugsService"
export default {
  name: 'Component',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      updatedDate: computed(() => {
        const d = new Date(props.bug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      }),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async destroyBug(){
        try {
      await Swal.fire({
            title: 'Are you sure you want to close out this bug?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, close it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              await bugsService.destroyBug(id)
              Swal.fire(
                'Deleted!',
                'Your bug has been closed.',
                'success'
              )
            }
          })
        } catch (error) {
          Pop.toast(error, 'error')

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.borderb{
  border: 10px, solid, blueviolet;
}
.action{
  :hover{
    cursor: pointer;
  }
}

</style>
