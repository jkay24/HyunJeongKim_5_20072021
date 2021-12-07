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
      console.log("Une erreur est survenue");
    });
}
// Call product API
getApi("http://127.0.0.1:3000/api/products");

//Function to show items on page
function showItems(data) {
  let itemCards = "";
  data.map((values) => {
    itemCards += `
      <a href="./product.html?id=${values._id}">
      <article>
        <img src="${values.imageUrl}" alt="${values.altTxt}">
        <h3 class="productName">${values.name}</h3>
        <p class="productDescription">${values.description}</p>
      </article>
      </a>`;
  });
  document.getElementById("items").innerHTML = itemCards;
}

//Display all id nos for items?
fetch("http://127.0.0.1:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    for (let idNo of data) {
      console.log(idNo._id);
    }
  });
