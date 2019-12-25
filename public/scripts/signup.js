const signup = (email, password, firstName, lastName) => {
  console.log('signup()');
  axios.post(`/signup/`, { email, password, firstName, lastName }).then(res => {
    // location.reload();
    console.log('posted to /signup');
  }),
    err => {
      console.log(err);
    };
};

const signUpButtonClicked = () => {
  console.log('signUpButtonClicked()');
  const email = $('#email').val();
  const password = $('#password').val();
  const firstName = $('#firstName').val();
  const lastName = $('#lastName').val();
  console.log('email :', email);
  console.log('password :', password);
  console.log('firstName :', firstName);
  console.log('lastName :', lastName);
  signup(email, password, firstName, lastName);
};

$(document).ready(() => {
  $(document).on('click', '#sign-up-button', signUpButtonClicked);
});
