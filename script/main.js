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
    inputs = document.querySelectorAll('input'),
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensensItem = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items');
console.log(expensensItem);


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
        this.expensesMonth = 0;
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

        this.getExpInc();
        this.getAddExpenInc(additionalExpensesItem.value.split(','));
        this.getAddExpenInc(additionalInputs);
        this.getExpensesMonth();
        // this.getAddExpensens();
        //this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();

        this.showResult();
        start.style.display = 'none';
        cancel.style.display = 'block';
        const allLeftInputs = inputsBlock.querySelectorAll('input[type=text]');
        allLeftInputs.forEach(function (item) {
            item.setAttribute('disabled', true);

        });
        additionalExpenses.setAttribute('disabled', true);
        mandatoryExpenses.setAttribute('disabled', true);
        //addEncExpBlock.setAttribute('disabled', true);
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
        this.expensesMonth = 0;
        //удаляем новые блоки при обнуление
        if (expensensItem.length > 1) {
            for (let i = 1; i < expensensItem.length; i++) {
                expensensItem[i].value = '';
                expensensItem[i].remove();
            }
        }
        if (incomeItem.length > 1) {
            for (let i = 1; i < incomeItem.length; i++) {
                incomeItem[i].value = '';
                incomeItem[i].remove();
            }
        }

        start.style.display = 'block';
        cancel.style.display = 'none';
        const allLeftInputs = inputsBlock.querySelectorAll('input[type=text]');
        allLeftInputs.forEach(function (item) {
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
        additionalExpenses.style.display = 'block';
        mandatoryExpenses.style.display = 'block';
        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.value = '';
        expensensItem = document.querySelectorAll('.expenses-items'),
            incomeItem = document.querySelectorAll('.income-items');
    }

    showResult() {
        budgetMonth.value = +this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensensMonth.value = this.expensesMonth;

        additionalExpensesVarriable.value = this.addExpenses.join(', ');
        additionalIncomeVarriable.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelectRange.addEventListener('change', (event) => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
    }

    addEncExpBlock() {
        const isButton = event.target.classList[1].split('_'),
            thisButton = document.querySelector(`.${isButton[0]}_add`);
        let MyItem = document.querySelectorAll(`.${isButton[0]}-items`),
            cloneMyItem = MyItem[0].cloneNode(true);
        cloneMyItem.childNodes[1].value = '';
        cloneMyItem.childNodes[3].value = '';
        MyItem[0].parentNode.insertBefore(cloneMyItem, thisButton);
        MyItem = document.querySelectorAll(`.${isButton[0]}-items`)
        if (MyItem.length == 3) {
            thisButton.style.display = 'none';
        }
        if (isButton[0] === 'expenses') { //обновляем наши переменные для других методов
            expensensItem = document.querySelectorAll('.expenses-items');

        } else if (isButton[0] === 'income') {
            incomeItem = document.querySelectorAll('.income-items');
        }
    }

    getRange() {
        periodAmount.innerHTML = periodSelectRange.value;
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
        expensensItem.forEach(count);
        incomeItem.forEach(count);
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
            if (target.placeholder === 'Сумма' || target.placeholder === 'Процент') {
                target.value = target.value.replace(/[^0-9]/i, '');
            }
        });
    }

    getAddExpenInc(array) {
        const _this = this;
        const getArray = array;
        getArray.forEach(function (item) {
            if (item != '' && array !== additionalInputs) {
                item = item.trim();
                _this.addExpenses.push(item);
            } else if (item != '' && array === additionalInputs) {
                item = item.value.trim();
                _this.addIncome.push(item);
            }
        });
    }

    getExpensesMonth() { //считаем сумму всех обязательных расходов на месяц
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getBudget() {
        const mothDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = (+this.budget) + (+this.incomeMonth) - this.expensesMonth + mothDeposit;
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

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    getPrecent() {
        if (this.value < 0 || this.value > 100) {
            alert('Процент должен быть от 0 до 100');
            let correctValue = this.value.slice(0, -1);
            this.value = correctValue;
            this.innerHTML = correctValue;
        }
    }

    depositHendler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }


    eventListeners() {
        this.getStartValue();
        this.validate();
        depositCheck.addEventListener('change', this.depositHendler.bind(this));
        salaryAmount.addEventListener('input', this.getStartValue);
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.cancel.bind(this));
        mandatoryExpenses.addEventListener('click', this.addEncExpBlock);
        additionalExpenses.addEventListener('click', this.addEncExpBlock);
        periodSelectRange.addEventListener('input', this.getRange);
        depositPercent.addEventListener('input', this.getPrecent);
    }
}
const appData = new AppData();

appData.eventListeners();