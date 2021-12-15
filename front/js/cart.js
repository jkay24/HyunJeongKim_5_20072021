//Bring up products added to cart local storage
let productSavedToLocal = JSON.parse(localStorage.getItem("product"));
console.log(productSavedToLocal);
const cartItems = document.getElementById("cart__items");

//Display products in cart on recap table
if (productSavedToLocal === null) {
  //if cart is empty:
  cartItems.innerHTML = "Le panier est vide.";
} else {
  //if cart is not empty:
  let displayCartItems = [];
  productSavedToLocal.map((values) => {
    displayCartItems += `
      <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      <div class="cart__item__img">
      <img src="${values.imgSrc}" alt="${values.imgTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${values.name}</h2>
          <p>${values.color}</p>
          <p>${values.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : ${values.quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${values.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  });
  cartItems.innerHTML = displayCartItems;
}

//Delete items from cart - doesn't display "le panier est vide" once everything deleted!
let deleteCartItems = document.getElementsByClassName("deleteItem");
for (let i = 0; i < deleteCartItems.length; i++) {
  let button = deleteCartItems[i];
  button.addEventListener("click", function (e) {
    let buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    //now delete also from local storage
    e.preventDefault();
    productSavedToLocal.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(productSavedToLocal));
  });
}

//Display total cart quantity - NOT WORKING (cannot get sum of values in for loop)
let totalQuantity = document.getElementById("totalQuantity");
function sum(productSavedToLocal) {
  let sum = 0;
  for (let i = 0; i < productSavedToLocal.length; i++) {
    let quantities = productSavedToLocal[i].quantity;
    console.log(quantities);
    sum += productSavedToLocal[i].quantity;
  }
  console.log(sum);
}
totalQuantity.innerHTML = sum(productSavedToLocal);

//update cart quantity upon click - NOT WORKING (total displays "([object HTMLInputElement]")
let quantityInput = document.getElementsByClassName("itemQuantity");
for (let i = 0; i < quantityInput.length; i++) {
  let input = quantityInput[i];
  input.addEventListener("change", function (e) {
    let input = e.target;
    totalQuantity.innerHTML = input;
    //now also update quantity in local storage - NOT WORKING (input wrong?)
    productSavedToLocal[i].quantity = input;
    localStorage.setItem("product", JSON.stringify(productSavedToLocal));
  });
  updateTotalPrice();
}

//Function to update cart total price - NOT WORKING
function updateTotalPrice() {
  let eachCartItem = cartItems.getElementsByClassName("cart__item")[0];
  let total = 0;
  for (let i = 0; i < eachCartItem.length; i++) {
    let item = eachCartItem[i];
    let priceElement = eachCartItem
      .getElementsByClassName("cart__item__content__description")[0]
      .querySelector("cart__item__content__description:last-child");
    let quantityElement = document.getElementsByClassName("itemQuantity")[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementById("totalPrice").innerText = total;
}
