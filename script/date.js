
//1
const firstTask = document.querySelector('.first-task'),
  secondTask = document.querySelector('.second-task'),
  lastTask = document.querySelector('.lastTask');
let myDate = new Date();
console.log(myDate.toLocaleString('ru'));
//Функция возвращяет день недели указаной даты. (Я ее написал, а потом нашел метод)
/* const getThisDay = (day) => {
  let days;
  days = day.getDay();
  if (days === 0) {
    return 'воскресение';
  } else if (days === 1) {
    return 'понедельник';
  } else if (days === 2) {
    return 'вторник';
  } else if (days === 3) {
    return 'среда';
  } else if (days === 4) {
    return 'четверг';
  } else if (days = 5) {
    return 'пятница';
  } else {
    return 'суббота';
  } */
//}

//фунции для склоанения часов
// Секунда: 1.
// Секунд: 0, 5, 6, 7, 8, 9.
// Секунды: 2, 3, 4.
const getDeclinationSeconds = (second) => {
  if (second % 10 === 1 && second != 11) {
    return 'секунда';
  } else if (second % 10 === 0 || second % 10 === 5 || second % 10 === 6 || second % 10 === 7 || second % 10 === 8 || second % 10 === 9 || second === 11 || second === 12 || second === 13 || second === 14) {
    return 'секунд';
  } else if (second % 10 === 2 || second % 10 === 3 || second % 10 === 4 || second != 12 || second != 13 || second != 14) {
    return 'секунды'
  }
};
const getDeclinationMinets = (minet) => {
  if (minet % 10 === 1 && minet != 11) {
    return 'минута';
  } else if (minet % 10 === 0 || minet % 10 === 5 || minet % 10 === 6 || minet % 10 === 7 || minet % 10 === 8 || minet % 10 === 9 || minet === 11 || minet === 12 || minet === 13 || minet === 14) {
    return 'минут';
  } else if (minet % 10 === 2 || minet % 10 === 3 || minet % 10 === 4 || minet != 12 || minet != 13 || minet != 14) {
    return 'минуты'
  }
};
const getDeclinationHours = (hour) => {
  if (hour % 10 === 1 && hour != 11) {
    return 'час';
  } else if (hour % 10 === 0 || hour % 10 === 5 || hour % 10 === 6 || hour % 10 === 7 || hour % 10 === 8 || hour % 10 === 9 || hour === 11 || hour === 12 || hour === 13 || hour === 14) {
    return 'часов';
  } else if (hour % 10 === 2 || hour % 10 === 3 || hour % 10 === 4 || hour != 12 || hour != 13 || hour != 14) {
    return 'часа'
  }
};

firstTask.innerHTML = `Сегодня ${myDate.toLocaleString('ru', {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
})} ${myDate.getFullYear()} года, ${myDate.getHours()} ${getDeclinationHours(myDate.getHours())} ${myDate.getMinutes()} ${getDeclinationMinets(myDate.getMinutes())} ${myDate.getSeconds()} ${getDeclinationSeconds(myDate.getSeconds())}`

setInterval(() => {
  myDate = new Date().toLocaleString('ru', {
  });
  lastTask.innerHTML = `<b>${myDate}</b>`;
}, 1000);

myDateSecond = new Date().toLocaleString('ru', {
});
secondTask.textContent = myDateSecond;
