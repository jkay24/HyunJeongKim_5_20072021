//Use URLSearchParams
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
  document.getElementById("price").innerHTML = eachItemData.price;
  document.getElementById("description").innerHTML = eachItemData.description;
  let newImg = document.createElement("img");
  newImg.alt = eachItemData.altTxt;
  newImg.src = eachItemData.imageUrl;
  document.getElementsByClassName("item__img")[0].appendChild(newImg);
  for (var i = 0; i < eachItemData.colors.length; i++) {
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
    //1. Add products to cart with user selections for color and quantity
    const userColorChoice = document.getElementById("colors").value;
    const userQuantityChoice = document.getElementById("quantity").value;
    let selectedProduct = {
      name: eachItemData.name,
      productId: eachItemData._id,
      quantity: userQuantityChoice,
      color: userColorChoice,
      imgSrc: eachItemData.imageUrl,
      imgTxt: eachItemData.altTxt,
      price: eachItemData.price,
    };
    console.log(selectedProduct);
    //2. Function to add user selections to local storage
    let productSavedToLocal = JSON.parse(localStorage.getItem("product"));
    function addToLocalStorage() {
      productSavedToLocal.push(selectedProduct);
      localStorage.setItem("product", JSON.stringify(productSavedToLocal));
    }
    //NOT WORKING - if there's already something in local storage, add object to existing array
    if (productSavedToLocal) {
      addToLocalStorage();
      if (
        productSavedToLocal.some(
          (selectedProduct) =>
            selectedProduct.id === eachItemData._id &&
            selectedProduct.color === userColorChoice
        )
      ) {
        console.log("Product already in cart.");
      } else {
        console.log("Product added for first time.");
      }
    }
    //if there was nothing in local storage, start fresh
    else {
      productSavedToLocal = [];
      addToLocalStorage();
    }
  });
}
