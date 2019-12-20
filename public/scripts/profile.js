/**
 * function to update the user's information
 * @param {number} userId the user's id
 * @param {string} firstName the user's first name
 * @param {string} lastName the user's last name
 * @param {string} email the user's email
 */
const updateUser = (userId, firstName, lastName, email) => {
  axios.put(`/api/user/${userId}`, { firstName, lastName, email }).then(res => {
    location.reload();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to get the user's information
 * @param {number} userId the user's id
 */
const getUserInfo = userId => {
  axios.get(`/api/user/${userId}`).then(res => {
    renderFormField("First name:", "text", "fname", res.data.firstName);
    renderFormField("Last name:", "text", "lname", res.data.lastName);
    renderFormField("Email:", "text", "email", res.data.email);
    renderSubmitButton();
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to parse the form and update the uesr's information
 */
const parseFormData = () => {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );
  const firstName = $(".value-for-fname").val();
  const lastName = $(".value-for-lname").val();
  const email = $(".value-for-email").val();

  renderConfirmationModal('Click "Confirm" to Update', () => {
    updateUser(userId, firstName, lastName, email);
  });
};

// function to render the submit button
const renderSubmitButton = () => {
  // create html elements
  const formGroup = $("<div>", { class: "form-group" });
  const col = $("<div>", { class: "col-lg-8" });
  const input = $("<input>", {
    type: "button",
    class: "btn btn-primary",
    value: "Submit",
    id: "submit-button"
  });

  // append and render html elements
  $("#form").append(formGroup);
  formGroup.append(col);
  col.append(input);
};

const renderFormField = (text, type, valueType, value) => {
  // create html elements
  const formGroup = $("<div>", { class: "form-group" });
  const label = $("<label>", { class: "col-lg-3 control-label" }).text(text);
  const col = $("<div>", { class: "col-lg-8" });
  const input = $("<input>", { class: "form-control value-for-" + valueType, type: type }).val(
    value
  );

  // append and render html elements
  $("#form").append(formGroup);
  formGroup.append(label, col);
  col.append(input);
};

$(document).ready(function() {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );

  // get the user's information from the url
  getUserInfo(userId);

  //  listen for form submission
  $(document).on("click", "#submit-button", parseFormData);
});
