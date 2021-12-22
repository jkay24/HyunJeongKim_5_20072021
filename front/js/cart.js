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
            <p>Qté : ${values.quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
              values.quantity
            }">
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

//Delete items from cart
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
    //Then update total quantity in cart and refresh - @can I do this without reloading?
    sumQuantity();
    window.location.href = "cart.html";
    //If all items have been deleted, remove product key from local storage so above function can display "Le panier est vide." message
    if (sumQuantity(productSavedToLocal) === 0) {
      localStorage.removeItem("product");
    }
    sumTotalPrice();
  });
}

//Display total cart quantity
let totalQuantity = document.getElementById("totalQuantity");
function sumQuantity() {
  let sum = 0;
  //If cart is empty:
  if ((productSavedToLocal === null) | (productSavedToLocal === [])) {
    return "0";
  }
  //If cart is not empty: calculate and display sum
  else {
    for (let i = 0; i < productSavedToLocal.length; i++) {
      sum += productSavedToLocal[i].quantity;
    }
    return sum;
  }
}
totalQuantity.innerHTML = sumQuantity();

//Update total cart quantity upon user modification
let quantityInput = document.getElementsByClassName("itemQuantity");
for (let i = 0; i < quantityInput.length; i++) {
  let input = quantityInput[i];
  input.addEventListener("change", function (e) {
    e.preventDefault();
    let input = e.target;
    input.innerHTML = input.value;
    //document.querySelector(
    //   `.cart__item__content__settings__quantity:nth-child(${i + 1}) > p`
    //).innerHTML = "Qté : " + input.value;
    //

    //Then also update quantity in local storage
    productSavedToLocal[i].quantity = parseInt(input.value);
    localStorage.setItem("product", JSON.stringify(productSavedToLocal));
    //Then update total quantity in cart and refresh - @can I do this without reloading?
    sumQuantity();
    window.location.href = "cart.html";
    sumTotalPrice();
  });
}

//Display cart total price
let displayTotalPrice = document.getElementById("totalPrice");
function sumTotalPrice() {
  let totalPrice = 0;
  //If cart is empty:
  if (productSavedToLocal !== null) {
    for (let i = 0; i < productSavedToLocal.length; i++) {
      totalPrice +=
        productSavedToLocal[i].price * productSavedToLocal[i].quantity;
    }
    return totalPrice;
  }
}
document.getElementById("totalPrice").innerHTML = numberWithSpaces(
  sumTotalPrice()
);

//Function to display numbers 999+ with spaces (Fr style)
function numberWithSpaces(x) {
  if (productSavedToLocal === null) {
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

//Functions to check validity of order form input values

//Same test for first and last names and city
const regExNamesCity = (value) => {
  return /^[a-zA-Z\s]{2,20}$/.test(value);
};
//Same error msg for first and last names and city
const textAlert = (value) => {
  return `Veuillez saisir un ${value} valide entre 2 à 20 lettres, sans chiffre ni symbole.`;
};
//Test for address
const regExAddress = /^\d+\s[A-z]+\s[A-z]+/;
//Test for email address
const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function formValidationFirstName() {
  if (regExNamesCity(firstName.value)) {
    firstNameError.innerHTML = "";
    return true;
  } else {
    firstNameError.innerHTML = textAlert("prénom");
    return false;
  }
}

function formValidationLastName() {
  if (regExNamesCity(lastName.value)) {
    lastNameError.innerHTML = "";
    return true;
  } else {
    lastNameError.innerHTML = textAlert("nom");
    return false;
  }
}

function formValidationCity() {
  if (regExNamesCity(city.value)) {
    cityError.innerHTML = "";
    return true;
  } else {
    cityError.innerHTML =
      "Veuillez saisir le nom d'une ville valide entre 2 à 20 lettres, sans chiffre ni symbole.";
    return false;
  }
}

function formValidationAddress() {
  if (regExAddress.test(address.value)) {
    addressError.innerHTML = "";
    return true;
  } else {
    addressError.innerHTML =
      "Veuillez saisir une adresse valide avec le numéro et le nom de la rue, sans ponctuation.";
    return false;
  }
}

function formValidationEmail() {
  if (regExEmail.test(email.value)) {
    emailError.innerHTML = "";
    return true;
  } else {
    emailError.innerHTML = "Veuillez saisir une adresse mail valide.";
    return false;
  }
}

//Recover form input values, save to localstorage and send to server along with items in cart
orderButton.addEventListener("click", function (e) {
  e.preventDefault();
  //1. Object to which valid user answers will be saved once they click "commander" button
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  console.log(contact);
  //2. Add answers to local storage if values correctly entered
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
  //3. Save form input values along with products in cart into an object in prep to send to server
  function createBodyOrder() {
    let products = [];
    for (i = 0; i < productSavedToLocal.length; i++) {
      products.push(productSavedToLocal[i].productId);
    }
    return JSON.stringify({ contact, products });
  }
  //4. Send "orderCart" object to server
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: createBodyOrder(),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      debugger;
      console.log(data);
      //  localStorage.clear();
      window.location.href = `./confirmation.html?id=${data.orderId}`;
    })
    // Catch error
    .catch(function (err) {
      console.log(err + "with clearing local storage");
      alert("Problem with order confirmation.");
    });
});
