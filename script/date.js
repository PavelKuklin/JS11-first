const btn = document.querySelector('.btn');
let textArea = document.querySelector('.text-area');
let date = new Date();
const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const showWeek = (e) => {
  let textForDom = '';
  for (let i = 0; i < week.length; i++) {
    if (i === date.getDay() && (i === 6 || i === 0)) {
      textForDom += `<span> <i><b>${week[i]}</b></i></span>`;
    } else if (i === date.getDay()) {
      textForDom += `<b>${week[i]}</b>`;
    } else if (i === 6 || i === 0) {
      textForDom += `<i>${week[i]}</i>`;
    }
    else {
      textForDom += `${week[i]}`;
    }
    textForDom += `<br>`;
  }
  textArea.innerHTML = textForDom;
}

btn.addEventListener('click', showWeek);

