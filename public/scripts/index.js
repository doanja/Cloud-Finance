var db = require("../../models");

// Paged loaded - getting document ready
$(document).ready(function getAccountData() {
  // Expenses/Spending container to hold all of our categories and respective expenses
  var chartContainer = $("#chart-container");

  // Empty array to hold user's expenses and spend(amount)
  var dashboardEntries = [["Expenses", "Spend"]];

  // Function to get and return user data
  function getUserData() {
    app.get("api/user/:id", function(data) {
      db.bank
        .findAll({
          include: [db.userRoutes]
        })
        .then(function(dbUser) {
          res.json(dbUser);
        });
    });
  }

  function putChartOnscreen() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(buildArrayFromDb());
      var options = {
        title: "Total Spending",
        pieHole: 0.5,
        slices: {
          0: { color: "#ff5252" },
          1: { color: "#e0440e" },
          2: { color: "#e6693e" },
          3: { color: "#ec8f6e" },
          4: { color: "#f3b49f" },
          5: { color: "#f6c7b6" }
        }
      };
      var chart = new google.visualization.PieChart(document.getElementById("donutchart"));
      chart.draw(data, options);
    }
  }

  function buildArrayFromDb() {
    // Get data for a given user from categories table in DB.
    // GET * FROM categories WHERE UserId == {the id of whoever is logged in} you can start with hardcoded 1
    // This will result in categories with ids. e.x. (1, 2, 3, 4, etc.)
    // for each entry category returned from DB
    // save a var with the name of the category 'var catName = this.name'
    // save a var to track the 'total', initiate it with a value of 0.
    // Get * from expense table for a given categoryID
    // for each entry returned in this category
    // get the amount add it to 'total'
    ////
    // DashboardEntries.push([catNAme, total])
    ////
    // return array with data in it
  }

  // /Users/stephaniehoffman/project-2/public/HTML/index.html
  // /Users/stephaniehoffman/project-2/models/Categories.js

  function whatever() {
    var categories = db.Category.findAll({ attributes: ["id", "name"], where: { userId: 1 } });
    console.log("categories returen = " + categories);
  }
});
