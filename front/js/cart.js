localStorage.setItem("_id", "107fb5b75607497b96722bda5b504926");

function displayCart(cartData) {
  let cartItems = "";
  data.map((values) => {
    cartItems += `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
    <img src="${values.imageUrl}" alt="${values.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${values.name}</h2>
        <p>${values.color}</p>
        <p>${values.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  });
  document.getElementById("cart__items").innerHTML = cartItems;
}
