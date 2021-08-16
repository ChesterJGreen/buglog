<template>
  <img :src="account.picture" class="pimage rounded-circle">
  {{ account.name }}
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'Component',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.pimage{
  width: 10%;
}
</style>
