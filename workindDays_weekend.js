const axios = require('axios');

// Contabilizar tempo em cada p status (dias uteis) e mostrar na sidebar
// WF: https://app.hubspot.com/workflows/9027998/platform/flow/254502504/edit

//1 pegar da entrada do hubspot
//2 pegar data atual no hubspot?

// pegar feriados criar um array de feriados
// https://brasilapi.com.br/docs#tag/Feriados-Nacionais Lista todos os feriados nacionais de um certo ANO. Recebe o parâmetro ano (interger)

async function businessDay(date) {

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(); // pega a data corrente
  endDate.setHours(0, 0, 0, 0); //evita contagem a mais no número de dias 

  const days = getDays(startDate, endDate); // numero de dias entre as datas

  const weekendsDays = getWeekendDays(endDate, days);

  const holidays = await countHolidays(startDate, endDate, endDate.getFullYear());

  let businessDay = days - weekendsDays - holidays;
}

function getDays(startDate, endDate) {
  const periodMileSeg = new Date(endDate - startDate); // diferença entre datas, em milisegundos

  return periodMileSeg / (1000 * 60 * 60 * 24); // numero de dias entre as datas
}

function getWeekendDays(endDate, days) {

  const lastWeekDay = endDate.getDay();

  const semanasInteiras = Math.floor(days / 7);

  const daysLeft = days % 7;

  const weekendsLeft = () => {
    if (daysLeft >= lastWeekDay + 2) {
      return 2;
    }
    if (daysLeft == lastWeekDay + 1) {
      return 1;
    }
    if (lastWeekDay == 6 && daysLeft >= 1) {
      return 1;
    }
    return 0;
  }

  const weekendsDays = (semanasInteiras * 2) + weekendsLeft();
}

async function getHolidays(year) {
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${year}`); // API que retorna dados dos feriados num determinado ano.
    const holidaysArr = response.data.map(e => e.date); // array com elementos (datas dos feriados)  com formato '2022-01-01'.
    // console.log(holidaysArr);
    return holidaysArr;
  } catch (error) {
    console.error(error);
  }
}

async function countHolidays(startDate, endDate, year) {
  await getHolidays(year).then(value => {
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
    const resultado = holidaysCounter
  });
}

// console.log(countHolidays('2022-09-01', '2022-09-14', 2022));
// console.log(getHolidays(2022));
// getHolidays(2022).then(v => console.log(v));

//  countHolidays('2022-01-01','2022-04-22', 2022).then(v => console.log(v));
 countHolidays('2022-01-01','2022-04-22', 2022);

// countHolidays('2022-01-01', '2022-04-22', [2022]);

