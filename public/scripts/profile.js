// API REQUESTS

/**
 * function to update the user's password
 * @param {number} userId the user's id
 * @param {string} password the user's current password
 * @param {string} newPassword the user's new password
 */
const updatePassword = (userId, password, newPassword) => {
  axios
    .post(`/api/user/${userId}`, { password, newPassword })
    .then(res => {
      // clear modal fields
      $('.modal-body')
        .find('input:password')
        .val('');

      // render success message
      renderAlert(res.data.msg, '.modal-body', 'alert-success');
    })
    .catch(err => {
      // render errors from the route (if they exist)
      if (err.response.data.error) {
        renderAlert(err.response.data.error);
      }
      // render errors from validation (if they exist)
      else if (err.response) {
        renderAlert(err.response.data);
      }
      // else, log any errors to the console
      else {
        console.log('Error', err.message);
      }
    });
};

/**
 * function to update the user's names
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
    class: 'btn btn-outline-primary',
    type: 'button',
    id: 'edit-button'
  }).text('Edit');

  const passwordButton = $('<button>', {
    class: 'btn btn-primary w-100 mt-2',
    type: 'button',
    id: 'password-button'
  }).text('Change Password');

  // append and render html elements
  $('.wrap').append(formGroup, passwordButton);
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

  $(document).on('click', '#password-button', () => {
    renderModal('Change Password', userId);
  });
});
