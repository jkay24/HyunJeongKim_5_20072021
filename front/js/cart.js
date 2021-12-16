//Bring up products added to cart local storage
let productSavedToLocal = JSON.parse(localStorage.getItem("product"));
console.log(productSavedToLocal);
const cartItems = document.getElementById("cart__items");

//Display products in cart on recap table
if (productSavedToLocal === null || sumQuantity(productSavedToLocal) === 0) {
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

//Delete items from cart - @once everything is deleted, localstorage shows [] instead of empty, is that a potential problem?
let deleteCartItems = document.getElementsByClassName("deleteItem");
for (let i = 0; i < deleteCartItems.length; i++) {
  let button = deleteCartItems[i];
  button.addEventListener("click", function (e) {
    let buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    //Now delete also from local storage
    productSavedToLocal.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(productSavedToLocal));
    //Then update total quantity in cart and refresh - @can I do this without reloading?
    sumQuantity();
    window.location.href = "cart.html";
  });
}

//Display total cart quantity
let totalQuantity = document.getElementById("totalQuantity");
function sumQuantity() {
  let sum = 0;
  for (let i = 0; i < productSavedToLocal.length; i++) {
    sum += productSavedToLocal[i].quantity;
  }
  return sum;
}
totalQuantity.innerHTML = sumQuantity(productSavedToLocal);

//update total cart quantity upon user modification
let quantityInput = document.getElementsByClassName("itemQuantity");
for (let i = 0; i < quantityInput.length; i++) {
  let input = quantityInput[i];
  input.addEventListener("change", function (e) {
    let input = e.target;
    debugger;
    input.innerHTML = input.value;
    console.log(quantityInput.length);
    console.log(i);
    document.querySelector(
      `.cart__item__content__settings__quantity:nth-child(${i + 1}) > p`
    ).innerHTML = "Qté : " + input.value;

    //now also update quantity in local storage
    productSavedToLocal[i].quantity = parseInt(input.value);
    localStorage.setItem("product", JSON.stringify(productSavedToLocal));
    //Then update total quantity in cart and refresh - @can I do this without reloading?
    sumQuantity();
    //window.location.href = "cart.html";
    updateTotalPrice();
  });
}

//Function to update cart total price - NOT WORKING
function updateTotalPrice() {
  let eachCartItem = cartItems.getElementsByClassName("cart__item")[0];
  let total = 0;
  for (let i = 0; i < eachCartItem.length; i++) {
    let item = eachCartItem[i];
    let priceElement = eachCartItem
      .getElementsByClassName("cart__item__content__description")[0]
      .querySelector(".cart__item__content__description:last-child");
    let quantityElement = document.getElementsByClassName("itemQuantity")[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementById("totalPrice").innerText = total;
}
