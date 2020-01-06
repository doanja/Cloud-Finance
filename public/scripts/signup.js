$(document).ready(() => {
  $('#submit-button').click(e => {
    $('.alert ').remove();

    const email = $('#email')
      .val()
      .trim();

    const password = $('#password')
      .val()
      .trim();

    const confirmPassword = $('#confirmPassword')
      .val()
      .trim();

    const firstName = $('#firstName')
      .val()
      .trim();

    const lastName = $('#lastName')
      .val()
      .trim();

    // validate form fields
    if (!isValidEmail(email)) {
      e.preventDefault();
      renderAlert('Enter in a valid Email address', '#signup-form');
    } else if (!isValidPassword(password)) {
      e.preventDefault();
      renderAlert('Enter in a valid Password between 10 - 30 characters', '#signup-form');
    } else if (!(password === confirmPassword)) {
      e.preventDefault();
      renderAlert('Passwords must match', '#signup-form');
    } else if (!isValidName(firstName)) {
      e.preventDefault();
      renderAlert('Enter in a valid First name', '#signup-form');
    } else if (!isValidName(lastName)) {
      e.preventDefault();
      renderAlert('Enter in a valid Last name', '#signup-form');
    }
  });
});
