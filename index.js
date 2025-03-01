const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const totalPriceIndicator = document.getElementById('total-price');
const changeDue = document.getElementById('change-due');
const productList = document.getElementById('product-list');
const productQuantity = document.querySelectorAll('.product-quantity');
const changeDrawer = document.getElementById('change-drawer');

let price = 1.87;
let cart = {};
let totalPriceOnCart = 0;
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
  'water bottle': 1,
  'bread': 2.5,
  'coffee': 1.5
}

// ===== CASH IS GREATER THAN THE TOTAL PRICE IN CART =====
function checkCashAmount(cash) {
  if (cash < totalPriceOnCart || !cash) {
    alert('Customer does not have enough money to purchase the item');
  } else if (cash === totalPriceOnCart) {
    changeDue.textContent = 'No change due - customer paid with exact cash';
  }
}

// ===== REMOVE INPUT =====
function removeInput() {
  cash.value = '';
}

// ===== RESET LIST QUANTITY =====
function resetProductListQuantity() {
  productQuantity.forEach((item) => {
    item.textContent = '0';
  })
}

// ===== RESET TOTAL PRICE INDICATOR =====
function resetPriceIndicator() {
  totalPriceIndicator.textContent = '$0.00';
}

// ===== UPDATE THE TOTAL ON PRICE INDICATOR =====
function updatePriceIndicator() {
  totalPriceIndicator.textContent = `$${totalPriceOnCart.toFixed(2)}`;
}

// ===== CALCULATE THE TOTAL OF PRODUCTS ADDED =====
function calculateCartItems() {
  let temporaryPrice = 0;
  Object.entries(cart).forEach(([product, price]) => {
    console.log(`${price} + ${temporaryPrice}`);
    temporaryPrice += price * productsPrice[product];
  })
  totalPriceOnCart = temporaryPrice;
  console.log(`total price on cart: $${totalPriceOnCart}`);
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

    if (cart[productName]) {
      cart[productName] += 1;
    } else {
      cart[productName] = 1;
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

    if (cart[productName]) {
      cart[productName] -= 1;
      if (cart[productName] === 0) {
        delete cart[productName];
      }
    }
  }
  console.log(cart);
}

// ===== LISTEN FOR UPDATE QUANTITY =====
productList.addEventListener('click', (e) => {
  plusOrMinusBtnIsClicked(e);
  calculateCartItems();
  updatePriceIndicator();
})

// ===== LISTEN FOR PURCHASE CLICK =====
purchaseBtn.addEventListener('click', () => {
  const cashValue = Number(cash.value);
  checkCashAmount(cashValue);
  removeInput();
  resetProductListQuantity()
  resetPriceIndicator()
})