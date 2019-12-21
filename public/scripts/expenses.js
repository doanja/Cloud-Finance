// API REQUESTS

/**
 * function to render categories and expenses
 * @param {number} userId the user's id
 */
const getCategoriesAll = userId => {
  axios.get(`/api/category/all/${userId}`).then(res => {
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
  }),
    err => {
      console.log(err);
    };
};

// RENDER FUNCTIONS

/**
 * function to render the total expenses of all categories
 * @param {number} totalExpensesValue the total expense
 */
const renderTotalExpenses = (totalExpensesValue, totalExpenseGoal) => {
  const tr = $("<tr>");
  const tdTotalExpenses = $("<td>", { class: "font-weight-bold" }).text(
    "Total of Goals & Expenses:"
  );
  const tdTotalExpenseAmount = $("<td>", { class: "font-weight-bold" }).text(
    `$${totalExpensesValue}`
  );
  const tdTotalExpenseGoal = $("<td>", { class: "font-weight-bold" }).text(
    `$${totalExpenseGoal}`
  );

  $("#tbody").append(tr);
  tr.append(tdTotalExpenses, tdTotalExpenseGoal, tdTotalExpenseAmount);
};

/**
 * function to render an expense row
 * @param {object} expenseData the expense object
 * @param {number} categoryName the name of the category
 */
const renderExpenseRow = (expenseData, categoryName) => {
  const tr = $("<tr>");
  const tdExpenseName = $("<td>", {
    class: "pt-3 description-" + expenseData.id,
    value: expenseData.description
  }).text(expenseData.description);
  const td = $("<td>", { class: "pt-3" }).text("-");
  const tdExpenseAmount = $("<td>", {
    class: "pt-3 amount-" + expenseData.id,
    value: expenseData.amount
  }).text(`$${expenseData.amount}`);
  const tdDate = $("<td>", {
    class: "pt-3 date-" + expenseData.id,
    value: expenseData.date
  }).text(expenseData.date);
  const tdButtons = $("<td>");
  const editButton = $("<i>", {
    class: "fas fa-edit fa-1x font-weight-bold icon-blue mx-1 pt-2 edit-button",
    editId: expenseData.id,
    categoryValue: categoryName
  });
  const deleteButton = $("<i>", {
    class:
      "fas fa-trash fa-1x font-weight-bold icon-red mx-1 pt-2 float-right delete-button",
    deleteId: expenseData.id
  });

  // append to html
  $("#tbody").append(tr);
  tr.append(tdExpenseName, td, tdExpenseAmount, tdDate, tdButtons);
  tdButtons.append(editButton, deleteButton);
};

/**
 * function to render category rows
 * @param {object} categoryData an object that contains the category data from the response
 * @param {number} totalExpenseCat the total expense of the category
 */
const renderCategoryRow = (categoryData, totalExpenseCat) => {
  const tBody = $("<tbody>");
  const tr = $("<tr>", { class: "bg-secondary text-white" });
  const tdCategoryName = $("<td>", { class: "pt-3" }).text(categoryData.name);
  const tdCategoryGoal = $("<td>", { class: "pt-3" }).text(
    `$${categoryData.goal}`
  );
  const tdCategoryTotal = $("<td>", { class: "pt-3" }).text(
    `$${totalExpenseCat}`
  );
  const tdBlank = $("<td>", { class: "pt-3" });
  const tdButtons = $("<td>");
  const categoryEditButton = $("<i>", {
    class:
      "fas fa-edit fa-1x font-weight-bold icon-blue mx-1 pt-2 edit-category-button",
    editId: categoryData.id,
    categoryValue: categoryData.name,
    goalValue: categoryData.goal
  });
  const categoryDeleteButton = $("<i>", {
    class:
      "fas fa-trash fa-1x font-weight-bold icon-red mx-1 pt-2 float-right delete-category-button",
    deleteId: categoryData.id
  });

  // append to html
  $("#tbody").append(tBody, tr);
  tr.append(
    tdCategoryName,
    tdCategoryGoal,
    tdCategoryTotal,
    tdBlank,
    tdButtons
  );
  tdButtons.append(categoryEditButton, categoryDeleteButton);
};

$(document).ready(() => {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  getCategoriesAll(1);
});
