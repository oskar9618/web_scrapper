
/**
 * convert pdf table in array of object
 * @param data => array of array => [ [ 'RES/256/2010', 'junio', '0.03108', '0.03108', '0.06216' ] ]
 */
const pdfToArrObject = (data) => {
  let pdfRows = data.filter(item => item.length >= 4 && !item.includes('Servicios de '))
  let months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

  let arrCRE = []
  for (let i = 0; i < pdfRows.length; i++) {
    let firstItem = pdfRows[i][0].split('/')
    pdfRows[i][0] = firstItem[firstItem.length -1] // set year

    if (months.includes(pdfRows[i][0])) { // put year as the first element of the array 
      if (months.includes(pdfRows[i + 1][0])) {
        let year = pdfRows[i + 2][0].split('/')
        pdfRows[i + 2][0] = year[year.length -1]
        pdfRows[i].unshift(pdfRows[i + 2][0])

      } 
      else {
        let year = pdfRows[i + 1][0].split('/')
        pdfRows[i + 1][0] = year[year.length -1]
        pdfRows[i].unshift(pdfRows[i + 1][0])
      }
    }
    // set month as the second element of the array
    let secondItem = pdfRows[i][1].split('/')
    secondItem = secondItem[secondItem.length -1]
   
    if (secondItem === pdfRows[i][0]) {
      pdfRows[i].splice(1,1)
    } 
    
    //set cre object { year, month, high, means, low }
    // let year = pdfRows[i][1] === 'enero' ? parseInt(pdfRows[i][0]) + 1 : parseInt(pdfRows[i][0])
    let year = null
    
    if (pdfRows[i][1] === 'enero' &&  pdfRows[i - 1][0] === pdfRows[i][0]) {
      year = parseInt(pdfRows[i][0]) + 1
    } else {
      year = parseInt(pdfRows[i][0])
    }

    let month = pdfRows[i][1]
    let high = pdfRows[i].length > 5 ? parseFloat(pdfRows[i][3]) : parseFloat(pdfRows[i][2])
    let means =  pdfRows[i].length > 5 ? parseFloat(pdfRows[i][4]): parseFloat(pdfRows[i][3])
    let low =  pdfRows[i].length > 5 ? parseFloat(pdfRows[i][5]): parseFloat(pdfRows[i][4])

    arrCRE.push({
      year,
      month,
      high ,
      means,
      low
    })

  }
  
  return arrCRE
}


module.exports = pdfToArrObject