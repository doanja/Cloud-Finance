const login = (email, password) => {
  axios.post(`/login`, { email, password }).then(res => {
    // location.reload();
    console.log("posted to /login");
  }),
    err => {
      console.log(err);
    };
};

const loginButtonClicked = () => {
  const email = $("#email").val();
  const password = $("#password").val();

  login(email, password);
};

$(document).ready(() => {
  console.log("login page loaded");
  $(document).on("click", "#log-in-button", loginButtonClicked);
});
