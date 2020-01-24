let money = 25000;
let income = 'Photographs';
let addExpenses = 'pills';
let deposit = false;
let mission = 16000;
let period = 3;
let budgetDay = money / 30;

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
console.log(`Бюджет на день: ${budgetDay.toFixed(2)} рублей`);