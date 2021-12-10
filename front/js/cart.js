//Bring up products added to cart local storage
let productSavedToLocal = JSON.parse(localStorage.getItem("product"));
console.log(productSavedToLocal);
const cartItems = document.getElementById("cart__items");

//Display products in cart

if (productSavedToLocal === null) {
  //if cart is empty:
  cartItems.innerHTML = "Le panier est vide.";
} else {
  //if cart is not empty:
  let displayCartItems = [];
  for (let p = 0; p < productSavedToLocal.length; p++) {
    displayCartItems =
      displayCartItems +
      `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
    <img src=${productSavedToLocal[p].imageUrl}" alt="${productSavedToLocal[p].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productSavedToLocal[p].name}</h2>
        <p>${productSavedToLocal[p].color}</p>
        <p>${productSavedToLocal[p].price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${productSavedToLocal[p].quantity}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
    cartItems.innerHTML = displayCartItems;
    //the if below doesn't work... why?
    if (p === productSavedToLocal.length) {
      cartItems.innerHTML = displayCartItems;
    } else {
      console.log("That's it for now.");
    }
  }
}

//Delete items from cart
let deleteCartItems = document.getElementsByClassName("deleteItem");
console.log(deleteCartItems);
for (let i = 0; i < deleteCartItems.length; i++) {
  let button = deleteCartItems[i];
  button.addEventListener("click", function (event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
  });
}

//Update cart quantity
let quantityInput = document.getElementsByClassName("itemQuantity");
for (var i = 0; i < quantityInput.length; i++) {
  let input = quantityInput[i];
  input.addEventListener("change", function (event) {
    let input = event.target;
  });
  updateTotalPrice();
}

//Function to update cart total price
function updateTotalPrice() {
  let eachCartItem = cartItems.getElementsByClassName("cart__item");
  let total = 0;
  for (var i = 0; i < eachCartItem.length; i++) {
    let item = eachCartItem[i];
    let priceElement = eachCartItem
      .getElementsByClassName("cart__item__content__description")[0]
      .querySelector("cart__item__content__description:last-child");
    let quantityElement = document.getElementsByClassName("itemQuantity")[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementById("totalPrice").innerText = "€" + total;
}
