//********************DISPLAY OBJECTS IN CART AND ALLOW MANIPULATION BEFORE ORDERING**************

//Bring up products added to cart local storage
let productSavedToLocal = JSON.parse(localStorage.getItem("product"));
const cartItems = document.getElementById("cart__items");

//DISPLAY PRODUCTS IN CART ON RECAP TABLE
if (productSavedToLocal === null) {
  //if cart is empty:
  cartItems.innerHTML = "Le panier est vide.";
} else {
  //if cart is not empty:
  let displayCartItems = [];
  productSavedToLocal.map((values) => {
    displayCartItems += `
      <article class="cart__item" data-id="${values.productId}" data-color="${
      values.color
    }">
      <div class="cart__item__img">
      <img src="${values.imgSrc}" alt="${values.imgTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${values.name}</h2>
          <p>${values.color}</p>
          <p>${numberWithSpaces(values.price)} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : 
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
              values.quantity
            }"></p>
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

//SHOW QTY AND PRICE TOTALS

//Display total cart quantity
let totalQuantity = document.getElementById("totalQuantity");
sumQuantity();
function sumQuantity() {
  let sum = 0;
  if (productSavedToLocal) {
    for (let i = 0; i < productSavedToLocal.length; i++) {
      sum += productSavedToLocal[i].quantity;
    }
  }
  totalQuantity.innerHTML = sum || "0";
}

//Display total cart price
let displayTotalPrice = document.getElementById("totalPrice");
sumTotalPrice();
function sumTotalPrice() {
  let totalPrice = 0;
  if (productSavedToLocal) {
    for (let i = 0; i < productSavedToLocal.length; i++) {
      totalPrice +=
        productSavedToLocal[i].price * productSavedToLocal[i].quantity;
    }
  }
  displayTotalPrice.innerHTML = numberWithSpaces(totalPrice) || "0";
}

//MODIFY CART ITEMS (DELETE AND MODIFY QTY) AND UPDATE QTY AND PRICE TOTALS

//Allow deletion of items from cart
let deleteCartItems = document.getElementsByClassName("deleteItem");
for (let i = 0; i < deleteCartItems.length; i++) {
  let button = deleteCartItems[i];
  button.addEventListener("click", function (e) {
    e.preventDefault();
    let buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    //Then delete also from local storage
    productSavedToLocal.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(productSavedToLocal));
    //Then update total quantity and price in cart
    sumQuantity();
    sumTotalPrice();
    //If all items have been deleted, remove product key from local storage so above function can display "Le panier est vide." message
    if (totalQuantity.innerHTML == "0") {
      localStorage.removeItem("product");
      cartItems.innerHTML = "Le panier est vide.";
    }
    //If all items have been deleted, disable order button - @NOT WORKING
    disableOrder();
  });
}

//Update total cart quantity upon user modification
let quantityInput = document.getElementsByClassName("itemQuantity");
for (let i = 0; i < quantityInput.length; i++) {
  let input = quantityInput[i];
  input.addEventListener("change", function (e) {
    e.preventDefault();
    let input = e.target;
    input.innerHTML = input.value;
    //Then also update quantity in local storage
    productSavedToLocal[i].quantity = parseInt(input.value);
    localStorage.setItem("product", JSON.stringify(productSavedToLocal));
    //Then update total quantity and price
    sumQuantity();
    sumTotalPrice();
  });
}

//Function to display numbers 999+ with spaces (Fr style)
function numberWithSpaces(x) {
  if (!productSavedToLocal) {
    return "0";
  }
  //If cart is not empty:
  else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}

//**********************************ORDER FORM****************************************************
const orderButton = document.getElementById("order");
const firstName = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastName = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");
const address = document.getElementById("address");
const addressError = document.getElementById("addressErrorMsg");
const city = document.getElementById("city");
const cityError = document.getElementById("cityErrorMsg");
const email = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");

//FUNCTIONS TO CONTROL VALIDITY OF FORM INPUT VALUES

//Same test for first and last names and city
const regExNamesCity = (value) => {
  return /^[a-zA-Z\s]{2,20}$/.test(value);
};
//Same error msg for first and last names
const textAlert = (value) => {
  return `Veuillez saisir un ${value} valide entre 2 à 20 lettres, sans chiffre ni symbole.`;
};
//Test for address
const regExAddress = /^\d+\s[A-z]+\s[A-z]+/;
//Test for email address
const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function formValidationFirstName() {
  const isCorrect = regExNamesCity(firstName.value);
  firstNameError.innerHTML = isCorrect ? "" : textAlert("prénom");
  return isCorrect;
}

function formValidationLastName() {
  const isCorrect = regExNamesCity(lastName.value);
  lastNameError.innerHTML = isCorrect ? "" : textAlert("nom");
  return isCorrect;
}

function formValidationCity() {
  const isCorrect = regExNamesCity(city.value);
  cityError.innerHTML = isCorrect
    ? ""
    : "Veuillez saisir le nom d'une ville valide entre 2 à 20 lettres, sans chiffre ni symbole.";
  return isCorrect;
}

function formValidationAddress() {
  const isCorrect = regExAddress(address.value);
  addressError.innerHTML = isCorrect
    ? ""
    : "Veuillez saisir une adresse valide avec le numéro et le nom de la rue, sans ponctuation.";
  return isCorrect;
}

function formValidationEmail() {
  const isCorrect = regExEmail(email.value);
  emailError.innerHTML = isCorrect
    ? ""
    : "Veuillez saisir une adresse mail valide.";
  return isCorrect;
}

//RECOVER ORDER FORM INPUT VALUES, SAVE TO LOCALSTORAGE AND SEND TO SERVER

//If cart is empty, order button is disabled
disableOrder();
function disableOrder() {
  if (!productSavedToLocal) {
    orderButton.setAttribute("disabled", true);
    orderButton.style.cursor = "not-allowed";
  }
}

//Function to save form input values along with products in cart into an object and stringify
function createBodyOrder(contact) {
  let products = [];
  for (i = 0; i < productSavedToLocal.length; i++) {
    products.push(productSavedToLocal[i].productId);
  }
  return JSON.stringify({ contact, products });
}

//Function to save input values and send with cart items to server
orderButton.addEventListener("click", function (e) {
  e.preventDefault();
  //Object to which valid user answers will be saved once they click "commander" button
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  //1. Add answers to local storage if values correctly entered
  if (
    formValidationFirstName() &&
    formValidationLastName() &&
    formValidationCity() &&
    formValidationAddress() &&
    formValidationEmail()
  ) {
    localStorage.setItem("orderContact", JSON.stringify(contact));
  } else {
    alert("Veuillez bien remplir le formulaire.");
    return;
  }
  //2. Send to server and redirect to confirmation page with order ID
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: createBodyOrder(contact),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      localStorage.clear();
      window.location.href = `./confirmation.html?id=${data.orderId}`;
    })
    // Catch error
    .catch(function (err) {
      console.log(err + "with clearing local storage");
      alert("Problem with order confirmation.");
    });
});
