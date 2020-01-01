const renderAlert = (text, parentElement = '.modal-body') => {
  const alert = $('<div>', {
    class: 'alert alert-danger alert-dismissible fade show',
    role: 'alert'
  });
  const alertText = $('<strong>').text(text);
  const dismissButton = $('<button>', {
    type: 'button',
    class: 'close',
    'data-dismiss': 'alert',
    'aria-label': 'Close'
  });
  const dismissIcon = $('<span>', { 'aria-hidden': true }).text('\u{2A2F}');

  $(parentElement).prepend(alert);
  alert.append(alertText, dismissButton);
  dismissButton.append(dismissIcon);
};

/**
 * function to render a confirmation modal when delete is clicked
 * @param {string} title the title to go in the modal
 * @param {function} callback the function to be executed when submit is clicked
 */
const renderConfirmationModal = (title, callback) => {
  // create the elements
  const modalFade = $('<div>', { id: 'modal' }).css('z-index', 50);
  const modalDiaglogue = $('<div>', { class: 'modal-dialog' });
  const modalContent = $('<div>', { class: 'modal-content' });
  const modalHeader = $('<div>', { class: 'modal-header' });
  const modalTitle = $('<h5>', { class: 'modal-title text-primary' }).text(title);
  const modalprefooter = $('<div>', { class: 'modal-footer' });
  const button = $('<button>', {
    class: 'btn btn-primary',
    id: 'modal-button'
  }).text('Cancel');
  const submit = $('<button>', {
    class: 'btn btn-outline-primary',
    id: 'modal-submit'
  }).text('Confirm');

  // append and render the elements
  $('#main-container').prepend(modalFade);
  modalFade.append(modalDiaglogue);
  modalDiaglogue.append(modalContent);
  modalContent.append(modalHeader, modalprefooter);
  modalHeader.append(modalTitle);
  modalprefooter.append(button, submit);

  // listen when to close the modal
  closeModalOn();

  // listen for form submission
  $('#modal-submit').click(() => {
    callback();
  });
};

/**
 * function to render list of categories
 * @param {string} text the name of each category
 * @param {object} elementId the dom element containing the category
 */
const renderDropdownCategories = (text, elementId) => {
  // create the element
  return $('<option>', {
    class: `bg-white text-primary`,
    categoryId: elementId,
    value: text
  }).text(text);
};

/**
 * function to render the drop down filter
 * @param {string} elementId the id of this element
 * @return {object} the category dropdown
 */
const renderDropdown = elementId => {
  // create the element
  return $('<select>', {
    class: 'form-control w-100 mt-3 bg-primary text-white',
    id: elementId
  });
};

/**
 * function to render form input with prefilled text
 * @param {string} labelType the label for the input
 * @param {string} elementId the id of the input field
 * @param {string} inputText the text to be displayed in the input
 * @return {object} the form group
 */
const renderModalFormFields = (labelType, elementId, inputText, inputType = 'test') => {
  // create the elements
  const formGroup = $('<div>', { class: 'form-group' });
  const label = $('<label>', { for: labelType }).text(labelType);
  const input = $('<input>', {
    type: inputType,
    class: 'form-control text-left',
    id: elementId
  }).val(inputText);

  // append elements
  formGroup.append(label, input);

  return formGroup;
};

/**
 * function to render the modal
 * @param {string} title the title to go in the modal
 * @param {string} userId the id of the the user
 * @param {object} data the object containing fields for the category or expense
 */
const renderModal = (title, userId, data) => {
  // create the elements
  const modalFade = $('<div>', { id: 'modal' }).css('z-index', 5);
  const modalDiaglogue = $('<div>', { class: 'modal-dialog' });
  const modalContent = $('<div>', { class: 'modal-content' });
  const modalHeader = $('<div>', { class: 'modal-header' });
  const modalBody = $('<div>', { class: 'modal-body' });
  const modalTitle = $('<h5>', { class: 'modal-title text-primary' }).text(title);
  const modalprefooter = $('<div>', { class: 'modal-footer' });
  const button = $('<button>', {
    class: 'btn btn-outline-primary',
    id: 'modal-button'
  }).text('Cancel');
  const submit = $('<button>', {
    class: 'btn btn-primary',
    id: 'modal-submit'
  }).text('Submit');

  // append and render the elements
  $('#main-container').prepend(modalFade);
  modalFade.append(modalDiaglogue);
  modalDiaglogue.append(modalContent);
  modalContent.append(modalHeader, modalBody, modalprefooter);
  modalHeader.append(modalTitle);
  modalprefooter.append(button, submit);

  renderModalContent(title, userId, data, modalBody);

  // listen when to close the modal
  closeModalOn();

  // listen for form submission
  $('#modal-submit').click(() => {
    modalSubmitOn(title, userId, data);
  });
};

/**
 * function to render the modal form and append it to the modal
 * @param {string} title the title to go in the modal
 * @param {string} userId the id of the the user
 * @param {object} data the object containing fields for the category or expense
 * @param {object} modalBody the object to append this to
 */
const renderModalContent = (title, userId, data, modalBody) => {
  // determine the form to render in the modal body
  switch (title) {
    case 'Edit Expense':
      // render categories and append it to .modal-body
      getCategories(userId, '.modal-body', data.categoryValue);

      // render form fields with prefilled text
      modalBody.append(
        renderModalFormFields('Description', 'modal-description', data.description),
        renderModalFormFields('Amount', 'modal-amount', data.amount),
        renderModalFormFields('Date', 'modal-date', data.date, 'date')
      );
      break;

    case 'Edit Category':
      // render form fields with prefilled text
      modalBody.append(
        renderModalFormFields('Category Name', 'modal-name', data.categoryValue),
        renderModalFormFields('Goal', 'modal-goal', data.goalValue)
      );
      break;

    case 'Create Category':
      // render form fields with prefilled text
      modalBody.append(
        renderModalFormFields('Category Name', 'modal-category', ''),
        renderModalFormFields('Goal', 'modal-goal', '')
      );
      break;

    case 'Create Expense':
      getCategories(userId, '.modal-body');

      // render form fields with prefilled text
      modalBody.append(
        renderModalFormFields('Description', 'modal-description', ''),
        renderModalFormFields('Amount', 'modal-amount', ''),
        renderModalFormFields('Date', 'modal-date', '', 'date')
      );
      break;

    case 'Edit Income':
      // render form fields with prefilled text
      modalBody.append(renderModalFormFields('Income', 'modal-income', data.income));
      break;

    case 'Edit Profile':
      // render form fields with prefilled text
      modalBody.append(
        renderModalFormFields('First name', 'modal-firstName', data.firstName),
        renderModalFormFields('Last name', 'modal-lastName', data.lastName)
      );
      break;

    case 'Filter by Date':
      // render form fields with prefilled text
      modalBody.append(
        renderModalFormFields('Start Date', 'modal-startDate', '', 'date'),
        renderModalFormFields('End Date', 'modal-endDate', '', 'date')
      );
      break;

    default:
      break;
  }
};

// function to close the modal
const closeModalOn = () => {
  // when the user clicks the close button in the modal, close modal
  $('#modal-button').click(() => {
    $('#modal').remove();
  });
};

/**
 * function to determine what the submit button does base on the option passed in
 * @param {string} option determines which case and what submit does
 * @param {string} userId the id of the the user
 * @param {object} data the object containing required fields for expense/category
 */
const modalSubmitOn = (option, userId, data) => {
  $('.alert ').remove(); // clear any alerts

  // determine what to the submit button does
  switch (option) {
    case 'Edit Expense':
      // grab the form fields from the modal
      const description = $('#modal-description')
        .val()
        .trim();
      const amount = $('#modal-amount')
        .val()
        .trim();
      const date = $('#modal-date')
        .val()
        .trim();
      const category = $('#categories option:selected').attr('categoryId');
      updateExpense(data.editId, description, amount, date, category);
      break;

    case 'Edit Category':
      // grab the form fields from the modal
      const name = $('#modal-name')
        .val()
        .trim();
      const goal = $('#modal-goal')
        .val()
        .trim();
      updateCategory(data.editId, name, goal);
      break;

    case 'Create Category':
      const categoryName = $('#modal-category')
        .val()
        .trim();
      const categoryGoal = $('#modal-goal')
        .val()
        .trim();
      postCategory(userId, categoryName, categoryGoal);
      break;

    case 'Create Expense':
      // grab the form fields from the modal
      const expenseDescription = $('#modal-description')
        .val()
        .trim();
      const expenseAmount = $('#modal-amount')
        .val()
        .trim();
      const expenseDate = $('#modal-date')
        .val()
        .trim();
      const expenseCategory = $('#categories option:selected').attr('categoryId');
      postExpense(expenseAmount, expenseDescription, expenseDate, expenseCategory);
      break;

    case 'Edit Income':
      // grab the form fields from the modal
      const income = $('#modal-income')
        .val()
        .trim();
      updateUserIncome(userId, income);
      break;

    case 'Edit Profile':
      // grab the form fields from the modal
      const firstName = $('#modal-firstName')
        .val()
        .trim();
      const lastName = $('#modal-lastName')
        .val()
        .trim();
      updateUser(userId, firstName, lastName);
      break;

    case 'Filter by Date':
      // grab the form fields from the modal
      const startDate = $('#modal-startDate')
        .val()
        .trim();
      const endDate = $('#modal-endDate')
        .val()
        .trim();

      // validate dates
      if (!isValidDate(startDate)) {
        renderAlert('Enter a valid Start Date');
      } else if (!isValidDate(endDate)) {
        renderAlert('Enter a valid End Date');
      } else {
        if (data === 'Expense') {
          getCategoriesAllByDate(userId, startDate, endDate);
        } else if (data === 'Overview') {
          getOverviewByDate(userId, startDate, endDate);
        } else {
          getTotalsByDate(userId, startDate, endDate);
        }
      }
      break;

    default:
      break;
  }
};
