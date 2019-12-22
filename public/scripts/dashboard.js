/**
 * function to render the user's total expenses per category
 * @param {number} userId the user's id
 */
const getCategoryTotals = userId => {
  const labels = [];
  const data = [];

  axios.get(`/api/category/all/${userId}`).then(res => {
    if (res.data.length === 0) {
      //  put a message her to redirect user ?
      return;
    }

    res.data.forEach(category => {
      let categoryTotal = 0;
      // calculate the sum of expenses for each category
      category.Expenses.forEach(expense => {
        categoryTotal += parseFloat(expense.amount);
      });

      // add to the array: [category name, category total]
      labels.push(category.name);
      data.push(parseFloat(categoryTotal.toFixed(2)));
    });

    renderBarChart(labels, data);
  }),
    err => {
      console.log(err);
    };
};

$(document).ready(() => {
  const userId = 1;
  // parseInt(
  //   window.location.href.split("/")[window.location.href.split("/").length - 1]
  // );
  // TODO: set userId back

  getCategoryTotals(userId);
});

const renderBarChart = (labels, data) => {
  const myChart = $("#myChart")[0].getContext("2d");

  const categoryTotals = new Chart(myChart, {
    type: "bar", // the type of char (bar, horizontal bar, pie, line, donut, radar, polarArea)
    data: {
      labels,
      datasets: [{ label: "population", data, backgroundColor: "#44475a" }]
    },
    options: {}
  });
};

const myChart2 = $("#myChart2")[0].getContext("2d");
const myChart3 = $("#myChart3")[0].getContext("2d");

// global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontFamily = "#777";

const char2 = new Chart(myChart2, {
  type: "doughnut", // the type of char (bar, horizontal bar, pie, line, donut, radar, polarArea)
  data: {
    labels: [
      "boston",
      "worcester",
      "springfield",
      "lowel",
      "cambridge",
      "new bedford"
    ],
    datasets: [
      {
        label: "population",
        data: [1212, 2134, 1234, 5315, 3462, 2345],
        backgroundColor: [
          "#282a36",
          "#6272a4",
          "#8be9fd",
          "#50fa7b",
          "#ff79c6	",
          "#44475a"
        ],
        borderWidth: 1,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverborderColor: "#000"
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Largest Cities In MAssachusetts",
      fontSize: 25
    },
    legend: {
      display: "false",
      position: "right",
      labels: {
        fontColor: "#000"
      }
    },
    layout: {
      padding: {
        left: 50,
        right: 0,
        bottom: 0,
        top: 0
      }
    },
    tooltips: {
      enabled: true
    }
  }
});
const chart3 = new Chart(myChart3, {
  type: "pie", // the type of char (bar, horizontal bar, pie, line, donut, radar, polarArea)
  data: {
    labels: [
      "boston",
      "worcester",
      "springfield",
      "lowel",
      "cambridge",
      "new bedford"
    ],
    datasets: [
      { label: "population", data: [1212, 2134, 1234, 5315, 3462, 2345] }
    ]
  },
  options: {}
});
