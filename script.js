document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expense-form');
    const tableBody = document.querySelector('#expense-table tbody');
    const totalAmountSpan = document.getElementById('total-amount');
    let expenses = [];

    form.addEventListener('submit', addExpense);

    function addExpense(e) {
        e.preventDefault();
        
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const category = document.getElementById('expense-category').value;
        const date = document.getElementById('expense-date').value;

        // Ensure all fields are filled
        if (!name || isNaN(amount) || !category || !date) {
            alert('Please fill all the fields.');
            return;
        }

        const expense = { name, amount, category, date };

        expenses.push(expense);
        addExpenseToTable(expense);
        updateTotalAmount();
        form.reset();
    }

    function addExpenseToTable(expense) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        row.querySelector('.delete-btn').addEventListener('click', function() {
            tableBody.removeChild(row);
            expenses = expenses.filter(exp => exp !== expense);
            updateTotalAmount();
        });

        row.querySelector('.edit-btn').addEventListener('click', function() {
            editExpense(row, expense);
        });
    }

    function editExpense(row, expense) {
        document.getElementById('expense-name').value = expense.name;
        document.getElementById('expense-amount').value = expense.amount;
        document.getElementById('expense-category').value = expense.category;
        document.getElementById('expense-date').value = expense.date;

        form.removeEventListener('submit', addExpense);
        form.addEventListener('submit', function updateExpense(e) {
            e.preventDefault();
            
            expense.name = document.getElementById('expense-name').value;
            expense.amount = parseFloat(document.getElementById('expense-amount').value);
            expense.category = document.getElementById('expense-category').value;
            expense.date = document.getElementById('expense-date').value;
            
            // Ensure all fields are filled
            if (!expense.name || isNaN(expense.amount) || !expense.category || !expense.date) {
                alert('Please fill all the fields.');
                return;
            }

            row.children[0].textContent = expense.name;
            row.children[1].textContent = '$${expense.amount.toFixed(2)}';
            row.children[2].textContent = expense.category;
            row.children[3].textContent = expense.date;
            
            form.removeEventListener('submit', updateExpense);
            form.addEventListener('submit', addExpense);
            form.reset();
            updateTotalAmount();
        }, { once: true });
    }

    function updateTotalAmount() {
        const totalAmount = expenses.reduce((total, exp) => total + exp.amount, 0);
        totalAmountSpan.textContent = totalAmount.toFixed(2);
    }
});