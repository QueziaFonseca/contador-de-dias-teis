const axios = require('axios');

// Contabilizar tempo em cada p status (dias uteis) e mostrar na sidebas
// WF: https://app.hubspot.com/workflows/9027998/platform/flow/254502504/edit

//1 pegar da entrada do hubspot
//2 pegar data atual no hubspot?
// pegar feriados criar um array

// data1 = '2021-01-01'; // data entrada-> data inicial/entrada
// data2 = '2021-12-31'; // data corrente -> data final/atual

// // criar data com Date()
// var arr1 = data1.split('-');
// var arr2 = data2.split('-');
// var dataInicial = new Date(arr1[0],arr1[1]-1, arr1[2]); // ano, mês, dia
// var dataFinal = new Date(arr2[0],arr2[1]-1, arr2[2]); //jan é 0

// // ano
// var ano_inicial = dataInicial.getFullYear();
// var ano_final = dataFinal.getFullYear();
// let ano = ano_inicial;

// feriados
// // https://brasilapi.com.br/docs#tag/Feriados-Nacionais Lista todos os feriados nacionais de um certo ANO. Recebe o parâmetro ano (interger)

async function getHolidays(ano) {

  try {
    const response = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
    const holidaysArr = response.data.map(e => e.date)
    // console.log(response.data);
    // console.log(holidaysArr);
    return holidaysArr;
  } catch (error) {
    console.error(error);
  }
}


function countHolidays() {
  let startDate =  '2022-01-01'
  let endDate =  '2022-04-22'

  getHolidays(2022).then(value => {
    let holidaysCounter = 0;

  value.forEach((day) => {
    if(((Date.parse(day) >= Date.parse(startDate))) && (Date.parse(day) < Date.parse(endDate))) {
      holidaysCounter += 1;
    }
  })
  console.log(holidaysCounter);
  } );
  
}
// function calculateBusinessDays(startDate, endDate){

countHolidays();
//   // Calculate days between dates
//   var millisecondsPerDay = 86400 * 1000; // Day in milliseconds 24*60*60*1000
//   startDate.setHours(0,0,0,1);  // Start just after midnight, Date.setHours(hour, min, sec, millisec)
//   endDate.setHours(23,59,59,999);  // End just before midnight
//   var diff = endDate - startDate;  // Milliseconds between datetime objects    
//   var days = Math.ceil(diff / millisecondsPerDay); //  menor número inteiro maior ou igual
  
//   // Subtract two weekend days for every week in between
//   var weeks = Math.floor(days / 7); //número de semanas. o menor número inteiro 
//   days = days - (weeks * 2); // subtrai 2 dias a cada semana
  
//   // Handle special cases
//   var startDay = startDate.getDay();
//   var endDay = endDate.getDay();
  
//   // Remove weekend not previously removed.   ???
//   if (startDay - endDay > 1)         
//       days = days - 2;      
  
//   // Remove start day if span starts on Sunday but ends before Saturday   ???
//   if (startDay == 0 && endDay != 6) {
//       days = days - 1;  
//   }
  
//   // Remove end day if span ends on Saturday but starts after Sunday
//   if (endDay == 6 && startDay != 0) {
//       days = days - 1;
//   }
  
//   return days;
//   }