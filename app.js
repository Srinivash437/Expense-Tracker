// Select necessary elements
const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const netIncomeEl = document.getElementById("netIncome");
const filterCategory = document.getElementById("filterCategory");

// Initialize transactions array and load from local storage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Update the UI with the current data
function updateUI() {
  transactionList.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction, index) => {
    // Update income and expense totals
    if (transaction.category === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }

    // Add transaction to the table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.description}</td>
      <td>${transaction.category}</td>
      <td>₹${transaction.amount}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Delete</button>
      </td>
    `;
    transactionList.appendChild(row);
  });

  // Update summary section
  totalIncomeEl.textContent = totalIncome;
  totalExpenseEl.textContent = totalExpense;
  netIncomeEl.textContent = totalIncome - totalExpense;

  // Save to local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add a transaction
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!date || !description || !category || isNaN(amount)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const transaction = { date, description, category, amount };
  transactions.push(transaction);

  transactionForm.reset();
  updateUI();
});

// Delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

// Filter transactions by category
filterCategory.addEventListener("change", () => {
  const selectedCategory = filterCategory.value;

  if (selectedCategory === "all") {
    updateUI();
    return;
  }

  transactionList.innerHTML = "";

  transactions.forEach((transaction, index) => {
    if (transaction.category === selectedCategory) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.description}</td>
        <td>${transaction.category}</td>
        <td>₹${transaction.amount}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Delete</button>
        </td>
      `;
      transactionList.appendChild(row);
    }
  });
});

// Select the reset button
const resetButton = document.getElementById("resetPage");

// Reset button functionality
resetButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all data?")) {
    localStorage.clear(); // Clear local storage
    document.getElementById("transactionList").innerHTML = ""; // Clear transaction table
    document.getElementById("totalIncome").textContent = "0";
    document.getElementById("totalExpense").textContent = "0";
    document.getElementById("netIncome").textContent = "0";
    // Optionally refresh the page
    location.reload();
  }
});

// Initial UI update
updateUI();
