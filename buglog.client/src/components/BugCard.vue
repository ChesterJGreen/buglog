<template>
  <div class="bug-card row">
    <router-link :to="{name: 'BugFocusPage', params: {id: b.id}}">
      <div class="col-md-3 col-sm">
        {{ b.title }}
      </div>
      <div class="col-md-3 col-sm">
        {{ b.creator.name }}
      </div>
      <div class="col-md-3 col-sm">
        {{ b.updatedAt }}
      </div>
      <div class="col-md-3 col-sm">
        {{ b.closed }}
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'BugCard',
  setup() {
    return {
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
