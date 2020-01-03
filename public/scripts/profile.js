// API REQUESTS

/**
 * function to get the user's information
 * @param {number} userId the user's id
 */
const getUserInfo = userId => {
  axios
    .get(`/api/user/${userId}`)
    .then(res => {
      renderFormField('First name', 'text', 'fname', res.data.firstName);
      renderFormField('Last name', 'text', 'lname', res.data.lastName);
      renderButtons();
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function to update the user's information
 * @param {number} userId the user's id
 * @param {string} firstName the user's first name
 * @param {string} lastName the user's last name
 */
const updateUser = (userId, firstName, lastName) => {
  axios
    .put(`/api/user/${userId}`, { firstName, lastName })
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

// RENDER FUNCTIONS

// function to render the submit button
const renderButtons = () => {
  // create html elements
  const formGroup = $('<div>', { class: 'btn-group w-100' });
  const resetButton = $('<button>', {
    class: 'btn btn-outline-primary',
    type: 'button',
    id: 'reset-button'
  }).text('Reset');
  const editButton = $('<button>', {
    class: 'btn btn-primary',
    type: 'button',
    id: 'edit-button'
  }).text('Edit');

  // append and render html elements
  $('.wrap').append(formGroup);
  formGroup.append(resetButton, editButton);
};

const renderFormField = (text, type, elementId, value) => {
  // create html elements
  const formGroup = $('<div>', { class: 'form-group' });
  const label = $('<label>', { for: type }).text(text);
  const input = $('<input>', {
    class: 'form-control profile-form',
    type: type,
    id: elementId
  }).val(value);

  // append and render html elements
  $('.wrap').append(formGroup);
  formGroup.append(label, input);
};

/**
 * function to parse the form and update the uesr's information
 */
const parseFormData = userId => {
  const firstName = $('#fname').val();
  const lastName = $('#lname').val();

  renderModal('Edit Profile', userId, { firstName, lastName });
};

$(document).ready(() => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 2]
  );

  // grab the jwt token from local storage
  const token = localStorage.getItem('token');

  // set all axios requests headers
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  // get the user's information from the url
  getUserInfo(userId);

  //  listen for form submission
  $(document).on('click', '#edit-button', () => {
    parseFormData(userId);
  });
  $(document).on('click', '#fname', () => {
    parseFormData(userId);
  });
  $(document).on('click', '#lname', () => {
    parseFormData(userId);
  });
  $(document).on('click', '#reset-button', () => {
    location.reload();
  });
});
