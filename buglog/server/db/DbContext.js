import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Bug as BugSchema } from '../models/Bug'
import { Note as NoteSchema } from '../models/Note'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Bugs = mongoose.model('Bug', BugSchema)
  Notes = mongoose.model('Note', NoteSchema)
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
