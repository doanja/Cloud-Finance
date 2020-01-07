/**
 * function to get all categories and append a dropdown the the parent element
 * @param {number} userId the id of the user
 * @param {string} parentElement the element to append this to
 * @param {string} defaultValue the default value for the dropdown
 */
const getCategories = (userId, parentElement, defaultValue) => {
  // send get request to retrieve all categories
  axios
    .get(`/api/category/${userId}`)
    .then(res => {
      // render dropdown button
      const formGroup = $('<div>', { class: 'form-group' });
      const label = $('<label>', { for: 'Category' }).text('Category');
      const dropdown = renderDropdown('categories');

      formGroup.append(label, dropdown);

      if (res.data.length === 0) {
        renderAlert(
          'You must create a category before creating an expense.',
          '.modal-body',
          'alert-danger',
          'Click here to create a category.'
        );
      } else {
        // for each category, create a dropdown option
        res.data.forEach(row => {
          dropdown.append(renderDropdownCategories(row.name, row.id));
        });

        // set defaults for the value if one is defined
        if (defaultValue !== undefined) {
          dropdown.val(defaultValue);
        }
      }

      // append it to the modal
      $(parentElement).append(formGroup);
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function update a category
 * @param {number} userId the id of the user
 * @param {number} id the id of the category
 * @param {string} name the description of the category
 * @param {number} goal the amount of the category
 */
const updateCategory = (userId, id, name, goal) => {
  // make put request to update a single category
  axios
    .put(`/api/category/${userId}`, { id, name, goal })
    .then(res => {
      location.reload();
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
 * function to update the expense by sending a put request
 * @param {number} userId the id of the user
 * @param {number} expenseId the id of the expense
 * @param {string} description the description of the expense
 * @param {number} amount the amount of the expense
 * @param {number} CategoryId the id of the category
 */
const updateExpense = (userId, expenseId, description, amount, date, CategoryId) => {
  // make put request to update a single expense
  axios
    .put(`/api/expense/${userId}`, { expenseId, description, amount, date, CategoryId })
    .then(res => {
      location.reload();
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
 * function to create a new category
 * @param {number} userId the id of the user
 * @param {string} name the name of the category
 * @param {string} goal the goal of the category
 */
const postCategory = (userId, name, goal) => {
  // send post request to create a single category
  axios
    .post(`/api/category/${userId}`, { name, goal })
    .then(res => {
      location.reload();
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
 * function to create a new expense
 * @param {number} userId the id of the user
 * @param {string} amount the expense amount
 * @param {string} description the expense description
 * @param {number} CategoryId the id of the category
 */
const postExpense = (userId, amount, description, date, CategoryId) => {
  // send post request to create a single expense
  axios
    .post(`/api/expense/${userId}`, { amount, description, date, CategoryId })
    .then(res => {
      location.reload();
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
 * function to delete a single category
 * @param {number} userId the id of the user
 * @param {number} categoryId the id of the expense to be deleted
 */
const deleteCategory = (userId, categoryId) => {
  // send delete request to delete a single expense
  axios
    .delete(`/api/category/${userId}/${categoryId}`)
    .then(res => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function to delete a single expense
 * @param {number} userId the id of the user
 * @param {number} expenseId the id of the expense to be deleted
 */
const deleteExpense = (userId, expenseId) => {
  // send delete request to delete a single expense
  axios
    .delete(`/api/expense/${userId}/${expenseId}`)
    .then(res => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};
