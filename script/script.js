'use strict';

let money = 25000;
let income = 'Photographs';
let addExpenses = 'pills';
let deposit = false;
let mission = 16000;
let period = 3;
let budgetDay;

//задание к уроку 1;
//alert('JS11: Урок #1:');

//задание к уроку 2;
let showTypeOf = function(data) {
    return console.log(data);
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
showTypeOf(income.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
addExpenses.toLowerCase(); // привести переменную к нижнему регистру.

// Задание к уроку номер 3. 
money = Number(prompt('Ваш месячный доход?', '')); //Узнаем ежемесяный доход пользователя и приводим тип к числу. 
deposit = confirm('Есть ли у вас депозит в банке?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''); // Массив возможных расходов.

let expenses1 = prompt('Введите обязательную статью расходов?', ''); // Первая обязательная статья расходов
let amount1 = Number(prompt('Во сколько это обойдется?'), '');

let expenses2 = prompt('Введите обязательную статью расходов?', ''); // Вторая обязательная статья расходов
let amount2 = Number(prompt('Во сколько это обойдется?'), '');

if (addExpenses != '') {
    addExpenses = addExpenses.split(','); // переводим расходы в масссив 
    console.log(addExpenses);
}

// Задания у кроку 4

const getExpensesMonth = function() {
    return amount1 + amount2;
};

const getAccumulatedMonth = function() {
    let credet = getExpensesMonth();
    return money - credet;
};

let acumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    return Math.ceil(mission / acumulatedMonth);
}

console.log(`Ваш месячный бюджет равен: ${acumulatedMonth} рублей`); // Выводим бюджет на месяц пользователя

budgetDay = acumulatedMonth / 30;
console.log(`Ваш бюджет на день составляет: ${budgetDay.toFixed(2)} рублей`);
let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
}
console.log(getStatusIncome());