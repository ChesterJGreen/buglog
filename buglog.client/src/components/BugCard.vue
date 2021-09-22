<template>
  <div class="row m-0 bg-light border-bottom border-secondary">
    <div class="col-md-12 m-0 p-2 procard text-wrap bg-primary lighten-20" style="width: 6rem;">
      <router-link :to="{ name: 'BugDetailsPage', params: {id: bug.id}}" class="creator d-flex">
        <div class="col-md-3 col-sm-6 pt-3">
          <span class="textr">
            {{ bug.title }}
          </span>
        </div>
        <div class="d-none d-md-block col-md-4 pt-3 ">
          <span class="textr">
            {{ bug.creator.name }}
          </span>
        </div>
        <div class="d-none d-md-block col-md-2 pt-3 ">
          <span class="textr">
            {{ updatedDate }}
          </span>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="row" v-if="bug.closed===true">
            <div class="col-md-6 pt-3">
              <span class="textr">
                Closed
              </span>
            </div>
            <div class="col-md-6">
              <span class="textr">
                <i class="mdi mdi-spider mdi-36px text-red darken-10">
                </i>
              </span>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-md-6 pt-3">
              <span class="textr">
                Open
              </span>
            </div>
            <div class="col-md-6">
              <span class="textr">
                <i class="mdi mdi-spider mdi-36px text-green lighten-10"></i>
              </span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'BugCard',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account),
      updatedDate: computed(() => {
        const d = new Date(props.bug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: inherit;
}
hr {width: 98% ;margin-left: auto;margin-right: auto;height: 1px; opacity: 0.1;}
.procard:hover{
  color: #0875db;
  transform: scale(1.01);
  cursor: pointer;
}
h3 {
  color: white;
  text-shadow: 2px 2px 4px #000000;
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
