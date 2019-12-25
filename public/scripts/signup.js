const signup = (email, password, firstName, lastName) => {
  axios.post(`/signup/`, { email, password, firstName, lastName }).then(res => {
    // location.reload();
    console.log('posted to /signup');
  }),
    err => {
      console.log(err);
    };
};

const signUpButtonClicked = () => {
  const email = $('#email').val();
  const password = $('#password').val();
  const firstName = $('#firstName').val();
  const lastName = $('#lastName').val();

  signup(email, password, firstName, lastName);
};

$(document).ready(() => {
  $(document).on('click', '#sign-up-button', signUpButtonClicked);
});
