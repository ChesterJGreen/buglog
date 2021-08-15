<template>
  <div class="row m-0 bg-light">
    <div class="col-md-12 p-0 bg-blue lighten-40" v-if="bg-blue">
      <router-link class="d-flex" :to="{name: 'BugFocusPage', params: {id: bug.id}}">
        <div class="col-md-3 ">
          <span>
            {{ bug.title }}
          </span>
        </div>
        <div class="col-md-3 ">
          <span>
            {{ bug.creator.name }}
          </span>
        </div>
        <div class="col-md-3 ">
          <span>
            {{ updateDate }}
          </span>
        </div>
        <div class="col-md-3 ">
          <span>
            {{ bug.closed }}
          </span>
        </div>
      </router-link>
    </div>
    <div class="col-md-12 p-0 bg-yellow lighten-40" v-else>
      <router-link class="d-flex" :to="{name: 'BugFocusPage', params: {id: bug.id}}">
        <div class="col-md-3 ">
          {{ bug.title }}
        </div>
        <div class="col-md-3 ">
          {{ bug.creator.name }}
        </div>
        <div class="col-md-3 ">
          {{ bug.updatedAt }}
        </div>
        <div class="col-md-3 ">
          {{ bug.closed }}
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
      updateDate: computed(() => {
        const d = new Date.UTC(props.bug.updatedAt)
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
</style>
