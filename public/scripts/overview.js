// API REQUESTS

/**
 * function to calculate and render the remainder
 * @param {number} userId the user's id
 */
const getRemainder = userId => {
  axios
    .get(`/api/remainder/${userId}`)
    .then(res => {
      res.data.forEach(remainder => {
        renderRemainderRow(remainder);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function to get total category goal and total expense
 * @param {number} userId the user's id
 * @param {startDate} startDate the start date
 * @param {endDate} endDate the end date
 */
const getOverviewByDate = (userId, startDate, endDate) => {
  axios
    .get(`/api/category/all/${userId}/${startDate}/${endDate}`)
    .then(res => {
      let spentTotal = 0;
      let goalTotal = 0;

      // if there wasn't any data for that date range
      if (res.data.length === 0) {
        renderAlert('No expenses found...');
        return;
      }

      $('#tbody').empty(); // empty the table
      $('#modal').remove();

      res.data.forEach(category => {
        goalTotal += parseFloat(category.goal);
        let categoryTotalSpent = 0;

        category.Expenses.forEach(expense => {
          spentTotal += parseFloat(expense.amount);
          categoryTotalSpent += parseFloat(expense.amount);
        });
        renderCategoryRow(category, categoryTotalSpent.toFixed(2));
      });
      renderTotals(parseFloat(goalTotal).toFixed(2), spentTotal.toFixed(2));
      getRemainder(userId);
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function to get all category and expense totals
 * @param {number} userId the user's id
 */
const getOverview = userId => {
  let spentTotal = 0;
  let goalTotal = 0;
  axios
    .get(`/api/category/all/${userId}`)
    .then(res => {
      res.data.forEach(category => {
        goalTotal += parseFloat(category.goal);
        let categoryTotalSpent = 0;
        // calculate the sum of expenses for each category
        category.Expenses.forEach(expense => {
          spentTotal += parseFloat(expense.amount);
          categoryTotalSpent += parseFloat(expense.amount);
        });
        renderCategoryRow(category, categoryTotalSpent.toFixed(2));
      });
      renderTotals(parseFloat(goalTotal).toFixed(2), spentTotal.toFixed(2));
      getRemainder(userId);
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function to update the user's income
 * @param {number} userId the user's id
 * @param {number} income the uesr's new income
 */
const updateUserIncome = (userId, income) => {
  // make put request to update a single category
  axios
    .put(`/api/user/income/${userId}`, { income })
    .then(res => {
      location.reload();
    })
    .catch(error => {
      if (error.response) {
        // render alert if there is an error
        renderAlert(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
};

/**
 * function to calculate and render the income
 * @param {number} userId the user's id
 */
const getIncome = userId => {
  axios
    .get(`/api/user/${userId}`)
    .then(res => {
      renderIncome(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// RENDER FUNCTIONS

/**
 * function to render the category and expense total
 * @param {number} categoryTotal the category total
 * @param {number} expenseTotal the expense total
 */
const renderTotals = (categoryTotal, expenseTotal) => {
  // calculate over under
  const overUnder = parseFloat(categoryTotal - expenseTotal).toFixed(2);

  const tr = $('<tr>', { class: 'bg-secondary text-light' });
  const tdCategoryName = $('<td>').text('Totals');
  const tdCategoryGoalTotal = $('<td>').text('$' + categoryTotal);
  const tdExpenseTotal = $('<td>').text('$' + expenseTotal);
  const tdOverUnder = $('<td>').text(
    overUnder < 0 ? '-$' + Math.abs(overUnder).toFixed(2) : '$' + overUnder
  );
  const tdBlank = $('<td>').text('');

  setTextColor(overUnder, 0, tdOverUnder);

  $('#tbody').append(tr);
  tr.append(tdCategoryName, tdCategoryGoalTotal, tdExpenseTotal, tdOverUnder, tdBlank);
};

/**
 * function to render category rows
 * @param {object} categoryData an object that contains the category data from the response
 * @param {number} totalExpenseCat the total expense for the category
 */
const renderCategoryRow = (categoryData, totalExpenseCat) => {
  const overUnder = parseFloat(categoryData.goal - totalExpenseCat).toFixed(2);
  const tr = $('<tr>', { class: 'category-row' });
  const tdCategoryName = $('<td>', { class: 'pt-3' }).text(categoryData.name);
  const tdCategoryGoal = $('<td>', { class: 'pt-3' }).text('$' + categoryData.goal);
  const tdCategoryTotal = $('<td>', { class: 'pt-3' }).text('$' + totalExpenseCat);
  const tdOverUnder = $('<td>', { class: 'pt-3' }).text(
    overUnder < 0 ? '-$' + Math.abs(overUnder).toFixed(2) : '$' + overUnder
  );
  const tdButtons = $('<td>');
  const editButton = $('<i>', {
    class: 'fas fa-edit fa-1x font-weight-bold icon-blue mx-1 pt-2 edit-category-button',
    editId: categoryData.id,
    categoryId: categoryData.id,
    categoryValue: categoryData.name,
    goalValue: categoryData.goal
  });

  setTextColor(overUnder, 0, tdOverUnder);

  $('#tbody').append(tr);
  tr.append(tdCategoryName, tdCategoryGoal, tdCategoryTotal, tdOverUnder, tdButtons);
  tdButtons.append(editButton);
};

/**
 * function to render a row containing the remainder
 * @param {object} remainderData the response from the API containing the remainder
 */
const renderRemainderRow = remainderData => {
  const remainder = (
    parseFloat(remainderData.income) - parseFloat(remainderData.remainder)
  ).toFixed(2);

  const tr = $('<tr>');
  const tdIncomeLeft = $('<td>').text('Income Left');
  const tdBlank0 = $('<td>').text('');
  const tdRemainder = $('<td>').text(
    remainderData.remainder === null
      ? 'N/A'
      : remainder < 0
      ? '-$' + Math.abs(remainder).toFixed(2)
      : '$' + remainder
  );
  const tdBlank1 = $('<td>').text('');
  const tdBlank2 = $('<td>').text('');

  setTextColor(remainder, 0, tdRemainder);

  $('#tbody').append(tr);
  tr.append(tdIncomeLeft, tdRemainder, tdBlank0, tdBlank1, tdBlank2);
};

/**
 * function to render the user's income
 * @param {object} userData an object that contains the user data from the response
 */
const renderIncome = userData => {
  $('#income').val(userData.income);
  $('#income').attr('value', userData.income);
};

/**
 * function to set the text color of the element
 * @param {number} valueOne the first value used for comparision
 * @param {number} valueTwo the second value used for comparision
 * @param {object} element the element to set the text color
 */
const setTextColor = (valueOne, valueTwo, element) => {
  valueOne < valueTwo
    ? element.addClass('text-red font-weight-bold')
    : element.addClass('text-green font-weight-bold');
};

$(document).ready(() => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  );

  getIncome(userId);
  getOverview(userId);

  $(document).on('click', '#income', updateIncomeClicked);
  $(document).on('click', '.edit-category-button', editCategoryClicked);
  $(document).on('click', '.filter-date', () => {
    filterDateClicked('Overview');
  });
});
