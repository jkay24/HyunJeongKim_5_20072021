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
    displayImg(eachItemData);
  })
  // Catch error
  .catch(function (err) {
    console.log("Une erreur est survenue");
  });

//Function to show info per product (all but imgs)
function displayInfo(eachItemData) {
  document.getElementById("title").innerHTML = eachItemData.name;
  document.getElementById("price").innerHTML = eachItemData.price;
  document.getElementById("description").innerHTML = eachItemData.description;
  for (var i = 0; i < eachItemData.colors.length; i++) {
    let newOption = document.createElement("option");
    newOption.value = eachItemData.colors[i];
    newOption.text = eachItemData.colors[i];
    document.getElementById("colors").appendChild(newOption);
  }
}

//Function to show img per product - ERROR!
function displayImg(eachItemData) {
  let imgAttributes = "";
  eachItemData.map((values) => {
    imgAttributes = `<img src="${values.imageUrl}" alt="${values.altTxt}">`;
  });
  document.getElementsByClassName("item__img").innerHTML = imgAttributes;
}
