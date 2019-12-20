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
  const tdTotalExpenses = $("<td>").text("Total of Goals & Expenses:");
  const tdTotalExpenseAmount = $("<td>").text(totalExpensesValue);
  const tdTotalExpenseGoal = $("<td>").text(totalExpenseGoal);

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
    class: "description-" + expenseData.id
  }).text(expenseData.description);
  const td = $("<td>").text("-");
  const tdExpenseAmount = $("<td>", { class: "amount-" + expenseData.id }).text(
    expenseData.amount
  );
  const editButton = $("<div>", {
    class: "btn btn-dark mx-1 mt-2 float-right text-white edit-button",
    editId: expenseData.id,
    categoryValue: categoryName
  }).text("Edit");
  const deleteButton = $("<div>", {
    class: "btn btn-dark mx-1 mt-2 float-right text-white delete-button",
    deleteId: expenseData.id
  }).text("Del.");

  // append to html
  $("#tbody").append(tr);
  tr.append(tdExpenseName, td, tdExpenseAmount, deleteButton, editButton);
};

/**
 * function to render category rows
 * @param {object} categoryData an object that contains the category data from the response
 * @param {number} totalExpenseCat the total expense of the category
 */
const renderCategoryRow = (categoryData, totalExpenseCat) => {
  const tBody = $("<tbody>");
  const tr = $("<tr>", { class: "bg-dark text-white" });
  const tdCategoryName = $("<td>", { class: "bold" }).text(categoryData.name);
  const tdCategoryGoal = $("<td>").text(categoryData.goal);
  const tdCategoryTotal = $("<td>").text(totalExpenseCat);
  const categoryEditButton = $("<div>", {
    class:
      "btn btn-white text-white mx-1 mt-2 float-right edit-category-button",
    editId: categoryData.id,
    categoryValue: categoryData.name,
    goalValue: categoryData.goal
  }).text("Edit");
  const categoryDeleteButton = $("<div>", {
    class:
      "btn btn-white text-white mx-1 mt-2 float-right delete-category-button",
    deleteId: categoryData.id
  }).text("Del.");

  // append to html
  $("#tbody").append(tBody, tr);
  tr.append(
    tdCategoryName,
    tdCategoryGoal,
    tdCategoryTotal,
    categoryDeleteButton,
    categoryEditButton
  );
};

$(document).ready(() => {
  console.log("expense.js script loaded");
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  getCategoriesAll(1);
});
