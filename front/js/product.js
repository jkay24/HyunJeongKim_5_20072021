//Use URLSearchParams to get product ID
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Call API per product ID
fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (eachItemData) {
    displayInfo(eachItemData);
    addToCart(eachItemData);
  })
  // Catch error
  .catch(function (err) {
    console.log(err);
  });

//Function to show info per product
function displayInfo(eachItemData) {
  document.getElementById("title").innerHTML = eachItemData.name;
  document.getElementById("price").innerHTML = numberWithSpaces(
    eachItemData.price
  );
  document.getElementById("description").innerHTML = eachItemData.description;
  let newImg = document.createElement("img");
  newImg.alt = eachItemData.altTxt;
  newImg.src = eachItemData.imageUrl;
  document.getElementsByClassName("item__img")[0].appendChild(newImg);
  for (let i = 0; i < eachItemData.colors.length; i++) {
    let newOption = document.createElement("option");
    newOption.value = eachItemData.colors[i];
    newOption.text = eachItemData.colors[i];
    document.getElementById("colors").appendChild(newOption);
  }
}

//Function to save user selections (color and quantity) and add to cart (local storage)
function addToCart(eachItemData) {
  const addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", (e) => {
    e.preventDefault();
    const userColorChoice = document.getElementById("colors").value;
    const userQuantityChoice = document.getElementById("quantity").value;
    //1. Check first if quantity input is 0 or negative - if so, display alert and then refresh (do not add to cart)
    if (userQuantityChoice <= 0) {
      alert(
        "Il n'est pas possible d'ajouter un nombre d'articles inférieur à zéro."
      );
      location.reload();
    } else {
      //2. If all good, add products to cart with user selections for color and quantity
      let selectedProduct = {
        name: eachItemData.name,
        productId: eachItemData._id,
        quantity: parseInt(userQuantityChoice),
        color: userColorChoice,
        imgSrc: eachItemData.imageUrl,
        imgTxt: eachItemData.altTxt,
        price: eachItemData.price,
      };
      console.log(selectedProduct);
      //3. Function to add user selections to local storage
      let productSavedToLocal = JSON.parse(localStorage.getItem("product"));
      function addToLocalStorage() {
        productSavedToLocal.push(selectedProduct);
        localStorage.setItem("product", JSON.stringify(productSavedToLocal));
      }
      //if there's already something in local storage, add object to existing array
      if (productSavedToLocal) {
        //first check if item with same ID and color has already been selected - if so increment quantity, so that there are no duplicates
        const ifExists = productSavedToLocal.find(
          (element) =>
            element.productId == selectedProduct.productId &&
            element.color == selectedProduct.color
        );
        if (ifExists) {
          ifExists.quantity = ifExists.quantity + selectedProduct.quantity;
          localStorage.setItem("product", JSON.stringify(productSavedToLocal));
          return;
        }
        addToLocalStorage();
      }
      //if there was nothing in local storage, start new cart
      else {
        productSavedToLocal = [];
        addToLocalStorage();
      }
    }
  });
}

//Function to display numbers 999+ with spaces (Fr style)
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
