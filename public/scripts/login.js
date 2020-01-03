const login = (email, password) => {
  axios
    .post(`/login`, { email, password })
    .then(res => {
      // location.reload();
      console.log(res);
      window.localStorage.token = res.data.token;
      window.location = `/dashboard/${res.data.user.id}`;
    })
    .catch(err => {
      console.log('Error', err.message);
    });
};

$(document).ready(() => {
  $('#login-button').click(e => {
    e.preventDefault();

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
    } else {
      login(email, password);
    }
  });
});
