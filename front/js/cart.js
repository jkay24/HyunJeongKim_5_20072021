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
  for (let i in productSavedToLocal) {
    //Create article cart__item as child of cartItems section
    let cart__item = document.createElement("article");
    cart__item.className = "cart__item";
    cart__item.setAttribute("data-id", `${productSavedToLocal[i].productId}`);
    cart__item.setAttribute("data-color", `${productSavedToLocal[i].color}`);
    cartItems.appendChild(cart__item);

    //Create img div as child of article
    let cart__item__img = document.createElement("div");
    cart__item__img.className = "cart__item__img";
    cart__item.appendChild(cart__item__img);

    //Create img as child of img div
    let itemImage = document.createElement("img");
    itemImage.alt = productSavedToLocal[i].imgTxt;
    itemImage.src = productSavedToLocal[i].imgSrc;
    cart__item__img.appendChild(itemImage);

    //Create content div as child of article
    let cart__item__content = document.createElement("div");
    cart__item__content.className = "cart__item__content";
    cart__item.appendChild(cart__item__content);

    //Create descr div as child of content div
    let cart__item__content__description = document.createElement("div");
    cart__item__content__description.className =
      "cart__item__content__description";
    cart__item__content.appendChild(cart__item__content__description);

    //Create h2 as child of descr div
    let itemName = document.createElement("h2");
    itemName.innerHTML = `${productSavedToLocal[i].name}`;
    cart__item__content__description.appendChild(itemName);

    //Create color p as child of descr div
    let itemColor = document.createElement("p");
    itemColor.innerHTML = `${productSavedToLocal[i].color}`;
    cart__item__content__description.appendChild(itemColor);

    //Create price p as child of descr div
    let itemPrice = document.createElement("p");
    itemPrice.innerHTML = `${numberWithSpaces(productSavedToLocal[i].price)} ???`;
    cart__item__content__description.appendChild(itemPrice);

    //Create content settings div as child of content div
    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.className = "cart__item__content__settings";
    cart__item__content.appendChild(cart__item__content__settings);

    //Create quantity div as child of content settings div
    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.className =
      "cart__item__content__settings__quantity";
    cart__item__content__settings.appendChild(
      cart__item__content__settings__quantity
    );

    //Create qty p as child of quantity div
    let qte = document.createElement("p");
    qte.innerHTML = `Qt?? : `;
    cart__item__content__settings__quantity.appendChild(qte);

    //Create input as child of qty p
    let numberInput = document.createElement("input");
    numberInput.setAttribute("type", "number");
    numberInput.className = "itemQuantity";
    numberInput.setAttribute("name", "itemQuantity");
    numberInput.setAttribute("min", "1");
    numberInput.setAttribute("max", "100");
    numberInput.setAttribute("value", `${productSavedToLocal[i].quantity}`);
    qte.appendChild(numberInput);

    //Create delete div as child of content settings div
    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.className =
      "cart__item__content__settings__delete";
    cart__item__content__settings.appendChild(
      cart__item__content__settings__delete
    );

    //Create delete p as child of delete div
    let deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.innerHTML = `Supprimer`;
    cart__item__content__settings__delete.appendChild(deleteItem);
  }
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
    //If all items have been deleted, disable order button
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
    //1. Check first if quantity input is 0 or negative - if so, display alert and then refresh (do not update localstorage)
    if (input.value <= 0) {
      alert(
        "Il n'est pas possible d'avoir un nombre d'articles ??gal ou inf??rieur ?? z??ro. Veuillez supprimer l'article si vous en  voulez plus."
      );
      location.reload();
    } else {
      //Then also update quantity in local storage
      productSavedToLocal[i].quantity = parseInt(input.value);
      localStorage.setItem("product", JSON.stringify(productSavedToLocal));
      //Then update total quantity and price
      sumQuantity();
      sumTotalPrice();
    }
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
  return `Veuillez saisir un ${value} valide entre 2 ?? 20 lettres, sans chiffre ni symbole.`;
};

//Test for address
const regExAddress = (value) => {
  return /^\d+\s[A-z]+\s[A-z]+/.test(value);
};

//Test for email address
const regExEmail = (value) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

//Functions showing what to do when input is not valid
function formValidationFirstName() {
  const isCorrect = regExNamesCity(firstName.value);
  firstNameError.innerHTML = isCorrect ? "" : textAlert("pr??nom");
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
    : "Veuillez saisir le nom d'une ville valide entre 2 ?? 20 lettres, sans chiffre ni symbole.";
  return isCorrect;
}

function formValidationAddress() {
  const isCorrect = regExAddress(address.value);
  addressError.innerHTML = isCorrect
    ? ""
    : "Veuillez saisir une adresse valide avec le num??ro et le nom de la rue, sans ponctuation.";
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
  if (!productSavedToLocal || productSavedToLocal.length === 0) {
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
