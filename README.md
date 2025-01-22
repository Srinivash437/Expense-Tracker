# Expense Tracker

This is a simple Expense Tracker application that allows users to record their income and expenses, categorize them, and view a summary of their financial situation. The application also includes a table to track all transactions and the ability to filter them by category.

## Features

- **Add Transactions**: Users can input the date, description, category, and amount of a transaction.
- **Transaction Summary**: Displays total income, total expenses, and net income.
- **Transaction Table**: Lists all transactions with an option to filter by category.
- **Reset**: Clears all transactions and resets the data.
  
## File Structure

- `index.html`: The main HTML file that contains the structure and layout of the application.
- `style.css`: The CSS file for styling the application.
- `app.js`: The JavaScript file that handles the functionality and logic of the expense tracker.

## How It Works

### 1. **Add a Transaction**
   - The form allows you to input:
     - **Date**: Select the date of the transaction.
     - **Description**: Enter a brief description of the transaction.
     - **Category**: Choose a category for the transaction (e.g., Food, Transportation, Entertainment, etc.).
     - **Amount**: Enter the amount spent or received.
   - When you click the **Add Transaction** button, the transaction is added to the table, and the summary section is updated.

### 2. **Transaction Summary**
   - Displays:
     - **Total Income**: The sum of all income transactions.
     - **Total Expenses**: The sum of all expense transactions.
     - **Net Income**: The difference between total income and total expenses.

### 3. **Transaction Table**
   - Displays a table with:
     - Date
     - Description
     - Category
     - Amount
     - Action (To delete a transaction)
   - You can filter the transactions by category using the dropdown filter above the table.

### 4. **Reset**
   - The **Reset** button clears all the data, including transactions and the summary, allowing you to start fresh.

## How to Run

1. **Download the files**:
   - Download or clone the project folder.

2. **Open the `index.html` file**:
   - Navigate to the project folder and open the `index.html` file in any modern web browser (Chrome, Firefox, etc.).

3. **Start using the Expense Tracker**:
   - Once the page loads, you can begin adding transactions, viewing the summary, and interacting with the transaction table.

## Technologies Used

- **HTML**: For the structure and content.
- **CSS**: For styling the application.
- **JavaScript**: For adding functionality and interactivity.
- **Bootstrap 5**: For the responsive design and pre-built components.

## License

This project is open-source and free to use. Feel free to modify and distribute it.
