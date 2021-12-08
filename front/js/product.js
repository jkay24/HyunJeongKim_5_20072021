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
