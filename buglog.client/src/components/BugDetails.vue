<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-6 mt-3 bg-secondary">
        <div class="row">
          <div class="col-md-6 py-3">
            <h4>{{ bug.title }}</h4>
          </div>
          <div class="col-md-2 offset-4 mt-2">
            <button class="btn btn-primary btn-outline">
              edit
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-12 bg-primary lighten-10 px-5 borderb py-3">
        <div class="row border border-">
          <div class="col-md-10 px-4 py-3 bg-light darken-5">
            {{ bug.description }}
          </div>
          <div class="col-md-2 px-4 py-3 bg-light darken-5">
            {{ bug.closed }}
          </div>
        </div>
        <div class="row bg-light darken-15">
          <div class="col-md-3 d-flex py-2 ">
            <img class="px-2" :src="bug.creator.picture" height="25">
            {{ bug.creator.name }}
          </div>
          <div class="col-md-4 offset-5 py-2">
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
      })

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
