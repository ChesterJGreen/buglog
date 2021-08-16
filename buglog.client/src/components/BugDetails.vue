<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-6 mt-3 bg-secondary">
        <h4>{{ bug.title }}</h4>
      </div>
      <div class="col-md-12 bg-primary lighten-30 px-5 borderb py-3">
        <div class="row">
          <div class="col-md-12 px-4 pb-5">
            {{ bug.description }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 d-flex">
            <img :src="bug.creator.picture" height="25">
            {{ bug.creator.name }}
          </div>
          <div class="col-md-4 offset-5">
            Last Updated: {{ bug.updatedAt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
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

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.borderb{
  border: 10px, solid, blueviolet;
}

</style>
