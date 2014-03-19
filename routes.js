var home = require('./controllers/home');
var user = require('./controllers/user');
var item = require('./controllers/item');
var admin = require('./controllers/admin');

module.exports = function  (app) {
  //映射方法到routes.index
  app.get('/', home.homepage);
  app.get('/register', home.checkNotLogin);
  app.get('/register',home.registerPage);
  app.post('/register',home.register);
  app.get('/register', home.checkNotLogin);
  app.get('/login',home.loginPage);
  app.post('/login',home.login);
  app.get('/register', home.checkLogin);
  app.get('/logout', home.logout);
  app.get('/food', item.food);
  app.get('/laptop', item.laptop);
  app.get('/mobile', item.mobile);
  app.get('/bedroom', item.bedroom);
  app.get('/changePassword', home.checkLogin);
  app.get('/changePassword', user.changePassword);
  app.get('/addNewItem', home.checkLogin);
  app.get('/addNewItem', admin.checkAdmin);
  app.get('/addNewItem', admin.addNewItem);
  app.post('/addNewItem', admin.createNewItem);
  //the following are tests
  app.post('/deleteImage', admin.deleteImage);
  app.post('/saveOneItem', admin.saveOneItem);
  app.get('/myCart', home.myCart);
  app.get('/test', admin.test);
  app.get('/coffeeTable', item.coffeeTable);
}

