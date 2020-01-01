const parseFile = () => {
  const file = $('#files')[0].files[0];

  Papa.parse(file, {
    download: true,
    complete: function(results) {
      const { data } = results;
      console.log('data :', data);
    }
  });
};

$(document).ready(() => {
  $('#parse-button').click(parseFile);
});
