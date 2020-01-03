/**
 * function to send the parsed CSV to the API
 * @param {number} userId the id of the user
 * @param {object} data the CSV data to be imported
 */
const postCSV = (userId, data) => {
  // make put request to update a single category
  axios
    .post(`/api/expense/csv`, { id: userId, data })
    .then(res => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};

// function to parse CSV using papaparse
const parseCSV = () => {
  const file = $('#modal-csv')[0].files[0]; // reference to the DOM file

  Papa.parse(file, {
    download: true,
    header: true,
    complete: res => {
      const { data } = res;
      const userId = parseInt(
        window.location.href.split('/')[window.location.href.split('/').length - 1]
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
