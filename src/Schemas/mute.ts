import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

const muteSchema = new mongoose.Schema(
  {
    authorID: reqString,
    targetID: reqString,
    reason: reqString,
    active: {
      type: Boolean,
      required: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

export default mongoose.model('mutes', muteSchema)
