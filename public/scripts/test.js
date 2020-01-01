const postCSV = data => {
  // make put request to update a single category
  axios
    .post(`/api/expense/csv`, { data })
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

const formatRow = (value, headerName) => {
  switch (headerName) {
    case 'amount':
      return value.replace(/,/g, '');
    case 'date':
      return value.replace(/\//g, '-');
    default:
      return value;
  }
};

const parseCSV = () => {
  const file = $('#files')[0].files[0];

  Papa.parse(file, {
    download: true,
    header: true,
    transform: (value, headerName) => {
      return formatRow(value, headerName);
    },
    step: row => {
      console.log('Row:', row.data);
    },
    complete: results => {
      const { data } = results;

      // postCSV(data);
      console.log('DONE PARSING CSV', data);
    }
  });
};

$(document).ready(() => {
  $('#parse-button').click(parseCSV);
});
