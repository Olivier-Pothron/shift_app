// function Juice(name, paletteCoef, halfPaletteCoef, halfBoxCoef, quarterBoxCoef) {
//   this.name = name;
//   this.paletteCoef = paletteCoef;
//   this.halfPaletteCoef = halfPaletteCoef;
//   this.halfBoxCoef = halfBoxCoef;
//   this.quarterBoxCoef = quarterBoxCoef;
// }

// TO REFINE THE PROGRAM :
// having coefficients to every type of unit tied through key/value pairs ?
// (e.g. : "key:Palette value: 780") -> putting a hash in a hash ?

const volumeType = ['Palette', 'Demi-Palette', 'Demi-Box', 'Quart de Box', 'Unité'];

const juices = [
  { name: 'Orange 1L', paletteCoef: 780, halfPaletteCoef: 390, halfBoxCoef: 240, quarterBoxCoef: 120 },
  { name: 'Orange 1,5L', paletteCoef: 504, halfPaletteCoef: 252, halfBoxCoef: 160, quarterBoxCoef: 75 },
  { name: 'Orange 2x1L', paletteCoef: 390, halfPaletteCoef: 175, halfBoxCoef: 120, quarterBoxCoef: 60 },
  { name: 'Orange 2x1,5L', paletteCoef: 252, halfPaletteCoef: 126, halfBoxCoef: 60, quarterBoxCoef: 30 },
  { name: 'Orange 4x1L', paletteCoef: 160, halfPaletteCoef: 80, halfBoxCoef: 240, quarterBoxCoef: 120 },
  { name: 'Multifruits 1,5L', paletteCoef: 504, halfPaletteCoef: 252, halfBoxCoef: 160, quarterBoxCoef: 75 }
];

// ALL VARIABLES //

const selectedJuices = document.getElementById("selectedJuices");

const submitButton = document.getElementById("submitButton");

console.log(submitButton);

const urlParams = new URLSearchParams(window.location.search);
const chosenJuices = urlParams.get('chosenJuices');
const chosenJuicesArray = chosenJuices.split(', ');

const grandTotalText = document.querySelector("#grandTotal p");

const coefArray = (name) => {                                                   //creates a array of the quantities coef
  const array = [];                                                             //to be more manageable
  const id = juices.findIndex((juice) => juice.name === name);
  if (id !== -1) {
  array.push(juices[id].paletteCoef);
  array.push(juices[id].halfPaletteCoef);
  array.push(juices[id].halfBoxCoef);
  array.push(juices[id].quarterBoxCoef);
  array.push(1);
} else {
  // Handle the case where the juice is not found
  console.error(`Juice not found with name: ${name}`);
}
  return array;
}

//JUICE CARDS GENERATOR//

function createJuiceCard(juice) {
  const juiceCard = document.createElement("div");                             //creating juiceCard
  juiceCard.classList.add("juiceCard");
  juiceCard.id = `${juice}_card`;

  const cardTitle = document.createElement("h2");                              //Juice title
  cardTitle.innerText = juice;
  juiceCard.appendChild(cardTitle);

  const unitSelector = document.createElement("div");                          //creating unitSelector
  unitSelector.classList.add("unitSelector");

  const juiceCoefArray = coefArray(juice);

  let i = 0;

  for(const type of volumeType) {                                               //creating volumeCards
    const volumeCard = document.createElement("div");
    volumeCard.classList.add("volumeCard");
    volumeCard.id = `${type}`

    volumeCard.dataset.unitCoef = juiceCoefArray[i];                           //bind coef value to volumeCard div

    const typeTitle = document.createElement("h4");                            //Volume Title
    typeTitle.classList.add("typeTitle");
    typeTitle.innerText = type;
    typeTitle.id= `typeTitle${type}`;

    const quantity = document.createElement("div");                            //Create quantity input
    createQuantityButtons(type, quantity, juice);                              //?maybe use arrow functions?
    quantity.classList.add("quantity");
    quantity.id = `${juice}_${type}_quantity`
    quantity.setAttribute("juice", juice);
    quantity.value = 0;

    volumeCard.appendChild(typeTitle);
    volumeCard.appendChild(quantity);
    unitSelector.appendChild(volumeCard);

    i++
  }

  const priceBlock = document.createElement("div");                            //Create priceBlock
  priceBlock.classList.add("priceBlock");

  const unitaryPriceDescription = document.createElement("h3");
  unitaryPriceDescription.innerText = "Prix Unitaire";

  const unitaryPrice = document.createElement("div");                          //Create unitaryPrice
  unitaryPrice.id = `${juice}_unitPrice`;
  unitaryPrice.classList.add("unitPriceBlock");
  unitaryPrice.value = 2.00;
  createPriceButtons(juice, unitaryPrice);

  const totalPriceDescription = document.createElement("h3")
  totalPriceDescription.innerText = "Prix Total Jus";

  const totalPrice = document.createElement("div");                            //Create totalPrice
  totalPrice.classList.add("totalPrice");
  totalPrice.id = `${juice}_totalPrice`;
  const totalPriceText = document.createElement("p");
  totalPrice.appendChild(totalPriceText);
  totalPriceText.innerText = "0";

  //ASSEMBLING ALL THE STUFF
  priceBlock.appendChild(unitaryPriceDescription);
  priceBlock.appendChild(unitaryPrice);
  priceBlock.appendChild(totalPriceDescription);
  priceBlock.appendChild(totalPrice);

  juiceCard.appendChild(unitSelector);
  juiceCard.appendChild(priceBlock);

  selectedJuices.appendChild(juiceCard);
}

//GENERATOR FUNCTIONS//

function createQuantityButtons(type, div, juice) {
  const plusButton = createButton(type, juice, "+");
  const minusButton = createButton(type, juice, "-");
  const numberInput = createInput(type, juice);
  const euro = document.createElement("span");
  euro.innerText = "€";
  div.appendChild(numberInput);
  div.appendChild(euro);
  div.appendChild(minusButton);
  div.appendChild(plusButton);
}

function createButton(type, juice, sign) {
  const button = document.createElement("button");
  button.classList.add("button");
  button.innerText = sign;
  button.addEventListener("click", function() {
    updateElementValue(event.target, juice);
  });
  button.id = `${juice}_${type}_${sign}_button`
  return button;
}

function createInput(type, juice) {
  const input = document.createElement("input");
  input.id = `${juice}_${type}_input`;
  input.name = `${juice}_${type}_quantity`;
  input.type = "number";
  input.min="0";
  input.max="20";
  input.value = "0";
  return input;
}

function updateElementValue(target, juice) {
  const input = target.parentElement.querySelector("input");
  const currentValue = parseInt(input.value);
  if (target.innerText === '+') {
    input.value = currentValue + 1 > 20 ? currentValue : currentValue + 1;
  } else if (target.innerText === '-') {
    input.value = currentValue - 1 < 0 ? currentValue : currentValue - 1;
  }
  calculateTotalPrice(juice);
}

// (*) PRICE

function createPriceButtons(juice, div) {
  const plusButton = document.createElement("button");
  plusButton.classList.add("button");
  plusButton.innerText = "+";
  plusButton.addEventListener("click", function() {
    updatePrice(event.target, juice);
  });
  plusButton.id = `${juice}_price_+_button`

  const minusButton = document.createElement("button");
  minusButton.classList.add("button");
  minusButton.innerText = "-";
  minusButton.addEventListener("click", function() {
    updatePrice(event.target, juice);
  });
  minusButton.id = `${juice}_price_-_button`

  const input = document.createElement("input");
  input.id = `${juice}_price_input`;
  input.name = `${juice}_price`;
  input.type = "text";
  input.min="0";
  input.max="10";
  input.value = "2.00";
  input.addEventListener("input", function() {
    var value = this.value;
    var digitsOnly = value.match(/^\d+(\.\d{0,2})?$/)[0];  // Extract only digits with optional decimals
    this.value = digitsOnly;
    calculateTotalPrice(juice);
});

  div.appendChild(input);
  div.appendChild(minusButton);
  div.appendChild(plusButton);
}

function updatePrice (target, juice) {
  const input = target.parentElement.querySelector("input");
  currentValue = parseFloat(input.value);
  if (target.innerText === '+') {
    input.value = currentValue + 0.01 > 10 ? currentValue : (currentValue + 0.01).toFixed(2);
  } else if (target.innerText === '-') {
    input.value = currentValue - 0.01 < 0 ? currentValue : (currentValue - 0.01).toFixed(2);
  }
  calculateTotalPrice(juice);
}

function calculateTotalPrice(juice) {
  let totalUnits = 0;

  const priceInputElement = document.getElementById(`${juice}_price_input`);
  const unitPrice = priceInputElement.value;
  const juiceCard = document.getElementById(`${juice}_card`);
  const volumeTypeCollection = juiceCard.getElementsByClassName("volumeCard");
  const juiceTotalPrice = document.getElementById(`${juice}_totalPrice`);
  const juiceTotalPriceText = juiceTotalPrice.querySelector("p");

  for (let i = 0; i < volumeTypeCollection.length; i++) {
    const typeCoef = volumeTypeCollection[i].dataset.unitCoef;
    const numberOfUnitType = volumeTypeCollection[i].querySelector("input").value;
    const unitsPerTypeTotal = typeCoef * numberOfUnitType;
    totalUnits += unitsPerTypeTotal;
  }

  juiceTotalPriceVar = totalUnits * unitPrice;

  juiceTotalPriceText.innerText = juiceTotalPriceVar.toFixed(0) + "€";

  calculateGrandTotal();

  return 0;
}

function calculateGrandTotal () {
  juicePricesArray = document.querySelectorAll(".totalPrice");
  let grandTotalPrice = 0;
  for(let i=0 ; i<juicePricesArray.length ; i++) {
    grandTotalPrice += parseInt(juicePricesArray[i].innerText);
  }
  grandTotalText.innerText =  grandTotalPrice + "€";
}

//THIS IS IT!//

chosenJuicesArray.forEach(createJuiceCard);

//VALIDATION//

submitButton.addEventListener("click", function() {
  grandTotalPrice = parseInt(grandTotalText.innerText);
  var newPageUrl = "promotion_choice.html?grandTotal=" + encodeURIComponent(grandTotalPrice);
  window.location.href = newPageUrl;
});
