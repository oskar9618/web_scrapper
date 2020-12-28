const { Schema, model } = require('mongoose')

const creSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  means: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
},{ strict: false, timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } })

module.exports = model('cre', creSchema)

