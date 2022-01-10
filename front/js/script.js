// Async function to fetch API and show what to do with data
async function getApi(url) {
  // Storing response
  const response = await fetch(url)
    // Storing data in form of JSON
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      console.log(data);
      showItems(data);
    })
    // Catch error
    .catch(function (err) {
      console.log(err);
    });
}
// Call product API
getApi("http://127.0.0.1:3000/api/products");

//Function to show items on page

function showItems(data) {
  let sectionItems = document.getElementById("items");
  for (let i in data) {
    //Create a with link by productID
    let productLink = document.createElement("a");
    productLink.href = `./product.html?id=${data[i]._id}`;
    sectionItems.appendChild(productLink);

    //Create article as child of each a link
    let productCard = document.createElement("article");
    productLink.appendChild(productCard);

    //Create img as child of each product card
    let productImg = document.createElement("img");
    productImg.alt = data[i].altTxt;
    productImg.src = data[i].imageUrl;
    productCard.appendChild(productImg);

    //Create h3 name as child of each product card
    let productName = document.createElement("h3");
    productName.className = "productName";
    productName.innerHTML = `${data[i].name}`;
    productCard.appendChild(productName);

    //Create p description as child of each product card
    let productDescription = document.createElement("p");
    productDescription.className = "productDescription";
    productDescription.innerHTML = `${data[i].description}`;
    productCard.appendChild(productDescription);
  }
}
