<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center hero-img">
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

<style lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.hero-img{
    // min-height: 60vh;
  background-image: url(https://images.unsplash.com/photo-1628853383704-916b69d5a14c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60);
  background-size: cover;
  background-position: center;
  padding-top: 5%;
}
.text:hover {
  text-shadow: 1px 1px 2px black,
  0 0 5px rgb(253, 253, 253),
    0 0 5px rgb(128, 4, 0);
  cursor: pointer;
}

</style>
