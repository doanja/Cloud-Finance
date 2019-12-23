/**
 * function to render the user's total expenses per category
 * @param {number} userId the user's id
 */
const getCategoryExpenseTotals = userId => {
  const canvas = $("#myChart")[0].getContext("2d"); // handle to the canvas
  const labels = [];

  const expenseTotals = {
    label: "Actual Dollars Spent",
    data: [],
    backgroundColor: "#6272a4"
  };

  const categoryGoals = {
    label: "Goal Dollar Amount",
    data: [],
    backgroundColor: "#44475"
  };

  axios.get(`/api/category/all/${userId}`).then(res => {
    if (res.data.length === 0) {
      //  put a message her to redirect user ?
      return;
    }

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

    const dataset = {
      labels: labels,
      datasets: [expenseTotals, categoryGoals]
    };

    // render the chart
    renderChart(canvas, "bar", dataset);
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to render the user's total expenses per category
 * @param {number} userId the user's id
 */
const getCategoryGoalTotals = userId => {
  const labelsGoal = [];
  const dataGoal = [];
  const chart = $("#myChart2")[0].getContext("2d");

  axios.get(`/api/category/all/${userId}`).then(res => {
    if (res.data.length === 0) {
      //  put a message her to redirect user ?
      return;
    }

    res.data.forEach(category => {
      labelsGoal.push(category.name);
      dataGoal.push(category.goal);
    });

    // renderChart(chart, "bar", labels, data);
    return { labels: labelsGoal, data: dataGoal };
  }),
    err => {
      console.log(err);
    };
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

$(document).ready(() => {
  const userId = 1;
  // parseInt(
  //   window.location.href.split("/")[window.location.href.split("/").length - 1]
  // );
  // TODO: set userId back

  // global options
  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontFamily = "#777";

  getCategoryExpenseTotals(userId);
  getCategoryGoalTotals(userId);
});

const myChart3 = $("#myChart3")[0].getContext("2d");

// const char2 = new Chart(myChart2, {
//   type: "doughnut", // the type of char (bar, horizontal bar, pie, line, donut, radar, polarArea)
//   data: {
//     labels: [
//       "boston",
//       "worcester",
//       "springfield",
//       "lowel",
//       "cambridge",
//       "new bedford"
//     ],
//     datasets: [
//       {
//         label: "population",
//         data: [1212, 2134, 1234, 5315, 3462, 2345],
//         backgroundColor: [
//           "#282a36",
//           "#6272a4",
//           "#8be9fd",
//           "#50fa7b",
//           "#ff79c6	",
//           "#44475a"
//         ],
//         borderWidth: 1,
//         borderColor: "#777",
//         hoverBorderWidth: 3,
//         hoverborderColor: "#000"
//       }
//     ]
//   },
//   options: {
//     title: {
//       display: true,
//       text: "Largest Cities In MAssachusetts",
//       fontSize: 25
//     },
//     legend: {
//       display: "false",
//       position: "right",
//       labels: {
//         fontColor: "#000"
//       }
//     },
//     layout: {
//       padding: {
//         left: 50,
//         right: 0,
//         bottom: 0,
//         top: 0
//       }
//     },
//     tooltips: {
//       enabled: true
//     }
//   }
// });
