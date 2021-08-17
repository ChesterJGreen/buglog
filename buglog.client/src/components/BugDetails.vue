<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-6 mt-3 nav-bg border-top rounded">
        <div class="row border-right border-left">
          <div class="col-md-6 py-3 pl-5">
            <h4 class="textr">
              {{ bug.title }}
            </h4>
          </div>
          <div class="col-md-2 offset-4 mt-2 pt-2" v-if="account.id === bug.creatorId && bug.closed===false">
            <button class="btn btn-outline-dark textr" data-target="#edit-bug-modal" data-toggle="modal">
              edit
            </button>
            <EditBugModal :bug="bug" />
          </div>
        </div>
      </div>
      <div class="col-md-12 card-bg border lighten-10 px-5 borderb py-3">
        <span class="text-right action text" v-if="bug.closed===false && account.id === bug.creatorId" title="Close Out Bug" @click="destroyBug(bug)">
          <h3>
            <button class="btn btn-outline btn-light p-1 mb-2"><i class="mdi mdi-close mdi-24px"></i></button>
          </h3>
        </span>
        <div class="row border border-dark">
          <div class="col-md-10 px-4 py-3 bg-light darken-5 textr">
            {{ bug.description }}
          </div>
          <div class="col-md-2 px-4 py-3 bg-light darken-5 textr" v-if="bug.closed===true">
            Closed <i class="mdi mdi-spider mdi-48px text-red darken-10">
            </i>
          </div>
          <div class="col-md-2 px-4 py-3 bg-light darken-5 textr" v-else>
            Open<br> <i class="mdi mdi-spider mdi-48px text-green lighten-10">
            </i>
          </div>
        </div>
        <div class="row bg-light darken-15 border-dark border textr">
          <div class="col-md-3 d-flex py-2 pl-4">
            <img class="px-2 rounded-pill" height="50" width="50" :src="bug.creator?.picture">
            <span class="pt-2 pl-2"> {{ bug.creator?.name }}</span>
          </div>
          <div class="col-md-4 offset-5 py-2 textr pt-3">
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
import { bugsService } from '../services/BugsService'
import Swal from 'sweetalert2'
import Pop from '../utils/Notifier'

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
      bugs: computed(() => AppState.bugs),
      async destroyBug(bug) {
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
              await bugsService.destroyBug(bug)
              Swal.fire(
                'Closed!',
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
  }
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
.nav-bg{
 background: rgb(0,0,0);
background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(11,17,128,1) 50%, rgba(255,22,22,1) 100%);;
}
.nav-bg-r{
  background: rgb(0,0,0);
background: linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(11,17,128,1) 50%, rgba(255,22,22,1) 100%);
}
hr {width: 98% ;margin-left: auto;margin-right: auto;height: 1px; opacity: 0.1;}
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
.card-bg{
  background: rgb(0,0,0);
background: linear-gradient(270deg, rgba(0,0,0,0.6102590694480917) 0%, rgba(128,11,105,1) 50%, rgba(225,255,22,1) 100%);
}
</style>
