'use strict';

//необходимые функции для проверки ввода данных пользователем
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);
const isNotEmpty = (text) => text.trim() != '';

let money;
const start = () => {
    do {
        money = prompt('Ваш месячный доход?', '');
    } while (!isNumber(money) || !isNotEmpty(money) || money === null)
    return money;
};
start();
const appData = { //Создаем главный обьект программы
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 30000,
    period: 7,
    budget: money,
    asking: function () {
        if (confirm('Есть ли у вас доп. заработок?')) {
            let itemIncome;
            let cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', '');
            } while (itemIncome === '' || itemIncome === null)
            if (itemIncome != '') {
                do {
                    cashIncome = prompt('сколько в месяц зарабатвыаете на этом?', 10000);
                } while (!isNumber(cashIncome) || cashIncome === null)

                appData.income[itemIncome] = cashIncome;
            }

        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum = 0;
        let checkSum;
        for (let i = 0; i < 2; i++) {
            let title;
            do {
                title = prompt('Введите обязательную статью расходов?', '');
            }
            while (title === null || title.trim() === '')

            do {
                appData.expenses[title] = +prompt('Во сколько это обойдется?');
            }
            while (!isNumber(appData.expenses[title]) || appData.expenses[title] === null)
        }
    },
    budgetDay: 0,
    budgetMonth: 0,
    ExpensesMonth: 0,
    getExpensesMonth: function () { //считаем сумму всех обязательных расходов на месяц
        for (let key in appData.expenses) {
            appData.ExpensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.ExpensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        let targetMonth;

        targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
        if (isNumber(targetMonth) && targetMonth > 0) {
            return `Цель будет достигнута через ${targetMonth} месяцев`;
        } else {
            return `Цель не будет достигнута`;
        }
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент у депозита?', '6');
            } while (!isNumber(appData.percentDeposit))

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit))

        }
    },
    calcSavedMoney: function () {
        return this.budgetMonth * this.period;
    },
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();

console.log(`Выши расходы на месяц- ${appData.ExpensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
//пункт 13, выводит наш обьект в 
console.log('Наша программа включает в себя');
for (let key in appData) {
    console.log(`ключ ${key}: значение ${appData[key]}`);
}

const showAddExpenses = () => {
    let arrString = '';
    appData.addExpenses.forEach(function (item, i) {
        if (i < appData.addExpenses.length - 1) {
            arrString += `${item.trim().charAt(0).toUpperCase() + item.slice(1)}, `;
        } else {
            arrString += `${item.trim().charAt(0).toUpperCase() + item.slice(1)}`;
        }

    });
    console.log(arrString);
};
showAddExpenses();