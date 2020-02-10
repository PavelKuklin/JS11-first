const start = document.getElementById('start'),
    additionalExpenses = document.getElementsByTagName('BUTTON')[0],
    mandatoryExpenses = document.getElementsByTagName('BUTTON')[1];


let additionalInputs = document.querySelectorAll('.additional_income-item'),
    budgetMonth = document.getElementsByClassName('budget_month-value')[0],
    budgetDay = document.getElementsByClassName('budget_day-value')[0],
    expensensMonth = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeVarriable = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesVarriable = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelectRange = document.querySelector('.period-select'),
    ExpensensItem = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    inputs = document.querySelectorAll('input');

//Добавляем старый файл 
//необходимые функции для проверки ввода данных пользователем
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);
const isNotEmpty = (text) => text.trim() != '';

let money;

const appData = { //Создаем главный обьект программы
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 0,
    budget: money,
    getStartValue: function() {
        start.disabled = !isNumber(salaryAmount.value);
    },
    start: function() {

        if (salaryAmount.value === '') {
            alert('Ошибка, "поле месячный" доход, должно быть заполнено ');
            return
        } else {
            appData.budget = salaryAmount.value;
            console.log(salaryAmount.value);
        }


        appData.getExpensens();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpensens();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },

    showResult: function() {
        budgetMonth.value = +appData.budgetMonth;
        budgetDay.value = appData.budgetDay;
        expensensMonth.value = appData.ExpensesMonth;

        additionalExpensesVarriable.value = appData.addExpenses.join(', ');
        additionalIncomeVarriable.value = appData.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelectRange.addEventListener('change', (event) => {
            incomePeriodValue.value = this.calcSavedMoney();
        });

    },
    addExpensensBlock: function() {
        let cloneExpensensItem = ExpensensItem[0].cloneNode(true);
        console.log(cloneExpensensItem.childNodes)
        cloneExpensensItem.childNodes[1].value = '';
        cloneExpensensItem.childNodes[3].value = '';
        ExpensensItem[0].parentNode.insertBefore(cloneExpensensItem, mandatoryExpenses);
        ExpensensItem = document.querySelectorAll('.expenses-items');
        inputs = document.querySelectorAll('input');
        if (ExpensensItem.length == 3) {
            mandatoryExpenses.style.display = 'none';
        }
    },
    getRange: function() {
        periodAmount.innerHTML = periodSelectRange.value;
    },
    addIncomeBlock: function() {
        console.log(incomeItem.parentNode);
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.childNodes[1].value = '';
        cloneIncomeItem.childNodes[3].value = '';
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, additionalExpenses);
        incomeItem = document.querySelectorAll('.income-items');

        if (incomeItem.length === 3) {
            additionalExpenses.style.display = 'none';
        }
    },
    getExpensens: function() {
        ExpensensItem.forEach(function(item) {
            let itemExpensens = item.querySelector('.expenses-title').value;
            let cashExpensens = +item.querySelector('.expenses-amount').value;
            if (itemExpensens != '' && cashExpensens != '') {
                appData.expenses[itemExpensens] = cashExpensens;
            }
        });
    },
    validate: () => {
        let dataBlockInput = document.querySelector('.data');
        dataBlockInput.addEventListener('input', () => {
            let target = event.target;
            if (target.placeholder === 'Наименование') {
                target.value = target.value.replace(/[^а-я]/i, '');
            }
            if (target.placeholder === 'Сумма') {
                target.value = target.value.replace(/[^0-9]/i, '');
            }
        });

    },

    getIncome: function() { /// ТУТ ДЗ
        console.log(incomeItem, ExpensensItem);
        incomeItem.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashincome = item.querySelector('.income-amount').value;
            if (itemIncome != '' && cashincome != '') {
                appData.income[itemIncome] = cashincome;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +this.income[key];
        }
    },
    getAddExpensens: function() {
        let addExpensens = additionalExpensesItem.value.split(',');
        addExpensens.forEach(function(item) {
            item = item.trim();
            if (item != '') {
                appData.addExpenses.push(item);
            }
        });

    },
    getAddIncome: function() {
        additionalInputs.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },
    budgetDay: 0,
    budgetMonth: 0,
    ExpensesMonth: 0,
    getExpensesMonth: function() { //считаем сумму всех обязательных расходов на месяц
        for (let key in appData.expenses) {
            appData.ExpensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = (+appData.budget) + (+appData.incomeMonth) - appData.ExpensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function() {
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
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент у депозита?', '6');
            } while (!isNumber(appData.percentDeposit))

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit))

        }
    },

    calcSavedMoney: function() {
        return this.budgetMonth * periodSelectRange.value;
    },
};

appData.getStartValue();
appData.validate();

// console.log(`Выши расходы на месяц- ${appData.ExpensesMonth}`);
// console.log(appData.getTargetMonth());
// console.log(appData.getStatusIncome());
// //пункт 13, выводит наш обьект в 
// console.log('Наша программа включает в себя');
// for (let key in appData) {
//     console.log(`ключ ${key}: значение ${appData[key]}`);
// }

const showAddExpenses = () => {
    let arrString = '';
    appData.addExpenses.forEach(function(item, i) {
        if (i < appData.addExpenses.length - 1) {
            arrString += `${item.trim().charAt(0).toUpperCase() + item.slice(1)}, `;
        } else {
            arrString += `${item.trim().charAt(0).toUpperCase() + item.slice(1)}`;
        }

    });
    console.log(arrString);
};
showAddExpenses();


salaryAmount.addEventListener('input', appData.getStartValue);
start.addEventListener('click', appData.start);

mandatoryExpenses.addEventListener('click', appData.addExpensensBlock);
additionalExpenses.addEventListener('click', appData.addIncomeBlock);
periodSelectRange.addEventListener('input', appData.getRange);