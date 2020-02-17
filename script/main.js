const start = document.getElementById('start'),
    additionalExpenses = document.getElementsByTagName('BUTTON')[0],
    mandatoryExpenses = document.getElementsByTagName('BUTTON')[1],
    cancel = document.querySelector('#cancel'),
    inputsBlock = document.querySelector('.data'),
    getRightFormInputClear = document.querySelector('.result'),
    additionalInputs = document.querySelectorAll('.additional_income-item'),
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
    periodAmount = document.querySelector('.period-amount'),
    inputs = document.querySelectorAll('input');

let ExpensensItem = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items');


const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

class AppData {
    constructor() {
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
    }

    getStartValue() {
        start.disabled = !isNumber(salaryAmount.value);
    }

    start() {
        const _this = this;
        if (salaryAmount.value === '') {
            alert('Ошибка, "поле месячный" доход, должно быть заполнено ');
            return
        } else {
            _this.budget = salaryAmount.value;
        }

        this.getExpInc()
        this.getExpensesMonth();
        this.getAddExpensens();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        start.style.display = 'none';
        cancel.style.display = 'block';
        const allLeftInputs = inputsBlock.querySelectorAll('input[type=text]');
        allLeftInputs.forEach(function(item) {
            item.setAttribute('disabled', true);

        });
        additionalExpenses.setAttribute('disabled', true);
        mandatoryExpenses.setAttribute('disabled', true);
    }

    cancel() {
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
        const allLeftInputs = inputsBlock.querySelectorAll('input[type=text]');
        allLeftInputs.forEach(function(item) {
            item.removeAttribute('disabled', true);
            item.value = '';
        });

        const getRightInputClear = getRightFormInputClear.querySelectorAll('input[type=text]');
        getRightInputClear.forEach((item) => {
            item.value = '';
        });
        periodSelectRange.value = 1;
        periodAmount.innerHTML = 1;
        additionalExpenses.removeAttribute('disabled', true);
        mandatoryExpenses.removeAttribute('disabled', true);
    }

    showResult() {
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
    }

    addExpensensBlock() {
        const cloneExpensensItem = ExpensensItem[0].cloneNode(true);
        cloneExpensensItem.childNodes[1].value = '';
        cloneExpensensItem.childNodes[3].value = '';
        ExpensensItem[0].parentNode.insertBefore(cloneExpensensItem, mandatoryExpenses);
        ExpensensItem = document.querySelectorAll('.expenses-items');
        //inputs = document.querySelectorAll('input');
        if (ExpensensItem.length == 3) {
            mandatoryExpenses.style.display = 'none';
        }
    }

    getRange() {
        periodAmount.innerHTML = periodSelectRange.value;
    }

    addIncomeBlock() {
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.childNodes[1].value = '';
        cloneIncomeItem.childNodes[3].value = '';
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, additionalExpenses);
        incomeItem = document.querySelectorAll('.income-items');

        if (incomeItem.length === 3) {
            additionalExpenses.style.display = 'none';
        }
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle != '' && itemAmount != '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        }

        incomeItem.forEach(count);
        ExpensensItem.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }

    }

    validate() {
        const dataBlockInput = document.querySelector('.data');
        dataBlockInput.addEventListener('input', () => {
            const target = event.target;
            if (target.placeholder === 'Наименование') {
                target.value = target.value.replace(/[^а-я]/i, '');
            }
            if (target.placeholder === 'Сумма') {
                target.value = target.value.replace(/[^0-9]/i, '');
            }
        });
    }

    getAddExpensens() {
        const _this = this;
        const addExpensens = additionalExpensesItem.value.split(',');
        addExpensens.forEach(function(item) {
            item = item.trim();
            if (item != '') {
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        const _this = this;
        additionalInputs.forEach(function(item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        })
    }

    getExpensesMonth() { //считаем сумму всех обязательных расходов на месяц
        for (let key in this.expenses) {
            this.ExpensesMonth += this.expenses[key];
        }
    }

    getBudget() {
        this.budgetMonth = (+this.budget) + (+this.incomeMonth) - this.ExpensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() {
        // const _this = this;
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelectRange.value;
    }

    eventListeners() {
        this.getStartValue();
        this.validate();

        salaryAmount.addEventListener('input', this.getStartValue);
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.cancel.bind(this));
        mandatoryExpenses.addEventListener('click', this.addExpensensBlock);
        additionalExpenses.addEventListener('click', this.addIncomeBlock);
        periodSelectRange.addEventListener('input', this.getRange);
    }
}
const appData = new AppData();

appData.eventListeners();