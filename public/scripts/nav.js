/**
 * function to render settings icon
 * @param {string} page the name of the route
 * @param {number} userId the user's id
 * @param {string} parentElement the parent element's name to append this to
 */
const renderSettingsLink = (page, userId, parentElement) => {
  const li = $('<li>');
  const a = $('<a>', { href: `/${page}/${userId}` });
  const icon = $('<i>', {
    class: 'large material-icons',
    id: 'profile-icon'
  }).text('account_circle');

  $(parentElement).append(li);
  li.append(a);
  a.append(icon);
};

/**
 * function to render a dropdown divider
 * @param {string} parentElement the class or id name to append this to
 */
const renderDivider = parentElement => {
  const divider = $('<div>', { class: 'dropdown-divider' });

  $(parentElement).append(divider);
};

/**
 * function to render nav links
 * @param {string} linkTitle the text to show on the link
 * @param {string} pageName the html page name
 * @param {number} userId the user's id
 * @param {string} parentElement the class or id name to append this to
 */
const renderNavLinks = (linkTitle, pageName, userId, token, parentElement = '#menu') => {
  const a = $('<a>', {
    class: 'dropdown-item',
    href: `/${pageName}/${userId}/${token}`
  }).text(linkTitle);
  $(parentElement).append(a);
};

$(document).ready(() => {
  const userId = window.location.href.split('/')[window.location.href.split('/').length - 1];

  // grab the jwt token from local storage
  const token = localStorage.getItem('token');

  $('.navbar-brand').attr('href', `/dashboard/${userId}/${token}`);

  renderNavLinks('Profile', 'profile', userId, token);
  renderNavLinks('Dashboard', 'dashboard', userId, token);
  renderNavLinks('Overview', 'overview', userId, token);
  renderNavLinks('Expenses', 'expenses', userId, token);
  renderDivider('#menu');
  renderNavLinks('Logout', 'logout', '');
});
