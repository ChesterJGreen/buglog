import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAll(query = {}) {
    const note = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return note
  }

  async getAllNotesByBugId(id) {
    try {
      const bug = await dbContext.Bugs.findById(id)
      if (!bug) {
        throw new BadRequest('Bug not found')
      } else {
        const notes = await dbContext.Notes.find({}).populate('creator', 'name picture')
        return notes.filter(n => n.bugId === id)
      }
    } catch (error) {
      throw new BadRequest(error.message)
    }
  }

  async getById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note._id).populate('creator', 'name picture')
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
