/**
 * function to send the parsed CSV to the API
 * @param {number} userId the id of the user
 * @param {object} data the CSV data to be imported
 */
const postCSV = (userId, data) => {
  // make put request to update a single category
  axios
    .post(`/api/expense/csv/${userId}`, { data })
    .then(res => {
      location.reload();
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

// function to parse CSV using papaparse
const parseCSV = () => {
  const file = $('#modal-csv')[0].files[0]; // reference to the DOM file

  Papa.parse(file, {
    download: true,
    header: true,
    skipEmptyLines: true,
    error: (err, file) => {
      renderAlert(err);
    },
    complete: res => {
      const { data } = res;
      const userId = parseInt(
        window.location.href.split('/')[window.location.href.split('/').length - 2]
      );

      postCSV(userId, data);
    }
  });
};

$(document).ready(() => {
  $(document).on('click', '.import-csv', () => {
    renderModal('Import CSV');
  });
});
