// API REQUESTS

/**
 * function to get the user's information
 * @param {number} userId the user's id
 */
const getUserInfo = userId => {
  axios.get(`/api/user/${userId}`).then(res => {
    renderFormField("Email", "text", "email", res.data.email);
    renderFormField("First name", "text", "fname", res.data.firstName);
    renderFormField("Last name", "text", "lname", res.data.lastName);
    renderButtons();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to update the user's information
 * @param {number} userId the user's id
 * @param {string} firstName the user's first name
 * @param {string} lastName the user's last name
 * @param {string} email the user's email
 */
const updateUser = (userId, firstName, lastName, email) => {
  console.log("updateUser()");
  axios.put(`/api/user/${userId}`, { firstName, lastName, email }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

// RENDER FUNCTIONS

// function to render the submit button
const renderButtons = () => {
  // create html elements
  const formGroup = $("<div>", { class: "btn-group w-100" });
  const resetButton = $("<button>", {
    class: "btn btn-outline-primary",
    type: "button",
    id: "reset-button"
  }).text("Reset");
  const saveButton = $("<button>", {
    class: "btn btn-outline-primary",
    type: "button",
    id: "save-button"
  }).text("Save");

  // append and render html elements
  $(".wrap").append(formGroup);
  formGroup.append(resetButton, saveButton);
};

const renderFormField = (text, type, elementId, value) => {
  // create html elements
  const formGroup = $("<div>", { class: "form-group" });
  const label = $("<label>", { for: type }).text(text);
  const input = $("<input>", {
    class: "form-control",
    type: type,
    id: elementId
  }).val(value);

  // append and render html elements
  $(".wrap").append(formGroup);
  formGroup.append(label, input);
};

/**
 * function to parse the form and update the uesr's information
 */
const parseFormData = () => {
  const userId = 1;
  // parseInt(
  //   window.location.href.split("/")[window.location.href.split("/").length - 1]
  // );
  // TODO: set userId back

  const email = $("#email").val();
  const firstName = $("#fname").val();
  const lastName = $("#lname").val();

  renderConfirmationModal('Click "confirm" to Save', () => {
    updateUser(userId, firstName, lastName, email);
  });
};

$(document).ready(function() {
  const userId = 1;
  // parseInt(
  //   window.location.href.split("/")[window.location.href.split("/").length - 1]
  // );
  // TODO: set user ID back

  // get the user's information from the url
  getUserInfo(userId);

  //  listen for form submission
  $(document).on("click", "#save-button", parseFormData);
  $(document).on("click", "#reset-button", () => {
    location.reload();
  });
});
