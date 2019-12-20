/**
 * function to render settings icon
 * @param {string} page the name of the route
 * @param {number} userId the user's id
 * @param {string} parentElement the parent element's name to append this to
 */
const renderSettingsLink = (page, userId, parentElement) => {
  const li = $("<li>");
  const a = $("<a>", { href: `/${page}/${userId}` });
  const icon = $("<i>", { class: "large material-icons", id: "profile-icon" }).text(
    "account_circle"
  );

  $(parentElement).append(li);
  li.append(a);
  a.append(icon);
};

/**
 * function to render nav links
 * @param {string} title the text to show on the link
 * @param {string} page the html page name
 * @param {number} userId the user's id
 * @param {string} parentElement the class or id name to append this to
 */
const renderNavLinks = (title, page, userId, parentElement) => {
  const li = $("<li>", { class: "tab" });
  const a = $("<a>", { href: `/${page}/${userId}` }).text(title);
  $(parentElement).append(li);
  li.append(a);
};

$(document).ready(() => {
  const userId = window.location.href.split("/")[window.location.href.split("/").length - 1];

  renderNavLinks("Home", "dashboard", userId, ".tabs");
  renderNavLinks("Expenses", "expenses", userId, ".tabs");
  renderNavLinks("Budget", "budget", userId, ".tabs");
  renderSettingsLink("profile", userId, ".hide-on-med-and-down");
});
