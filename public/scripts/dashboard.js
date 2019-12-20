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

    renderChart(arr);
  }),
    err => {
      console.log(err);
    };
};

/**
 * function to draw the chart using a 2-dimensional array
 * @param {Array.<string[]>} arr an array of arrays containing the rows
 */
const renderChart = arr => {
  var data = google.visualization.arrayToDataTable(arr);

  var options = {
    title: "Total Amount Spent per Category",
    width: 800,
    height: 600,
    vAxis: {
      title: "Amount Spent"
    },
    hAxis: {
      title: "Category"
    }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById("graph"));
  chart.draw(data, options);

  $("#graph").append(chart);
};

google.load("visualization", "1", { packages: ["corechart"] });

$(document).ready(() => {
  const userId = parseInt(
    window.location.href.split("/")[window.location.href.split("/").length - 1]
  );

  getCategoryTotals(userId);
});
