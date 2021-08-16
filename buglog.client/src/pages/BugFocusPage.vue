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
          <div v-if="bug" class="content">
            <BugDetails :bug="bug" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <NotesThread :note="note" />
    </div> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'
export default {
  name: 'BugFocusPage',
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

      // updatedDate: computed(() => {
      //   const d = new Date(props.bug.updatedAt)
      //   return new Intl.DateTimeFormat('en-US').format(d)
      // })
    }
  },
  components: {}
}
</script>

    BugDetails<style lang="scss" scoped>

</style>
