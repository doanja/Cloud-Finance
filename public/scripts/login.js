$(document).ready(() => {
  $('#login-button').click(e => {
    $('.alert ').remove();

    const email = $('#email')
      .val()
      .trim();

    const password = $('#password')
      .val()
      .trim();

    // validate form fields
    if (!isValidEmail(email)) {
      e.preventDefault();
      renderAlert('Enter in a valid Email address', '#login-form');
    } else if (!isValidPassword(password)) {
      e.preventDefault();
      renderAlert('Enter in a valid Password between 10 - 30 characters', '#login-form');
    }
  });
});
