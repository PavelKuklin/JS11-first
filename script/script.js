let money = 25000;
let income = 'Photographs';
let addExpenses = 'pills';
let deposit = false;
let mission = 16000;
let period = 3;
let budgetDay;
let budgetMonth;

//задание к уроку 1;
//alert('JS11: Урок #1:');

//console.log('Введение в язык, подключение javascript');

//задание к уроку 2;
console.log(typeof(money)); //Тип данных переменной 
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length); //Длина строки переменной
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
addExpenses.toLowerCase(); // привести переменную к нижнему регистру.
console.log(addExpenses.split('')); // разбил строку на массив и вывел ее в консоль. 
//console.log(`Бюджет на день: ${budgetDay.toFixed(2)} рублей`);

// Задание к уроку номер 3. 
money = Number(prompt('Ваш месячный доход?', '')); //Узнаем ежемесяный доход пользователя и приводим тип к числу. 
deposit = confirm('Есть ли у вас депозит в банке?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''); // Массив возможных расходов.

let expenses1 = prompt('Введите обязательную статью расходов?', ''); // Первая обязательная статья расходов
let amount1 = Number(prompt('Во сколько это обойдется?'), '');

let expenses2 = prompt('Введите обязательную статью расходов?', ''); // Вторая обязательная статья расходов
let amount2 = Number(prompt('Во сколько это обойдется?'), '');

addExpenses = addExpenses.split(','); // переводим расходы в масссив 

budgetMonth = (money) - (amount1 + amount2);
console.log(`Ваш месячный бюджет равен: ${budgetMonth} рублей`); // Выводим бюджет на месяц пользователя

console.log(`С таким уровнем трат и доходов вы достигните вашей цели через ${Math.ceil(mission/budgetMonth)} месяц(ев)`);

budgetDay = budgetMonth / 30;
console.log(`Ваш бюджет на день составляет: ${budgetDay.toFixed(2)} рублей`);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}