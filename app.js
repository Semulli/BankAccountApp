const bankApp = {
  balance: 0,
  transactions: [],

  personalInfo: function () {
    const nameInput = document.querySelector("#fullNameEl");
    const emailInput = document.querySelector("#emailEl");

    if (nameInput.value === "" && emailInput.value === "") {
      alert("please enter current informations!");
    } else {
      document.querySelector("#fulname").textContent = nameInput.value;
      document.querySelector("#email").textContent = emailInput.value;

      alert("User info updated successfully");
    }
  },

  deposit: function (amount) {
    if (amount > 0) {
      this.balance += amount;
      this.transactions.push({
        no: this.transactions.length + 1,
        processType: "DepositAmount",
        amount: amount,
        balance: this.balance,
      });

      this.updateTransactionHistory();
    } else {
      alert("Please enter a valid value!");
    }
  },

  withdraw: function (amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      this.transactions.push({
        no: this.transactions.length + 1,
        processType: "WithdrawBalance",
        amount: amount,
        balance: this.balance,
      });
      this.updateTransactionHistory();
    } else if (amount > this.balance) {
      alert("Insufficient balance");
    } else {
      alert("Please enter a valid amount to withdraw!");
    }
  },

  updateTransactionHistory: function () {
    const showValue = document.querySelector("#balance");
    showValue.innerHTML = this.balance;

    const showTable = document.querySelector("#table tbody");

    showTable.innerHTML = this.transactions
      .map((transaction) => {
        return `
          <tr>
            <td>${transaction.no}</td>
            <td>${transaction.processType}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.balance}</td> 
          </tr>
        `;
      })
      .join("");
  },
};

const infoBtnEl = document.querySelector("#personInfoBtn");
const depositEl = document.querySelector("#EnteringValue");
const withdrawEl = document.querySelector("#withDrawValue");
const depositBtnEl = document.querySelector("#depositBtn");
const withdrawBtnEl = document.querySelector("#withDrawBtn");

infoBtnEl.onclick = () => bankApp.personalInfo();
depositBtnEl.onclick = () => {
  document.querySelector("#table").classList.remove("bg-danger");

  document.querySelector("#table").classList.add("bg-success");
  const depositAmount = Number(depositEl.value);
  bankApp.deposit(depositAmount);
  depositEl.value = "";
};
withdrawBtnEl.onclick = () => {
  document.querySelector("#table").classList.remove("bg-success");

  document.querySelector("#table").classList.add("bg-danger");

  const withDrawAmount = Number(withdrawEl.value);
  bankApp.withdraw(withDrawAmount);
  withdrawEl.value = "";
};
