<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <BugComponent />
  </div>
</template>

<script>
import BugComponent from '../components/BugComponent.vue'
export default {
  components: { BugComponent },
  name: 'Home'
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
