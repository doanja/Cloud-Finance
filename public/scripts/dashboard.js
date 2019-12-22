/**
 * function to render the user's total expenses per category
 * @param {number} userId the user's id
 */
const getCategoryTotals = userId => {
  const arr = [["Category", "Amount"]];

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
      arr.push([category.name, parseFloat(categoryTotal.toFixed(2))]);
    });

    console.log(arr);
    // renderChart(arr);
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

const myChart = $("#myChart")[0].getContext("2d");
const myChart2 = $("#myChart2")[0].getContext("2d");
const myChart3 = $("#myChart3")[0].getContext("2d");

const massPopChart = new Chart(myChart, {
  type: "bar", // the type of char (bar, horizontal bar, pie, line, donut, radar, polarArea)
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

const char2 = new Chart(myChart2, {
  type: "bar", // the type of char (bar, horizontal bar, pie, line, donut, radar, polarArea)
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
const chart3 = new Chart(myChart3, {
  type: "bar", // the type of char (bar, horizontal bar, pie, line, donut, radar, polarArea)
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
