//Adding data to local storage for items added to cart
let productSavedToLocal = JSON.parse(localStorage.getItem("product"));
console.log(productSavedToLocal);

//Function to delete items from cart
let deleteCartItems = document.getElementsByClassName("deleteItem");
console.log(deleteCartItems);
for (var i = 0; i < deleteCartItems.length; i++) {
  let button = deleteCartItems[i];
  button.addEventListener("click", function (event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
  });
}

//Function to update cart quantity
let quantityInputs = document.getElementsByClassName("itemQuantity");
for (var i = O; i < quantityInput.length; i++) {
  let input = quantityInput[i];
  input.addEventListener("change", function (event) {
    let input = event.target;
  });
  updateTotalPrice();
}

//Function to update cart total price
function updateTotalPrice() {
  let cartItemContainer = document.getElementById("cart__items");
  let cartItem = cartItemContainer.getElementsByClassName("cart__item");
  let total = 0;
  for (var i = O; i < cartItem.length; i++) {
    let item = cartItem[i];
    let priceElement = cartItem
      .getElementsByClassName("cart__item__content__description")[0]
      .querySelector("cart__item__content__description:last-child");
    let quantityElement = document.getElementsByClassName("itemQuantity")[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementById("totalPrice").innerText = "€" + total;
}
