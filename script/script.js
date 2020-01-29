'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'Photographs';
let addExpenses = 'pills';
let deposit;
let mission = 16000;
let period = 3;
let budgetDay;
let expenses = [];

let start = function() {
    do {
        money = prompt('Ваш месячный доход?', '');
    } while (!isNumber(money))

};
start();

let showTypeOf = function(data) {
    return console.log(typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
showTypeOf(income.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
addExpenses.toLowerCase(); // привести переменную к нижнему регистру.

deposit = confirm('Есть ли у вас депозит в банке?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''); // Массив возможных расходов.


if (addExpenses != '') {
    addExpenses = addExpenses.split(','); // переводим расходы в масссив 
    console.log(addExpenses);
}

let getExpensesMonth = function() {
    let sum = 0;
    let checkSum;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', '');
        do {
            checkSum = +prompt('Во сколько это обойдется?');
        } while (!isNumber(checkSum))
        sum += checkSum;
    }
    return sum;
};

//let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
    let credet = getExpensesMonth();
    return money - credet;
};

let acumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    let targetMonth;

    targetMonth = Math.ceil(mission / acumulatedMonth);
    if (isNumber(targetMonth) && targetMonth > 0) {
        return `Цель будет достигнута через ${targetMonth} месяцев`;
    } else {
        return `Цель не будет достигнута`;
    }
};
console.log(getTargetMonth());


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