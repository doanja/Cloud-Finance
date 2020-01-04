/**
 * function to send the parsed CSV to the API
 * @param {number} userId the id of the user
 * @param {object} data the CSV data to be imported
 */
const postCSV = (userId, data) => {
  console.log('userId :', userId);
  // make put request to update a single category
  axios
    .post(`/api/expense/csv/${userId}`, { data })
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

  let headers = false; // flag

  Papa.parse(file, {
    download: true,
    header: true,
    step: function(row, parser) {
      if (!headers) {
        // Only chek if flag is not set, i.e, for the first time
        parser.pause(); // pause the parser
        let firstRow = row.data;

        // check object keys
        if ('description' in firstRow && 'amount' in firstRow && 'date' in firstRow) {
          //every required key is present
          headers = true;

          // Do your data processing here
          console.log('test');

          parser.resume();
        } else {
          console.log('key missing');
          renderAlert('first row must contain "description", "amount", and "date"');
          //some key is missing, abort parsing
          parser.abort();
        }
      } else {
        console.log(row.data);
        // we already match the header, all required key is present
        // Do the Data processing here
      }
    },
    complete: res => {
      const { data } = res;
      const userId = parseInt(
        window.location.href.split('/')[window.location.href.split('/').length - 2]
      );
      console.log('completed');
      // postCSV(userId, data);
    }
  });
};

$(document).ready(() => {
  $(document).on('click', '.import-csv', () => {
    renderModal('Import CSV');
  });
});
