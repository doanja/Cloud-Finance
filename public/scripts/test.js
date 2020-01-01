const helloWorld = () => {
  console.log('hello world');
};

const parseFile = () => {
  console.log('aprse');
  $('#files').parse({
    config: {
      delimiter: 'auto',
      complete: helloWorld
    },
    before: function(file, inputElem) {
      // executed before parsing each file begins;
      // what you return here controls the flow
      console.log('Parsing file...', file);
    },
    error: function(err, file, inputElem, reason) {
      // executed if an error occurs while loading the file,
      // or if before callback aborted for some reason
      console.log('ERROR:', err, file);
    },
    complete: function() {
      // executed after all files are complete
      console.log('Done with all files');
    }
  });
};

$(document).ready(() => {
  $('#parse-button').click(parseFile);
});
