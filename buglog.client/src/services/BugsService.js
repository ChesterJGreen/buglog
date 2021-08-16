import { AppState } from '../AppState'
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

  async createBug(rawBug) {
    console.log('in service')
    console.log(rawBug)
    const res = await api.post('api/bugs', rawBug)
    logger.log(res.data)
    AppState.bugs = [res.data, ...AppState.bugs]
  }
}
export const bugsService = new BugsService()
