/**
 * function to render the user's total expenses per category vs. goal as a graph by date
 * @param {number} userId the user's id
 * @param {startDate} startDate the start date
 * @param {endDate} endDate the end date
 */
const getCategoryTotalsByDate = (userId, startDate, endDate) => {
  // handle to the canvas
  const canvas1 = $('#chart1')[0].getContext('2d');
  const canvas2 = $('#chart2')[0].getContext('2d');
  const canvas3 = $('#chart3')[0].getContext('2d');
  const canvas4 = $('#chart4')[0].getContext('2d');
  const canvas5 = $('#chart5')[0].getContext('2d');
  const canvas6 = $('#chart6')[0].getContext('2d');

  const labels = [];

  const expenseTotals = {
    label: 'Actual Dollars Spent',
    data: [],
    backgroundColor: '#418a66'
  };

  const categoryGoals = {
    label: 'Goal Dollar Amount',
    data: [],
    backgroundColor: '#564d48'
  };

  axios
    .get(`/api/category/all/${userId}/${startDate}/${endDate}`)
    .then(res => {
      if (res.data.length === 0) {
        renderCardtitle('No data found. Click here to add expenses.', userId);
        return;
      }

      $('canvas').empty(); // empty the canvases
      $('#modal').remove();

      // for each category...
      res.data.forEach(category => {
        let categoryTotal = 0; // counter for category total (sum of all expenses)

        // calculate the sum of expenses for each category
        category.Expenses.forEach(expense => {
          categoryTotal += parseFloat(expense.amount);
        });

        // add data to the arrays
        labels.push(category.name); // name of each category
        categoryGoals.data.push(category.goal); // goals
        expenseTotals.data.push(parseFloat(categoryTotal.toFixed(2))); // category totals
      });

      // create dataset object
      const dataset = {
        labels,
        datasets: [expenseTotals, categoryGoals]
      };

      // render the chart
      renderChart(canvas1, 'bar', dataset);
      renderChart(canvas2, 'line', dataset);
      renderChart(canvas3, 'radar', dataset);
      renderChart(canvas4, 'horizontalBar', dataset);
      renderChart(canvas5, 'doughnut', dataset);
      renderChart(canvas6, 'polarArea', dataset);
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function to render the user's total expenses per category vs. goal as a graph
 * @param {number} userId the user's id
 */
const getCategoryTotals = userId => {
  // handle to the canvas
  const canvas1 = $('#chart1')[0].getContext('2d');
  const canvas2 = $('#chart2')[0].getContext('2d');
  const canvas3 = $('#chart3')[0].getContext('2d');
  const canvas4 = $('#chart4')[0].getContext('2d');
  const canvas5 = $('#chart5')[0].getContext('2d');
  const canvas6 = $('#chart6')[0].getContext('2d');

  const labels = [];

  const expenseTotals = {
    label: 'Actual Dollars Spent',
    data: [],
    backgroundColor: '#418a66'
  };

  const categoryGoals = {
    label: 'Goal Dollar Amount',
    data: [],
    backgroundColor: '#564d48'
  };

  axios
    .get(`/api/category/all/${userId}`)
    .then(res => {
      if (res.data.length === 0) {
        renderCardtitle('No data found. Click here to add expenses.', userId);
        return;
      }

      // for each category...
      res.data.forEach(category => {
        let categoryTotal = 0; // counter for category total (sum of all expenses)

        // calculate the sum of expenses for each category
        category.Expenses.forEach(expense => {
          categoryTotal += parseFloat(expense.amount);
        });

        // add data to the arrays
        labels.push(category.name); // name of each category
        categoryGoals.data.push(category.goal); // goals
        expenseTotals.data.push(parseFloat(categoryTotal.toFixed(2))); // category totals
      });

      // create dataset object
      const dataset = {
        labels,
        datasets: [expenseTotals, categoryGoals]
      };

      // render the chart
      renderChart(canvas1, 'bar', dataset);
      renderChart(canvas2, 'line', dataset);
      renderChart(canvas3, 'radar', dataset);
      renderChart(canvas4, 'horizontalBar', dataset);
      renderChart(canvas5, 'doughnut', dataset);
      renderChart(canvas6, 'polarArea', dataset);
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function to render a card containing the canvas
 * @param {string} canvasId the id of the canvas
 */
const renderCard = canvasId => {
  const col = $('<div>', { class: 'col-sm-12 col-md-12 col-lg-6 my-3' });
  const card = $('<div>', { class: 'card dashboard-card' });
  const cardBody = $('<div>', { class: 'card-body text-center' });
  const canvas = $('<canvas>', { id: canvasId });

  $('.row').append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(canvas);
};

/**
 *
 * @param {object} canvas the canvas object (dom element)
 * @param {string} chartType the type of chart to be rendered
 * @param {object} data the data to be rendered
 */
const renderChart = (canvas, chartType, data) => {
  const chart = new Chart(canvas, {
    type: chartType,
    data,
    options: {}
  });
};

const renderCardtitle = (titleText, userId) => {
  const title = $('<a>', {
    class: 'card-title text-center my-auto',
    href: `/expenses/${userId}`
  }).text(titleText);

  $('.dashboard-card').empty();
  $('.dashboard-card').prepend(title);
};

$(document).ready(() => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 1]
  );

  getCategoryTotals(userId);

  $(document).on('click', '.filter-date', () => {
    filterDateClicked('Dashboard');
  });

  const today = moment(new Date()).format('YYYY/MM/DD');
  const yesterday = moment(new Date())
    .add(-1, 'days')
    .format('YYYY/MM/DD');

  const lastWeekStart = moment()
    .subtract(1, 'week')
    .startOf('week')
    .format('YYYY/MM/DD');
  const lastWeekEnd = moment()
    .subtract(1, 'week')
    .endOf('week')
    .format('YYYY/MM/DD');

  const thisWeekStart = moment()
    .startOf('week')
    .format('YYYY/MM/DD');
  const thisWeekEnd = moment()
    .endOf('week')
    .format('YYYY/MM/DD');

  const lastMonthStart = moment()
    .subtract(1, 'month')
    .startOf('month')
    .format('YYYY/MM/DD');
  const lastMonthEnd = moment()
    .subtract(1, 'month')
    .endOf('month')
    .format('YYYY/MM/DD');

  const thisMonthStart = moment()
    .startOf('month')
    .format('YYYY/MM/DD');
  const thisMonthEnd = moment()
    .endOf('month')
    .format('YYYY/MM/DD');

  const lastYearStart = moment()
    .subtract(1, 'year')
    .startOf('year')
    .format('YYYY/MM/DD');
  const lastYearEnd = moment()
    .subtract(1, 'year')
    .endOf('year')
    .format('YYYY/MM/DD');

  const thisYearStart = moment()
    .startOf('year')
    .format('YYYY/MM/DD');
  const thisYearEnd = moment()
    .endOf('year')
    .format('YYYY/MM/DD');
});
