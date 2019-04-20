(function(item, cartCountElement) {
    [].forEach.call(item, element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        const productId = event.target.id; 
        cartAPI('/cart/add', productId)  
          .then(res => res.json())
          .then(function(cart) {
            cartCountElement.innerHTML = cart.count + ' items';
          });
      });
    });
  })(
    document.getElementsByClassName('product-card__buy--btn'),
    document.getElementsByClassName('nav__end-cart--count')[0]
  );

  function cartAPI(url, productId) {

    return (
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      })
    )
  }

  (function (item, cartCountElement) {
    [].forEach.call(item, element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        const productId = event.target.getAttribute('data-id');
        const oldqty = document.getElementById(`qty-${productId}`).innerHTML;
        if (oldqty > 1) {
          cartAPI('/cart/remove', productId)
            .then(res => res.json())
            .then(function (cart) {
              const cartItem = cart.items.filter(function (item) {
                return item.product.id === productId
              })
              cartCountElement.innerHTML = cart.count + ' items';
              document.querySelector('.cart-container--head_text').innerHTML =
                `My Cart (${cart.count} items)`
              document.getElementById(`qty-${productId}`).innerHTML = cartItem[0].count;
              document.getElementById(`totalPrice-${productId}`).innerHTML = ` Rs.${cartItem[0].totalPrice}`;
              document.getElementById('cart-total-price').innerHTML = cart.totalPrice;
            });
        } else {
          alert(`It's a Minimum qty can't reduce more  `)
        }
      });
    });
  })(
    document.getElementsByClassName('cart-item-detail__info--remove'),
    document.getElementsByClassName('nav__end-cart--count')[0]
  );
  (function (item, cartCountElement) {
    [].forEach.call(item, element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        const productId = event.target.getAttribute('data-id');
        cartAPI('/cart/add', productId)
          .then(res => res.json())
          .then(function (cart) {
            const cartItem = cart.items.filter(function (item) {
                return item.product.id === productId
              })
              cartCountElement.innerHTML = cart.count + ' items';
              document.querySelector('.cart-container--head_text').innerHTML =
                `My Cart (${cart.count} items)`
              document.getElementById(`qty-${productId}`).innerHTML = cartItem[0].count;
              document.getElementById(`totalPrice-${productId}`).innerHTML = ` Rs.${cartItem[0].totalPrice}`;
              document.getElementById('cart-total-price').innerHTML = cart.totalPrice;

          });
      });
    });
  })(
    document.getElementsByClassName('cart-item-detail__info--add'),
    document.getElementsByClassName('nav__end-cart--count')[0]
  );