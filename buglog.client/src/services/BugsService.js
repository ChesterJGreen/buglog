import { AppState } from '../AppState'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    logger.log(res.data)
    AppState.bugs = res.data
    return res.data
  }

  async getById(id) {
    if (id) {
      const res = await api.get(`api/bugs/${id}`)
      AppState.bug = res.data
      logger.log(res.data)
      return res.data
    }
  }

  async editBug(edit) {
    console.log('in service')
    console.log(edit)
    const res = await api.put('api/bugs/' + edit.id, edit)
    console.log(res.data)
    AppState.bug = res.data
  }

  async createBug(rawBug) {
    console.log('in service')
    console.log(rawBug)
    const res = await api.post('api/bugs', rawBug)
    logger.log(res.data)
    AppState.bugs = [res.data, ...AppState.bugs]
    router.push({ name: 'BugDetailsPage', params: { id: res.data.id } })
  }

  async destroyBug(bug) {
    console.log('in the service, deleting')
    console.log(bug.id)
    const res = await api.delete('api/bugs/' + bug.id)
    AppState.bug = res.data
    this.getById(bug.id)
  }
}
export const bugsService = new BugsService()
