/**
 * function to render date filter modals
 * @param {number} userId the user's id
 * @param {string} option the option to determine which function to run when the modal is submitted
 */
const filterDateClicked = (userId, option) => {
  renderModal('Filter by Date', userId, option);
};

// function to pass current data to a modal
function editIncomeClicked() {
  const userIncome = $('#income')
    .val()
    .trim();
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  );

  renderModal('Edit Income', userId, { income: userIncome });
}

// function to pass current data to a modal
function editCategoryClicked() {
  const editId = parseInt($(this).attr('editId')); // get the edit button id
  const categoryValue = $(this).attr('categoryValue'); // get the category text
  const goalValue = parseFloat($(this).attr('goalValue')); // get the goal value
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  );

  renderModal('Edit Category', userId, { categoryValue, goalValue, editId });
}

// function to pass current data to a modal
function editExpenseClicked() {
  const editId = parseInt($(this).attr('editId')); // get the edit button id
  const description = $(`.description-${editId}`).attr('value'); // get the description
  const amount = parseFloat($(`.amount-${editId}`).attr('value')); // get the amount
  const date = $(`.date-${editId}`).attr('value'); // get the amount
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
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

// function to create a cateogry
const createCategory = () => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  );

  renderModal('Create Category', userId);
};

// function to create an expense
const createExpense = () => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  );

  renderModal('Create Expense', userId);
};

// function to pass current data to a modal
function deleteCategoryClicked() {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  );

  const deleteId = parseInt($(this).attr('deleteId'));

  renderConfirmationModal('Are you sure you want to delete the category?', () => {
    deleteCategory(userId, deleteId);
  });
}

// function to pass current data to a modal
function deleteExpenseClicked() {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  );

  const deleteId = parseInt($(this).attr('deleteId'));

  renderConfirmationModal('Are you sure you want to delete the Expense?', () => {
    deleteExpense(userId, deleteId);
  });
}
