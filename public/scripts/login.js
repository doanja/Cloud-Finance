/**
 * function send post request to the API to login
 * @param {string} email the user's email
 * @param {string} password the user's password
 */
const login = (email, password) => {
  axios
    .post(`/login`, { email, password })
    .then(res => {
      // store the token in local storage
      window.localStorage.token = res.data.token;

      // redirect user to the dashboard
      window.location = `/dashboard/${res.data.user.id}/${res.data.token}`;
    })
    .catch(err => {
      console.log('Error', err.message);
      renderAlert('Emaill Address or Password Incorrect');
    });
};

$(document).ready(() => {
  // listen for log in button click
  $('#login-button').click(e => {
    e.preventDefault();

    // clear any alerts
    $('.alert ').remove();

    const email = $('#email')
      .val()
      .trim();

    const password = $('#password')
      .val()
      .trim();

    // validate form fields
    if (!isValidEmail(email)) {
      renderAlert('Enter in a valid Email address', '#login-form');
    } else if (!isValidPassword(password)) {
      renderAlert('Enter in a valid Password between 10 - 30 characters', '#login-form');
    } else {
      login(email, password);
    }
  });

  // listen for demo button click
  $('#demo-button').click(e => {
    e.preventDefault();
    login('bob@gmail.com', 'CloudFinance1');
  });
});
