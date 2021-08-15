import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll(query = {}) {
    const res = await api.bugsService.getAll()
    logger.log(res.data)
    AppState.bugs = res.data
  }
}
export const bugsService = new BugsService()
