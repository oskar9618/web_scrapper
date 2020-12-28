const fs = require('fs')
const pupetter = require('puppeteer')
const pdf2table = require('pdf2table')
const parseData = require('./formatPdfData')
const creController = require('../controller/creController')
const url = 'https://www.gob.mx/cre/documentos/actualizacion-de-los-cargos-por-servicios-de-transmision-para-energias-renovables-y-cogeneracion-eficiente'

async function setPDFUrl() {
  const browser = await pupetter.launch()
  try {
      const page = await browser.newPage()
      await page.goto(url)
      //create url for pdf
      const result = await page.evaluate(() => `${location.origin}${url}`)
      await browser.close()
      return result
  } catch (error) {
      console.log('CRE get pdf url Error:: ',error.message)
      browser.close()
  }
}

async function readPDF() {
  try {
      let pdfDataBuffer = fs.readFileSync('./cre.pdf')
      pdf2table.parse(pdfDataBuffer, async (err, rows) => {
        if (err) console.log(err.message)
        let arrCreObject = parseData(rows)
        await creController.saveCreArr(arrCreObject)
        console.log('Success!!!')
      })
  } catch (error) {
      console.log('CRE readFile Error:: ',error.message)
  }
}

module.exports = {
  setPDFUrl,
  readPDF
}