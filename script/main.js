const calculate = document.getElementById('start'),
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
  periodSelectRange = document.querySelector('.period-select');



console.log(calculate);
