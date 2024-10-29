// Budget Buddy JavaScript Code

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionListEl = document.getElementById("transaction-list");
const formEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = [];

function updateDOM() {
  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = income + expense;

  incomeEl.textContent = `$${income.toFixed(2)}`;
  expenseEl.textContent = `$${Math.abs(expense).toFixed(2)}`;
  balanceEl.textContent = `$${balance.toFixed(2)}`;
  
  transactionListEl.innerHTML = '';

  transactions.forEach(transaction => {
    const li = document.createElement("li");
    li.classList.add("transaction-item");
    li.classList.add(transaction.amount < 0 ? 'negative' : 'positive');
    
    li.innerHTML = `
      ${transaction.description} 
      <span>${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}</span>
      <button onclick="removeTransaction(${transaction.id})">&times;</button>
    `;
    
    transactionListEl.appendChild(li);
  });
}

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionEl.value;
  const amount = +amountEl.value;

  if (description.trim() === "" || amount === "") return;

  const transaction = {
    id: Date.now(),
    description,
    amount
  };

  transactions.push(transaction);
  updateDOM();
  
  descriptionEl.value = '';
  amountEl.value = '';
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateDOM();
}

formEl.addEventListener("submit", addTransaction);

updateDOM();
