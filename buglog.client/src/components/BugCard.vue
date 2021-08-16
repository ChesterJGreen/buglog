<template>
  <div class="row m-0 bg-light border-bottom border-secondary">
    <div class="col-md-12 p-0 bg-blue lighten-40 text-wrap" style="width: 6rem;">
      <router-link :to="{ name: 'BugFocusPage', params: {id: bug.id}}" class="creator d-flex">
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
            {{ updatedDate }}
          </span>
        </div>
        <div class="col-md-3 ">
          <span>
            {{ bug.closed }}
          </span>
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
.creator{
  height: 3em;
  color: #0f0bee
}
</style>
