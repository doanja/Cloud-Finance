/**
 * function update a category
 * @param {number} id the id of the category
 * @param {string} name the description of the category
 * @param {number} goal the amount of the category
 */
const updateCategory = (id, name, goal) => {
  // make put request to update a single category
  axios
    .put(`/api/category/`, { id, name, goal })
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
 * @param {number} categoryId the id of the expense to be deleted
 */
const deleteCategory = categoryId => {
  // send delete request to delete a single expense
  axios
    .delete(`/api/category/${categoryId}`)
    .then(res => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
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
 * function to delete a single expense
 * @param {number} expenseId the id of the expense to be deleted
 */
const deleteExpense = expenseId => {
  // send delete request to delete a single expense
  axios
    .delete(`/api/expense/${expenseId}`)
    .then(res => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};

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
      const dropdown = renderDropdown('categories');

      // for each category, create a dropdown option
      res.data.forEach(row => {
        dropdown.append(renderDropdownCategories(row.name, row.id));
      });

      // set defaults for the value if one is defined
      if (defaultValue !== undefined) {
        dropdown.val(defaultValue);
      }

      // append it to the modal
      $(parentElement).append(dropdown);
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function to update the expense by sending a put request
 * @param {number} expenseId the id of the expense
 * @param {string} description the description of the expense
 * @param {number} amount the amount of the expense
 * @param {number} CategoryId the id of the category
 */
const updateExpense = (expenseId, description, amount, date, CategoryId) => {
  // make put request to update a single expense
  axios
    .put(`/api/expense/${expenseId}`, { description, amount, date, CategoryId })
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
 * @param {string} amount the expense amount
 * @param {string} description the expense description
 * @param {number} CategoryId the id of the category
 */
const postExpense = (amount, description, date, CategoryId, config) => {
  // send post request to create a single expense
  axios
    .post(`/api/expense/`, { amount, description, date, CategoryId })
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

$(document).ready(() => {
  const token = localStorage.getItem('token');
  console.log(token);

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
});
