const start = document.getElementById('start'),
    additionalExpenses = document.getElementsByTagName('BUTTON')[0],
    mandatoryExpenses = document.getElementsByTagName('BUTTON')[1],
    cancel = document.querySelector('#cancel'),
    inputsBlock = document.querySelector('.data'),
    getRightFormInputClear = document.querySelector('.result');


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


const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const AppData = function() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.ExpensesMonth = 0;
};

AppData.prototype.getStartValue = function() {
    start.disabled = !isNumber(salaryAmount.value);
};

AppData.prototype.start = function() {
    let _this = this;
    if (salaryAmount.value === '') {
        alert('Ошибка, "поле месячный" доход, должно быть заполнено ');
        return
    } else {
        _this.budget = salaryAmount.value;
    }

    this.getExpensens();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpensens();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    start.style.display = 'none';
    cancel.style.display = 'block';
    let allLeftInputs = inputsBlock.querySelectorAll('input[type=text]');
    allLeftInputs.forEach(function(item) {
        item.setAttribute('disabled', true);

    });
    additionalExpenses.setAttribute('disabled', true);
    mandatoryExpenses.setAttribute('disabled', true);
};

AppData.prototype.cancel = function() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.ExpensesMonth = 0;

    start.style.display = 'block';
    cancel.style.display = 'none';
    let allLeftInputs = inputsBlock.querySelectorAll('input[type=text]');
    allLeftInputs.forEach(function(item) {
        item.removeAttribute('disabled', true);
        item.value = '';
    });

    let getRightInputClear = getRightFormInputClear.querySelectorAll('input[type=text]');
    getRightInputClear.forEach((item) => {
        item.value = '';
    });
    periodSelectRange.value = 1;
    periodAmount.innerHTML = 1;
    additionalExpenses.removeAttribute('disabled', true);
    mandatoryExpenses.removeAttribute('disabled', true);
};

AppData.prototype.showResult = function() {
    budgetMonth.value = +this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensensMonth.value = this.ExpensesMonth;

    additionalExpensesVarriable.value = this.addExpenses.join(', ');
    additionalIncomeVarriable.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelectRange.addEventListener('change', (event) => {
        incomePeriodValue.value = this.calcSavedMoney();
    });
};

AppData.prototype.addExpensensBlock = function() {
    let cloneExpensensItem = ExpensensItem[0].cloneNode(true);
    cloneExpensensItem.childNodes[1].value = '';
    cloneExpensensItem.childNodes[3].value = '';
    ExpensensItem[0].parentNode.insertBefore(cloneExpensensItem, mandatoryExpenses);
    ExpensensItem = document.querySelectorAll('.expenses-items');
    inputs = document.querySelectorAll('input');
    if (ExpensensItem.length == 3) {
        mandatoryExpenses.style.display = 'none';
    }
};

AppData.prototype.getRange = function() {
    periodAmount.innerHTML = periodSelectRange.value;
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.childNodes[1].value = '';
    cloneIncomeItem.childNodes[3].value = '';
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, additionalExpenses);
    incomeItem = document.querySelectorAll('.income-items');

    if (incomeItem.length === 3) {
        additionalExpenses.style.display = 'none';
    }
};

AppData.prototype.getExpensens = function() {
    let _this = this;
    ExpensensItem.forEach(function(item) {
        let itemExpensens = item.querySelector('.expenses-title').value;
        let cashExpensens = +item.querySelector('.expenses-amount').value;
        if (itemExpensens != '' && cashExpensens != '') {
            _this.expenses[itemExpensens] = cashExpensens;
        }
    });
};

AppData.prototype.validate = () => {
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
};

AppData.prototype.getIncome = function() { /// ТУТ ДЗ
    let _this = this;
    incomeItem.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashincome = item.querySelector('.income-amount').value;
        if (itemIncome != '' && cashincome != '') {
            _this.income[itemIncome] = cashincome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpensens = function() {
    let _this = this;
    let addExpensens = additionalExpensesItem.value.split(',');
    addExpensens.forEach(function(item) {
        item = item.trim();
        if (item != '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function() {
    let _this = this;
    additionalInputs.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    })
};

AppData.prototype.getExpensesMonth = function() { //считаем сумму всех обязательных расходов на месяц
    for (let key in this.expenses) {
        this.ExpensesMonth += this.expenses[key];
    }
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = (+this.budget) + (+this.incomeMonth) - this.ExpensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {
    let _this = this;
    if (_this.budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (_this.budgetDay >= 600) {
        return 'У вас средний уровень дохода';
    } else if (_this.budgetDay < 600 && _this.budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
};

AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelectRange.value;
};

AppData.prototype.eventListeners = function() {
    this.getStartValue();
    this.validate();

    salaryAmount.addEventListener('input', this.getStartValue);
    start.addEventListener('click', this.start.bind(appData));
    cancel.addEventListener('click', this.cancel.bind(appData));
    mandatoryExpenses.addEventListener('click', this.addExpensensBlock);
    additionalExpenses.addEventListener('click', this.addIncomeBlock);
    periodSelectRange.addEventListener('input', this.getRange);
};

const appData = new AppData();

appData.eventListeners();