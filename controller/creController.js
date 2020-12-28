const CreModel = require('../models/cre')

const saveCreArr = async (arrCreObj) => {
  try {
    for (let creObject of arrCreObj) {
      let creDB = new CreModel({...creObject})
      
      let existCreDB = await CreModel.findOne({ year: creObject.year, month: creObject.month })
      if (!existCreDB) {
        await creDB.save()
      }
    }
  } catch (error) {
    console.log('CRE save data Error:: ',error.message)
  }
}

module.exports = {
  saveCreArr
}