import { AppState } from '../AppState'
import { router } from '../router'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    return res.data
  }

  async getById(id) {
    if (id) {
      const res = await api.get(`api/bugs/${id}`)
      AppState.bug = res.data
      return res.data
    }
  }

  async editBug(edit) {
    const res = await api.put('api/bugs/' + edit.id, edit)
    AppState.bug = res.data
  }

  async createBug(rawBug) {
    const res = await api.post('api/bugs', rawBug)
    AppState.bugs = [res.data, ...AppState.bugs]
    router.push({ name: 'BugDetailsPage', params: { id: res.data.id } })
  }

  async destroyBug(bug) {
    const res = await api.delete('api/bugs/' + bug.id)
    AppState.bug = res.data
    this.getById(bug.id)
  }
}
export const bugsService = new BugsService()
