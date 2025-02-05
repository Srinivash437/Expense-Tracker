// Select necessary elements
const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const netIncomeEl = document.getElementById("netIncome");
const filterCategory = document.getElementById("filterCategory");

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
        <button class="btn btn-warning btn-sm" onclick="editTransaction(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Delete</button>
      </td>
    `;
    transactionList.appendChild(row);
  });

  // Update summary section
  totalIncomeEl.textContent = totalIncome.toFixed(2);
  totalExpenseEl.textContent = totalExpense.toFixed(2);
  netIncomeEl.textContent = (totalIncome - totalExpense).toFixed(2);

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

// Edit a transaction
function editTransaction(index) {
  const transaction = transactions[index];

  // Populate form fields with the current transaction details
  document.getElementById("date").value = transaction.date;
  document.getElementById("description").value = transaction.description;
  document.getElementById("category").value = transaction.category;
  document.getElementById("amount").value = transaction.amount;

  // Remove the old transaction and update UI after editing
  deleteTransaction(index);

  // Scroll to the form for better user experience
  transactionForm.scrollIntoView();

  // Handle form resubmission with new data
  transactionForm.addEventListener(
    "submit",
    function saveEdit(e) {
      e.preventDefault();
      const newDate = document.getElementById("date").value;
      const newDescription = document.getElementById("description").value;
      const newCategory = document.getElementById("category").value;
      const newAmount = parseFloat(document.getElementById("amount").value);

      if (
        !newDate ||
        !newDescription ||
        !newCategory ||
        isNaN(newAmount) ||
        newAmount <= 0
      ) {
        alert("Please fill in all fields correctly.");
        return;
      }

      const updatedTransaction = {
        date: newDate,
        description: newDescription,
        category: newCategory,
        amount: newAmount,
      };

      transactions.push(updatedTransaction);
      transactionForm.reset();
      updateUI();

      // Remove the temporary event listener after saving
      transactionForm.removeEventListener("submit", saveEdit);
    },
    { once: true }
  );
}

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
          <button class="btn btn-warning btn-sm" onclick="editTransaction(${index})">Edit</button>
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
    transactions = [];
    localStorage.clear(); // Clear local storage
    updateUI(); // Update UI
  }
});

// Initial UI update
updateUI();
