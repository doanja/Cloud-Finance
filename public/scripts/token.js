$(document).ready(() => {
  // grab the jwt token from local storage
  const token = localStorage.getItem('token');

  // set all axios requests headers
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
});
