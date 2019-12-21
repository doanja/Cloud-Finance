// API REQUESTS

/**
 * function to update the user's income
 * @param {number} userId the user's id
 * @param {number} income the uesr's new income
 */
const updateUserIncome = (userId, income) => {
  // make put request to update a single category
  axios.put(`/api/user/income/${userId}`, { income }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to calculate and render the income
 * @param {number} userId the user's id
 */
const getIncome = userId => {
  axios.get(`/api/user/${userId}`).then(res => {
    setIncome(res.data);
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to get all category and expense totals
 * @param {number} userId the user's id
 */
const getBudgetCategories = userId => {
  axios.get(`/api/category/all/${userId}`).then(res => {
    res.data.forEach(category => {
      let categoryTotal = 0;
      // calculate the sum of expenses for each category
      category.Expenses.forEach(expense => {
        categoryTotal += parseFloat(expense.amount);
      });
      renderCategoryRow(category, categoryTotal.toFixed(2));
    });
    getBudgetCategoriesTotals(userId);
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to get total category goal and total expense
 * @param {number} userId the user's id
 */
const getBudgetCategoriesTotals = userId => {
  let expenseTotal = 0;
  let categoryTotal = 0;
  axios.get(`/api/category/all/${userId}`).then(res => {
    res.data.forEach(category => {
      categoryTotal += parseFloat(category.goal);
      category.Expenses.forEach(expense => {
        expenseTotal += parseFloat(expense.amount);
      });
    });
    renderTotals(parseFloat(categoryTotal).toFixed(2), expenseTotal.toFixed(2));
    getRemainder(userId);
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to calculate and render the remainder
 * @param {number} userId the user's id
 */
const getRemainder = userId => {
  axios.get(`/api/remainder/${userId}`).then(res => {
    res.data.forEach(remainder => {
      renderRemainderRow(remainder);
    });
  }),
    err => {
      console.log(err);
    };
};

// RENDER FUNCTIONS

/**
 * function to render category rows
 * @param {object} categoryData an object that contains the category data from the response
 * @param {number} totalExpenseCat the total expense for the category
 */
const renderCategoryRow = (categoryData, totalExpenseCat) => {
  const overUnder = categoryData.goal - totalExpenseCat;
  const tr = $("<tr>");
  const tdCategoryName = $("<td>", { class: "pt-3" }).text(categoryData.name);
  const tdCategoryGoal = $("<td>", { class: "pt-3" }).text("$" + categoryData.goal);
  const tdCategoryTotal = $("<td>", { class: "pt-3" }).text("$" + totalExpenseCat);
  const tdOverUnder = $("<td>", { class: "pt-3" }).text("$" + parseFloat(overUnder).toFixed(2));
  const tdButtons = $("<td>");
  const editButton = $("<i>", {
    class: "fas fa-edit fa-1x font-weight-bold icon-blue mx-1 pt-2 edit-category-button",
    editId: categoryData.id,
    categoryId: categoryData.id,
    categoryValue: categoryData.name,
    goalValue: categoryData.goal
  });

  $("#tbody").append(tr);
  tr.append(tdCategoryName, tdCategoryGoal, tdCategoryTotal, tdOverUnder, tdButtons);
  tdButtons.append(editButton);
};

/**
 * function to render the category and expense total
 * @param {number} categoryTotal the category total
 * @param {number} expenseTotal the expense total
 */
const renderTotals = (categoryTotal, expenseTotal) => {
  const overUnder = categoryTotal - expenseTotal;
  const tr = $("<tr>");
  const tdCategoryName = $("<td>").text("Totals");
  const tdCategoryGoalTotal = $("<td>").text("$" + categoryTotal);
  const tdExpenseTotal = $("<td>").text("$" + expenseTotal);
  const tdOverUnder = $("<td>").text("$" + parseFloat(overUnder).toFixed(2));
  const tdBlank = $("<td>").text("");

  $("#tbody").append(tr);
  tr.append(tdCategoryName, tdCategoryGoalTotal, tdExpenseTotal, tdOverUnder, tdBlank);
};

/**
 * function to render a row containing the remainder
 * @param {object} remainderData the response from the API containing the remainder
 */
const renderRemainderRow = remainderData => {
  const tr = $("<tr>");
  const tdIncomeLeft = $("<td>").text("Income Left");
  const tdBlank0 = $("<td>").text("");
  const tdRemainder = $("<td>").text(
    remainderData.remainder === null
      ? "N/A"
      : "$" + (parseFloat(remainderData.income) - parseFloat(remainderData.remainder)).toFixed(2)
  );
  const tdBlank1 = $("<td>").text("");
  const tdBlank2 = $("<td>").text("");

  $("#tbody").append(tr);
  tr.append(tdIncomeLeft, tdBlank0, tdRemainder, tdBlank1, tdBlank2);
};

/**
 * function to render the user's income
 * @param {object} userData an object that contains the user data from the response
 */
const setIncome = userData => {
  $("#income").val(userData.income);
  $("#income").attr("value", userData.income);
};

// function to pass current data to a modal
function updateIncomeClicked() {
  const userIncome = parseFloat($("#income").val());
  // const userId = parseInt(
  //   window.location.href.split("/")[window.location.href.split("/").length - 1]
  // );
  const userId = 1;

  renderConfirmationModal("Are you sure you want to update your income?", () => {
    updateUserIncome(userId, userIncome);
  });
}

$(document).ready(() => {
  const userId = 1; //parseInt(window.location.href.split("/")[window.location.href.split("/").length - 1]);

  getIncome(userId);
  getBudgetCategories(userId);
  $(document).on("click", ".update-income-button", updateIncomeClicked);
});
