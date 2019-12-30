// API REQUESTS

/**
 * function to render categories and expenses between the start and end date
 * @param {number} userId the user's id
 * @param {startDate} startDate the start date
 * @param {endDate} endDate the end date
 */
const getCategoriesAllByDate = (userId, startDate, endDate) => {
  axios
    .get(`/api/category/date/${userId}`, { startDate, endDate })
    .then(res => {
      if (res.data.length === 0) {
        renderAlert('No expenses found...');
        return;
      }
      $('#tbody').empty(); // empty the table
      // $('#modal').remove();
      console.log('res.data :', res.data);

      let grandTotal = 0;
      let goalTotal = 0;
      res.data.forEach(row => {
        let total = 0;
        goalTotal += parseFloat(row.goal);
        row.Expenses.forEach(expense => {
          total += parseFloat(expense.amount);
        });
        grandTotal += total;
        renderCategoryRow(row, total.toFixed(2));
        row.Expenses.forEach(expense => {
          total += parseFloat(expense.amount);
          renderExpenseRow(expense, row.name);
        });
      });

      renderTotalExpenses(grandTotal.toFixed(2), goalTotal.toFixed(2));
    })
    .catch(err => {
      if (err.response) {
        // render alert if there is an error
        renderAlert(err.response.data);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
    });
};

/**
 * function to render categories and expenses
 * @param {number} userId the user's id
 */
const getCategoriesAll = userId => {
  axios
    .get(`/api/category/all/${userId}`)
    .then(res => {
      let grandTotal = 0;
      let goalTotal = 0;
      res.data.forEach(row => {
        let total = 0;
        goalTotal += parseFloat(row.goal);
        row.Expenses.forEach(expense => {
          total += parseFloat(expense.amount);
        });
        grandTotal += total;
        renderCategoryRow(row, total.toFixed(2));
        row.Expenses.forEach(expense => {
          total += parseFloat(expense.amount);
          renderExpenseRow(expense, row.name);
        });
      });

      renderTotalExpenses(grandTotal.toFixed(2), goalTotal.toFixed(2));
    })
    .catch(err => {
      console.log(err);
    });
};

// RENDER FUNCTIONS

/**
 * function to render the total expenses of all categories
 * @param {number} totalExpensesValue the total expense
 */
const renderTotalExpenses = (totalExpensesValue, totalExpenseGoal) => {
  const tr = $('<tr>', { class: 'bg-primary text-light' });
  const tdTotalExpenses = $('<td>', { class: 'font-weight-bold' }).text(
    'Total of Goals & Expenses:'
  );
  const tdTotalExpenseGoal = $('<td>', { class: 'font-weight-bold' }).text(`$${totalExpenseGoal}`);
  const tdTotalExpenseAmount = $('<td>', { class: 'font-weight-bold' }).text(
    `$${totalExpensesValue}`
  );
  const tdBlank1 = $('<td>');
  const tdBlank2 = $('<td>');

  totalExpenseGoal > totalExpensesValue
    ? tdTotalExpenseGoal.addClass('text-green')
    : tdTotalExpenseAmount.addClass('text-red');

  $('#tbody').append(tr);
  tr.append(tdTotalExpenses, tdTotalExpenseGoal, tdTotalExpenseAmount, tdBlank1, tdBlank2);
};

/**
 * function to render an expense row
 * @param {object} expenseData the expense object
 * @param {number} categoryName the name of the category
 */
const renderExpenseRow = (expenseData, categoryName) => {
  const tr = $('<tr>');
  const tdExpenseName = $('<td>', {
    class: 'pt-3 pl-4 description-' + expenseData.id,
    value: expenseData.description
  }).text(expenseData.description);
  const td = $('<td>', { class: 'pt-3' }).text('-');
  const tdExpenseAmount = $('<td>', {
    class: 'pt-3 amount-' + expenseData.id,
    value: expenseData.amount
  }).text(`$${expenseData.amount}`);
  const tdDate = $('<td>', {
    class: 'pt-3 date-' + expenseData.id,
    value: expenseData.date
  }).text(expenseData.date);
  const tdButtons = $('<td>');
  const editButton = $('<i>', {
    class: 'fas fa-edit fa-1x font-weight-bold icon-blue mx-1 pt-2 edit-button',
    editId: expenseData.id,
    categoryValue: categoryName
  });
  const deleteButton = $('<i>', {
    class: 'fas fa-trash fa-1x font-weight-bold icon-red mx-1 pt-2 float-right delete-button',
    deleteId: expenseData.id
  });

  // append to html
  $('#tbody').append(tr);
  tr.append(tdExpenseName, td, tdExpenseAmount, tdDate, tdButtons);
  tdButtons.append(editButton, deleteButton);
};

/**
 * function to render category rows
 * @param {object} categoryData an object that contains the category data from the response
 * @param {number} totalExpenseCat the total expense of the category
 */
const renderCategoryRow = (categoryData, totalExpenseCat) => {
  const tBody = $('<tbody>');
  const tr = $('<tr>', { class: 'bg-secondary text-white' });
  const tdCategoryName = $('<td>', { class: 'pt-3' }).text(categoryData.name);
  const tdCategoryGoal = $('<td>', { class: 'pt-3' }).text(`$${categoryData.goal}`);
  const tdCategoryTotal = $('<td>', { class: 'pt-3' }).text(`$${totalExpenseCat}`);
  const tdBlank = $('<td>', { class: 'pt-3' });
  const tdButtons = $('<td>');
  const categoryEditButton = $('<i>', {
    class: 'fas fa-edit fa-1x font-weight-bold icon-blue mx-1 pt-2 edit-category-button',
    editId: categoryData.id,
    categoryValue: categoryData.name,
    goalValue: categoryData.goal
  });
  const categoryDeleteButton = $('<i>', {
    class:
      'fas fa-trash fa-1x font-weight-bold icon-red mx-1 pt-2 float-right delete-category-button',
    deleteId: categoryData.id
  });

  categoryData.goal > totalExpenseCat
    ? tdCategoryGoal.addClass('text-green font-weight-bold')
    : tdCategoryTotal.addClass('text-red font-weight-bold');

  categoryData.goal < totalExpenseCat
    ? tdCategoryGoal.removeClass('text-green font-weight-bold')
    : tdCategoryTotal.removeClass('text-red font-weight-bold');

  // append to html
  $('#tbody').append(tBody, tr);
  tr.append(tdCategoryName, tdCategoryGoal, tdCategoryTotal, tdBlank, tdButtons);
  tdButtons.append(categoryEditButton, categoryDeleteButton);
};

// function to render date filter modals
const filterDateClicked = () => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 1]
  );

  renderModal('Filter by Date', userId);
};

// function to create a cateogry
const createCategory = () => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 1]
  );

  renderModal('Create Category', userId);
};

// function to create an expense
const createExpense = () => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 1]
  );

  renderModal('Create Expense', userId);
};

// function to pass current data to a modal
function editExpenseClicked() {
  const editId = parseInt($(this).attr('editId')); // get the edit button id
  const description = $(`.description-${editId}`).attr('value'); // get the description
  const amount = parseFloat($(`.amount-${editId}`).attr('value')); // get the amount
  const date = $(`.date-${editId}`).attr('value'); // get the amount
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 1]
  );
  const categoryValue = $(this).attr('categoryValue'); // get the category text

  renderModal('Edit Expense', userId, {
    description,
    amount,
    date,
    categoryValue,
    editId
  });
}

// function to pass current data to a modal
function deleteExpenseClicked() {
  const deleteId = parseInt($(this).attr('deleteId'));
  renderConfirmationModal('Are you sure you want to delete the Expense?', () => {
    deleteExpense(deleteId);
  });
}

// function to pass current data to a modal
function deleteCategoryClicked() {
  const deleteId = parseInt($(this).attr('deleteId'));
  renderConfirmationModal('Are you sure you want to delete the category?', () => {
    deleteCategory(deleteId);
  });
}

$(document).ready(() => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 1]
  );

  // render the table
  getCategoriesAll(userId);

  // click listeners
  $(document).on('click', '.delete-category-button', deleteCategoryClicked);
  $(document).on('click', '.edit-button', editExpenseClicked);
  $(document).on('click', '.delete-button', deleteExpenseClicked);
  $(document).on('click', '.create-category', createCategory);
  $(document).on('click', '.create-expense', createExpense);
  $(document).on('click', '.filter-date', filterDateClicked);
});
