const loan = document.getElementById("loan");
const tenure = document.getElementById("tenure");
const rate = document.getElementById("rate");
const submitButton = document.getElementById("calculate");
const sidebar = document.getElementById("sidebar");

// text output
const balance_text = document.getElementById("balance");
const payment_for_month = document.getElementById("payment_for_month");
const current_interest = document.getElementById("current_interest");

let paymentPlans = [];

function calcLoan() {
  let balance;
  let loanValue = Number(loan.value);
  let tenureValue = Number(tenure.value);
  let rateValue = Number(rate.value);

  const paymentPerMonth = loanValue / tenureValue;

  for (let i = 0; i < tenureValue; i++) {
    if (i == 0) {
      // let currentInterest = (rateValue / 100) * loanValue;
      // let paymentForthemonth = (rateValue / 100) * loanValue + paymentPerMonth;
      balance = loanValue - paymentPerMonth;
    }

    balance = loanValue - paymentPerMonth * i;
    let currentInterest = (rateValue / 100) * balance;

    let paymentForthemonth = (rateValue / 100) * balance + paymentPerMonth;

    let paymentPlan = {
      months: i + 1,
      "Payment for month": paymentForthemonth,
      Balance: balance,
      "Current Interest": currentInterest,
    };

    paymentPlans.push(paymentPlan);
  }
}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}
function createTable() {
  let table = document.querySelector("table");
  let data = Object.keys(paymentPlans[0]);
  generateTableHead(table, data);
  generateTable(table, paymentPlans);
}

document
  .getElementById("calculate")
  .addEventListener("click", function (event) {
    event.preventDefault();
    paymentPlans.length = 0;
    console.log(paymentPlans)
    calcLoan();
    createTable();
  });
