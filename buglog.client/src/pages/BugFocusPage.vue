<template>
  <div class="col-md-12 shadow p-2">
    <div class="row">
      <div class="col-md-12 px-5 pt-5">
        <div class="row" id="bug-detail-change">
          <div v-if="loading" class="loading">
            Loading...
          </div>
          <div v-if="error" class="error">
            {{ error }}
          </div>
          <div v-if="bug" class="content col-md-12 border borderb">
            <BugDetails :bug="bug" />
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div v-if="bug" class="content col-md-12 border borderb">
        <NotesThread :bug="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'

import { bugsService } from '../services/BugsService'

export default {
  name: 'BugFocusPage',
  // props: {
  //   note: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      loading: false,
      bug: null,
      error: null
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    async fetchData() {
      this.error = this.bug = null
      this.loading = true
      const fetchedId = this.$route.params.id
      try {
        await bugsService.getById(fetchedId)
        this.bug = computed(() => AppState.bug)
      } catch (error) {
        this.error = error.toString()
      }

      if (this.$route.params.id !== fetchedId) return
      this.loading = false
    }
  },
  setup() {
    return {

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.borderb {
  border: 10px, solid, blueviolet
}

</style>
