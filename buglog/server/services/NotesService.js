import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAll(query = {}) {
    const note = await dbContext.Notes.find(query).populate('creator', 'name picture').populate('bug', 'title description closed closedDate')
    return note
  }

  async getAllNotesByBugId(id) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture').populate('bug', 'title description closed closedDate')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async getById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture').populate('bug', 'title description closed closedDate')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note._id).populate('creator', 'name picture').populate('bug', 'title description closed closedDate')
  }

  async edit(body) {
    const note = await dbContext.Notes.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async destroy(id) {
    const note = await dbContext.Notes.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}
export const notesService = new NotesService()
