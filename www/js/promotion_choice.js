const promotionTypes =
  { "10%" : 0.1,
  "15%" : 0.15,
  "20%" : 0.2,
  "25%" : 0.25,
  "30%" : 0.3 };

let listOfPromotions = document.getElementById("list_of_promotions");
let grandTotal = document.getElementById("grand_total");

const urlParams = new URLSearchParams(window.location.search);
const grandTotalPrice = urlParams.get('grandTotal');

grandTotal.innerText += grandTotalPrice + " €";

for (let promo in promotionTypes) {
  let promoCard = document.createElement("div");
  promoCard.classList.add("promoCard");
  let promoTitle = document.createElement("h1");
  promoTitle.innerText = promo;
  let promoPrice = document.createElement("h1");
  promoPrice.innerText = parseInt(grandTotalPrice * promotionTypes[promo]) + " €";
  promoCard.appendChild(promoTitle);
  promoCard.appendChild(promoPrice);
  listOfPromotions.appendChild(promoCard);
};
