const axios = require('axios');

// Contabilizar tempo em cada p status (dias uteis) e mostrar na sidebar
// WF: https://app.hubspot.com/workflows/9027998/platform/flow/254502504/edit

//1 pegar da entrada do hubspot
//2 pegar data atual no hubspot?

// pegar feriados criar um array de feriados
  // https://brasilapi.com.br/docs#tag/Feriados-Nacionais Lista todos os feriados nacionais de um certo ANO. Recebe o parâmetro ano (interger)

async function getHolidays(ano) {

  try {
    const response = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`); // API que retorna dados dos feriados num determinado ano.
    const holidaysArr = response.data.map(e => e.date) // array com elementos (datas dos feriados)  com formato '2022-01-01'.
  //  // console.log(response.data);
  //  // console.log(holidaysArr);
    return holidaysArr;
  } catch (error) {
    console.error(error);
  }
}

async function countHolidays(startDate, endDate, year) {
  const result = getHolidays(year).then(value => {
    let holidaysCounter = 0;

    value.forEach((day) => {
      const dayDate = new Date(Date.parse(day));// formato de data
      // console.log(dayDate);
      const weekDay = dayDate.getDay() // dia da semana: 0 é domingo, 6 é sábado
      // console.log(` data do dia ${dayDate}, dia da semana: ${weekDay} `);
      // let formattedWeekDay = new Date(dayDate);
      // console.log(formattedWeekDay.getDay());
      if( weekDay !== 6 && weekDay !== 0) { // exclui feriados nos sábados e domingos
        if(((Date.parse(day) >= Date.parse(startDate))) && (Date.parse(day) < Date.parse(endDate))) {
                holidaysCounter += 1;
                // console.log('entrou')
        };
      }
    });
  
  console.log('contador',holidaysCounter);
  // console.log('contador',holidaysCounter);
  return holidaysCounter;  
  } );
  return result;
}


// countHolidays('2022-01-01','2022-04-22', 2022)

// async function countHolidays(startDate, endDate, year) {
//   return getHolidays(year).then(value => {
//     let holidaysCounter = 0;

//     value.forEach((day) => {
//       const dayDate = new Date(Date.parse(day));// formato de data
//       // console.log(dayDate);
//       const weekDay = dayDate.getDay() // dia da semana: 0 é domingo, 6 é sábado
//       // console.log(` data do dia ${dayDate}, dia da semana: ${weekDay} `);
//       // let formattedWeekDay = new Date(dayDate);
//       // console.log(formattedWeekDay.getDay());
//       if( weekDay !== 6 && weekDay !== 0) { // exclui feriados nos sábados e domingos
//         if(((Date.parse(day) >= Date.parse(startDate))) && (Date.parse(day) < Date.parse(endDate))) {
//                 holidaysCounter += 1;
//                 // console.log('entrou')
//         };
//       }
//     });
  
//   // console.log('contador',holidaysCounter);
//   // console.log('contador',holidaysCounter);
//   // return holidaysCounter;  
//   } );
// }
countHolidays('2022-01-01','2022-04-22', 2022).then(v => console.log(v));

