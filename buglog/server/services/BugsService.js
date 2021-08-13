import { dbContext } from '../db/DbContext'

class BugsService {
  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator', 'name picture')
  }
}

export const bugsService = new BugsService()
