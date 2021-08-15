import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    logger.log(res.data)
    AppState.bugs = res.data
  }

  async createBug(rawBug) {
    const res = await api.post('api/bugs', rawBug)
    logger.log(res.data)
    AppState.bugs = [res.data, ...AppState.bugs]
  }
}
export const bugsService = new BugsService()
