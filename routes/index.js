const express = require('express');
const router = express.Router();
const banners = require('../public/data/banners/index.get.json');
const prodCategories = require('../public/data/categories/index.get.json');
const products = require('../public/data/products/index.get.json');
const  cart =  {
  items: [],
  count: 0
}

router.get('/', function(req, res, next) {
  ActiveBanners = banners.filter(banner => banner.isActive);
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('index', {banners:ActiveBanners,categories:ActiveCategories,cart, pageName:'home'});
});

router.get('/products', function(req, res, next) {
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('products', {products,categories:ActiveCategories,cart,pageName:'products'});
});

router.get('/products/:id', function(req, res, next) {
  const Id = req.params.id;
  ActiveProducts = products.filter(products => (products.category===Id))
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('products', { products: ActiveProducts,categories:ActiveCategories,cart,pageName:'products'});
});

router.get('/signIn', function(req, res, next) {
  res.render('login',{cart ,pageName:'register'});
});

router.get('/signUp', function(req, res, next) {
  res.render('register',{cart,pageName:'register'});
});
router.get('/cart', function(req, res, next) {
  res.render('cart',{cart,pageName:'cart'});
});

// cart operations 
router.post('/cart/:operation', function(req, res) {
  const operation = req.params.operation;
  let count = 0;
  if (operation === 'add') {
    count = 1;
  } else if (operation === 'remove') {
    count = -1;
  } else {
    return res.status(404).send('Not Found');
  }
  const product = products.find(val => val.id === req.body.productId);
  if (product) {
    const oldItem = cart.items.find(item => item.product.id === product.id);
    if (oldItem) {
      oldItem.count += count;
      cart.count += count;
      oldItem.totalPrice= oldItem.count * oldItem.product.price
      if (oldItem.count <= 0) {
        cart.items.splice(cart.items.findIndex(item => item.product.id === product.id), 1);
      }
    } else {
      cart.items.push({ product, count ,totalPrice : product.price *count });
      cart.count += count;
      
    }
    return res.send(cart);
  }
  return res.status(404).send('Not Found');
});


module.exports = router;
