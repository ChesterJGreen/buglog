<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <BugComponent />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import BugComponent from '../components/BugComponent.vue'
import { AppState } from '../AppState'
export default {
  components: { BugComponent },
  name: 'Home',
  setup() {
    return {
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
