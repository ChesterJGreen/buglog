import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Bug = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    closed: { type: Boolean, default: false },
    closedDate: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Bug.virtual('creator',
  {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
  })
