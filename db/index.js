const mongoose = require('mongoose')

let mongoURI = 'mongodb+srv://lalo:lalo@personals-project-clust.vdqsw.mongodb.net/cre?retryWrites=true&w=majority'

const dbConnect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('DataBase Online!!')
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = dbConnect