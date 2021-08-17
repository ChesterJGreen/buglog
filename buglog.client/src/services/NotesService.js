import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getAllNotesByBugId(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = res.data
    logger.log(res.data)
    return res.data
  }

  async createNote(newNote) {
    try {
      logger.log(newNote)
      const res = await api.post('api/notes', newNote)
      logger.log(res.data)
      AppState.notes = [res.data, ...AppState.notes]
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async destroyNote(id) {
    await api.delete('api/notes/' + id)
    const AllNotes = AppState.notes
    AppState.notes = AllNotes.filter(n => n.id !== id)
  }
}

export const notesService = new NotesService()
