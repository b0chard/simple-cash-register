const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const totalPrice = document.getElementById('total-price');
const changeDue = document.getElementById('change-due');
const productList = document.getElementById('product-list');
const changeDrawer = document.getElementById('change-drawer');

let price = 1.87;
let cart = {};
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
let productsPrice = {
  'water bottle': 1.00,
  'bread': 2.50
}

// ===== UPDATE THE TOTAL ON PRICE INDICATOR =====
function updatePriceIndicator(price) {
  totalPrice.textContent = `$${price}`;
}

// ===== REMOVE INPUT =====


// ===== CALCULATE THE TOTAL OF PRODUCTS ADDED =====
function calculateCartItems() {
  let totalPriceOnCart = 0;

  Object.entries(cart).forEach(([product, price]) => {
    const numberOfItem = price;
    totalPriceOnCart += numberOfItem * productsPrice[product];
  })
  console.log(`total price on cart: $${totalPriceOnCart}`);
  updatePriceIndicator(totalPriceOnCart.toFixed(2));
}

// ===== WHEN PLUS BTN OR MINUS BTN IS CLICKED =====
function plusOrMinusBtnIsClicked(event) {
  const plusBtn = event.target.classList.contains('plus-btn');
  const minusBtn = event.target.classList.contains('minus-btn');

  if (plusBtn) { // plus btn is clicked
    const quantity = event.target.previousElementSibling;
    let quantityInt = parseInt(quantity.textContent);
    const productName = event.target.parentElement.previousElementSibling.childNodes[0].textContent.trim().toLowerCase();

    quantityInt += 1;
    quantity.textContent = quantityInt;

    if (!cart[productName]) {
      cart[productName] = 1;
    } else {
      cart[productName] += 1;
    }
  }
  
  if (minusBtn) { // minus btn is clicked
    const quantity = event.target.nextElementSibling;
    let quantityInt = parseInt(quantity.textContent);
    const productName = event.target.parentElement.previousElementSibling.childNodes[0].textContent.trim().toLowerCase();

    if (quantityInt > 0) {
      quantityInt -= 1;
      quantity.textContent = quantityInt;
    }

    if (!cart[productName] || cart[productName] === 0) {
      delete cart[productName];
    } else {
      cart[productName] -= 1;
    }
  }
  console.log(cart);
}

// ===== LISTEN FOR UPDATE QUANTITY =====
productList.addEventListener('click', (e) => {
  plusOrMinusBtnIsClicked(e);
  calculateCartItems();
})

// ===== LISTEN FOR PURCHASE CLICK =====
purchaseBtn.addEventListener('click', () => {
})