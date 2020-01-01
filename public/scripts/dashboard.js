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

/**
 * function to render a link to expenses if there is no existing expenses
 * @param {string} title the card title
 * @param {number} userId the user's id
 */
const renderCardtitle = (title, userId) => {
  const cardTitle = $('<a>', {
    class: 'card-title text-center my-auto',
    href: `/expenses/${userId}`
  }).text(title);

  $('.dashboard-card').empty();
  $('.dashboard-card').prepend(cardTitle);
};

/**
 * function to render a card containing the canvas
 * @param {string} canvasId the id of the canvas
 * @param {string} title the title of the card
 */
const renderCard = (canvasId, title) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-12 col-lg-6 my-3' });
  const card = $('<div>', { class: 'card dashboard-card' });
  const cardBody = $('<div>', { class: 'card-body text-center' });
  const cardTitle = $('<div>', { class: 'card-title' }).text(title);
  const canvas = $('<canvas>', { id: canvasId });

  $('.row').append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, canvas);
};

/**
 * function to render the user's total expenses per category vs. goal as a graph by date
 * @param {number} userId the user's id
 * @param {integer} canvasId the id of the canvas
 * @param {string} title the graph title
 * @param {string} timeframe the time frame of the dates
 * @param {object} firstDateSet the first set of dates
 * @param {object} secondDateSet the second set of dates
 */
const getCategoryTotalsByDate = (
  userId,
  canvasId,
  title,
  timeframe,
  firstDateSet,
  secondDateSet
) => {
  // render a card
  renderCard(`graph-${canvasId}`, title);

  // handle to the canvas
  const canvas = $(`#graph-${canvasId}`)[0].getContext('2d');

  // destructor the dates
  const { startDate1, endDate1 } = firstDateSet;
  const { startDate2, endDate2 } = secondDateSet;

  const labels = []; // labels for the x-axis

  const firstExpenseTotals = {
    label: `Total Spent Previous ${timeframe}`,
    data: [],
    backgroundColor: '#418a66'
  };

  const firstCategoryGoals = {
    label: `Goal Previous ${timeframe}`,
    data: [],
    backgroundColor: '#564d48'
  };

  const secondExpenseTotals = {
    label: `Total Spent Current ${timeframe}`,
    data: [],
    backgroundColor: '#88c8ba'
  };

  const secondCategoryGoals = {
    label: `Goal Current ${timeframe}`,
    data: [],
    backgroundColor: '#797067'
  };

  axios
    .all([
      axios.get(`/api/category/all/${userId}/${startDate1}/${endDate1}`),
      axios.get(`/api/category/all/${userId}/${startDate2}/${endDate2}`)
    ])
    .then(
      axios.spread((firstRes, secondRes) => {
        if (firstRes.data.length === 0 && secondRes.data.length === 0) {
          renderCardtitle('No data found. Click here to add expenses.', userId);
          return;
        }

        $('canvas').empty(); // empty the canvases
        $('#modal').remove();

        // for each category...
        firstRes.data.forEach(category => {
          let categoryTotal = 0; // counter for category total (sum of all expenses)

          // calculate the sum of expenses for each category
          category.Expenses.forEach(expense => {
            categoryTotal += parseFloat(expense.amount);
          });

          // add data to the arrays
          labels.push(category.name); // name of each category
          firstCategoryGoals.data.push(category.goal); // goals
          firstExpenseTotals.data.push(parseFloat(categoryTotal.toFixed(2))); // category totals
        });

        // for each category...
        secondRes.data.forEach(category => {
          let categoryTotal = 0; // counter for category total (sum of all expenses)

          // calculate the sum of expenses for each category
          category.Expenses.forEach(expense => {
            categoryTotal += parseFloat(expense.amount);
          });

          // add data to the arrays if it doesn't exist in the array already
          if (!labels.includes(category.name)) {
            labels.push(category.name); // name of each category
          }
          secondCategoryGoals.data.push(category.goal); // goals
          secondExpenseTotals.data.push(parseFloat(categoryTotal.toFixed(2))); // category totals
        });

        // create dataset object to pass to renderChart
        const dataset = {
          labels,
          datasets: [
            firstExpenseTotals,
            firstCategoryGoals,
            secondExpenseTotals,
            secondCategoryGoals
          ]
        };

        // render the chart
        renderChart(canvas, 'bar', dataset);
      })
    )
    .catch(err => {
      console.log(err);
    });
};

$(document).ready(() => {
  const userId = parseInt(
    window.location.href.split('/')[window.location.href.split('/').length - 1]
  );

  $(document).on('click', '.filter-date', () => {
    filterDateClicked('Dashboard');
  });

  getCategoryTotalsByDate(
    userId,
    0,
    "Today vs. Yesterday's Goal vs. Actuals",
    'Day',
    { startDate1: today, endDate1: today },
    { startDate2: yesterday, endDate2: yesterday }
  );

  getCategoryTotalsByDate(
    userId,
    1,
    "This Week vs. Last Week's Goal vs. Actuals",
    'Week',
    { startDate1: lastWeekStart, endDate1: lastWeekEnd },
    { startDate2: thisWeekStart, endDate2: thisWeekEnd }
  );

  getCategoryTotalsByDate(
    userId,
    2,
    "This Month vs. Last Month's Goal vs. Actuals",
    'Month',
    { startDate1: lastMonthStart, endDate1: lastMonthEnd },
    { startDate2: thisMonthStart, endDate2: thisMonthEnd }
  );

  getCategoryTotalsByDate(
    userId,
    3,
    "This Year vs. Last Year's Goal vs. Actuals",
    'Year',
    { startDate1: lastYearStart, endDate1: lastYearEnd },
    { startDate2: thisYearStart, endDate2: thisYearEnd }
  );
});
