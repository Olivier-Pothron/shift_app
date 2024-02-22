var juices = [
  { name: 'Orange 1L', paletteCoef:  780, halfPaletteCoef: 390, halfBox: 240, quarterBox: 120 },
  { name: 'Orange 1,5L', paletteCoef:  504, halfPaletteCoef: 252, halfBox: 160, quarterBox: 75 },
  { name: 'Orange 2x1L', paletteCoef:  390, halfPaletteCoef: 175, halfBox: 120, quarterBox: 60 },
  { name: 'Orange 2x1,5L', paletteCoef:  252, halfPaletteCoef: 126, halfBox: 60, quarterBox: 30 },
  { name: 'Orange 4x1L', paletteCoef:  160, halfPaletteCoef: 80, halfBox: 240, quarterBox: 120 },
  { name: 'Multifruits 1,5L', paletteCoef:  504, halfPaletteCoef: 252, halfBox: 160, quarterBox: 75 }
];

var listOfJuices = document.getElementById("list_of_juices");                   //the html list containing the juices
var selectedJuices = document.getElementById("selected_juices");                //html list containing selected juices
var submitButton = document.getElementById("submitBtn");

for(var juice of juices) {                                                      //generating juices list
  var li = document.createElement("li");                                        //with an event.listener per juice
  li.classList.add("juiceCard");                                                //pointing to a toggling function
  var node = document.createTextNode(juice.name);
  li.addEventListener("click", function() {
    toggleSelectedJuices(event.target.textContent);
  });
  li.appendChild(node);
  listOfJuices.appendChild(li);
};

function toggleSelectedJuices(juice) {                                          //toggling selected juices on click
  var juiceIndex = Array.from(selectedJuices.children).findIndex(function(li) { //through a finding of index
    return li.textContent === juice;
  });
  if (juiceIndex !== -1) {
    selectedJuices.removeChild(selectedJuices.children[juiceIndex]);
  } else {
    var addedJuice = document.createElement("li");
    addedJuice.textContent = juice;
    selectedJuices.appendChild(addedJuice);
  }
  event.target.classList.toggle("clicked");
}

submitButton.addEventListener("click", function() {
  var chosenJuices = Array.from(selectedJuices.children).map(function(li) {
    return li.textContent;
  }).join(', ');
  var newPageUrl = "quantities.html?chosenJuices=" + encodeURIComponent(chosenJuices);
  window.location.href = newPageUrl;
});
