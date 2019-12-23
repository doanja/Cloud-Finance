/**
 * function to render the user's total expenses per category
 * @param {number} userId the user's id
 */
const getCategoryExpenseTotals = userId => {
  const labels = [];
  const actualArr = [];
  const goalArr = [];

  const a = {
    label: "Actual Dollars Spent",
    data: [],
    backgroundColor: "#6272a4"
  };

  const b = {
    label: "Goal Dollar Amount",
    data: [],
    backgroundColor: "#44475"
  };

  const chart = $("#myChart")[0].getContext("2d");

  axios.get(`/api/category/all/${userId}`).then(res => {
    if (res.data.length === 0) {
      //  put a message her to redirect user ?
      return;
    }

    res.data.forEach(category => {
      let categoryTotal = 0;

      // labelsGoal.push(category.name);
      goalArr.push(category.goal);

      // calculate the sum of expenses for each category
      category.Expenses.forEach(expense => {
        categoryTotal += parseFloat(expense.amount);
      });

      // add data to the arrays
      labels.push(category.name);
      actualArr.push(parseFloat(categoryTotal.toFixed(2)));
    });

    a.data = actualArr;
    b.data = goalArr;

    const stuff = {
      labels: labels,
      datasets: [a, b]
    };

    console.log("stuff :", stuff);
    // render the chart
    renderChart(chart, "bar", stuff);
    // return { labels: labelsActual, data: dataActual };
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

const renderChart = (chart, chartType, data) => {
  console.log("data :", data);
  const theChart = new Chart(chart, {
    type: chartType, // the type of char (bar, horizontal bar, pie, line, donut, radar, polarArea)
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
