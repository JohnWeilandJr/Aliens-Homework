// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");



// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage = 100;


// renderTable renders the filteredData to the tbody
function renderTable() {
  // Set the value of endingIndex to startingIndex + resultsPerPage
  var endingIndex = startingIndex + resultsPerPage;
  // Get a section of the data array to render
  var dataSubset = data.slice(startingIndex, endingIndex);
  $tbody.innerHTML = "";
  for (var i = 0; i < dataSubset.length; i++) {
    // Get the current data object and its fields
    var dataset = dataSubset[i];
    var fields = Object.keys(dataset);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the data object, create a new cell and set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = dataset[field];
    }
  }
}

// Add an event listener to the button, call handleButtonClick when clicked
$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
  // Increase startingIndex by resultsPerPage, render the next section of the table
  startingIndex += resultsPerPage;
  renderTable();
  // Check to see if there are any more results to render
  if (startingIndex + resultsPerPage >= filteredData.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Data Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}

// Set filteredData to data initially
var filteredData = data;

// Add an event listener to the $searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

function handleSearchButtonClick() {
  // Increase startingIndex by resultsPerPage, render the next section of the table
  startingIndex += resultsPerPage;
  renderTable();
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filteredData to an array of all data that matches the filter
  filteredData = data.filter(function(data) {
    var dataCountry = data.country.substring(0, filterCountry.length).toLowerCase();
    var dataShape = data.shape.substring(0, filterShape.length).toLowerCase();
    if (dataCountry === filterCountry && dataShape === filterShape) {
      return true;
    }
    return false;
  });
}
// Render the table for the first time on page load
renderTable();
