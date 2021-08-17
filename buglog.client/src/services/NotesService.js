import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async getAllNotesByBugId(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = res.data
    return res.data
  }

  async createNote(newNote) {
    try {
      const res = await api.post('api/notes', newNote)
      AppState.notes = [res.data, ...AppState.notes]
      return res.data
    } catch (error) {
    }
  }

  async destroyNote(id) {
    await api.delete('api/notes/' + id)
    const AllNotes = AppState.notes
    AppState.notes = AllNotes.filter(n => n.id !== id)
  }
}

export const notesService = new NotesService()
