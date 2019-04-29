function cartAPI(url, productId) {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ productId })
  });
}

(function(cartCountElem, productList, isMatchProduct) {
  productList &&
    productList.addEventListener("click", event => {
      event.stopPropagation();
      event.preventDefault();
      if (isMatchProduct(event.target)) {
        const productId = event.target.id;
        cartAPI("/cart/add", productId)
          .then(res => res.json())
          .then(function(cart) {
            cartCountElem.innerHTML = cart.count + " items";
          });
      }
    });
})(
  document.getElementsByClassName("nav-section__end-cart--count")[0],
  document.getElementsByClassName("product-list")[0],
  function(target) {
    return target.matches(".product-card__buy--btn");
  }
);
// console.log(document.getElementsByClassName("cart-container"));
(function(cartItems, cartCountElement, cartCountElementMobile, checkMethodType) {
  cartItems &&
    cartItems.addEventListener("click", event => {
      event.stopPropagation();
      event.preventDefault();
      const eventtype = checkMethodType(event.target);
      if (eventtype) {
        const productId = event.target.getAttribute("data-id");
        cartAPI(eventtype.api, productId)
          .then(res => res.json())
          .then(function(cart) {
            const cartItem = cart.items.filter(function(item) {
              return item.product.id === productId;
            });
            cartCountElement.innerHTML = cart.count + " items";
            cartCountElementMobile.innerHTML = cart.count;
            document.getElementById('cart-heading-text').innerHTML = `My Cart (${cart.count} items)`;
            document.getElementById(`qty-${productId}`).innerHTML =cartItem[0].count;
            document.getElementById(`totalPrice-${productId}`).innerHTML = ` Rs.${cartItem[0].totalPrice}`;
            document.getElementById("cart-total-price").innerHTML = cart.totalPrice;
          });
      }
    });
 })(
  document.getElementsByClassName("cart-container")[0],
  document.getElementsByClassName("nav-section__end-cart--count")[0],
  document.getElementsByClassName("nav-section__end-cart--count-mobile")[0],
  function(target) {
    if (target.matches(".cart-item-detail__info--remove")) {
      return { type: "remove", api: "/cart/remove" };
    }
    if (target.matches(".cart-item-detail__info--add")) {
      return { type: "add", api: "/cart/add" };
    }
    return false;
  }
);
