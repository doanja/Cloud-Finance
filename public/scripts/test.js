const postCSV = (id, data) => {
  // make put request to update a single category
  axios
    .post(`/api/expense/csv`, { id, data })
    .then(res => {
      // location.reload();
      console.log('csv posted');
    })
    .catch(err => {
      if (err.response) {
        // render alert if there is an error
        renderAlert(err.response.data);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
    });
};

const parseCSV = () => {
  const file = $('#files')[0].files[0];

  Papa.parse(file, {
    download: true,
    header: true,
    complete: res => {
      const { data } = res;
      const userId = 2;
      // TODO: change route to use user's id
      // parseInt(
      //   window.location.href.split('/')[window.location.href.split('/').length - 1]
      // );

      postCSV(userId, data);
    }
  });
};

$(document).ready(() => {
  $('#parse-button').click(parseCSV);
});
