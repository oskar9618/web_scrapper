const fs = require('fs')
const path = require('path')
const fetchPDF = require('download-pdf')
const cronJob = require('node-cron')
const dbConnect = require('./db')
const { setPDFUrl, readPDF } = require('./crePdf/pdfUtils')

let pdfSource = path.join(__dirname, './cre.pdf')
async function main() {
    try {
    
        let url = await setPDFUrl()
        const options = {
            directory: './',
            filename: 'cre.pdf'
        }

        return fetchPDF(url, options, async function () {
            readPDF()
            fs.unlinkSync(pdfSource)
        })
    } catch (error) {
        console.log('CRE main function:: ',error.message)
    }
}

dbConnect()
main() 

// cronJob.schedule('1,2,4,5 * * * *', () => {
//     console.log('CRE CronJob Success!')
// })