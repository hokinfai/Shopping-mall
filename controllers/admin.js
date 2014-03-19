var format = require('util').format;var fs = require('fs');
var Product = require('../proxy').Product;
var config = require('../config').config;
var im = require('imagemagick');

exports.addNewItem = function  (req,res,next) {
  res.render('addNewItem', {title:'addNewItem'});
};

exports.createNewItem = function  (req, res, next) {
  console.log('in createNewItem'.func);
  console.log((config.imagePath+req.body.name.log));
  im.crop({srcPath:config.imagePath+req.body.name, dstPath:config.imagePath +'mini.' + req.body.name , width:100, height:100, quality:1}, function(err, stdout, stderr) {
    console.log(err);
  });
}

exports.saveOneItem = function  (req, res) {
  var imageURL = [];
  fs.mkdir(config.imagePath+req.body.name, function  (err) {
    if(err){
      console.log('The folder' + ('./images' + req.body.name + 'already exists').warn);
    }
    fs.readdir(config.imagePath, function  (err, files) {
      function isImage (element) {
        return /\.jpg$|\.png$|\.bmp$/.test(element);
      }
      var imgURL = [];
      imageURL = files.filter(isImage);
      imageURL.forEach(function  (ele) {
        fs.rename(config.imagePath+ele, config.imagePath + req.body.name + '/' + ele, function  (err) {
          if(err){
            throw err;
          }
          console.log(ele.log + ' are moved to folder ' + (req.body.name).log);
        })
      })
      var name = req.body.name;
      var category = req.body.category;
      var price = req.body.price;
      var detail = req.body.detail;
      function notMini (element) {
        return !(/.*mini.*/.test(element));
      }
      imageURL.filter(notMini).forEach(function  (elem) {
        imgURL.push( name +'/' + elem);
      });
      Product.newProductSave(name, price, category, detail,function  (err) {
        console.log('In function' + ' Product.newProductSave'.func);
        if (err) {
          req.flash('error', 'duplicate product');
          throw err;
        }
        req.flash('success', 'Product added successfully');
        return res.render('coffeeTable', {title:"product-detail", name:name, price:price, category:category, detail:detail, imgURL:imgURL});
      })

    }
    )
  });
};


exports.checkAdmin = function  (req,res,next) {
  if (!req.session.user.admin){
    req.flash('error', 'You are not administrator');
    return res.redirect('/');
  }
  next();
}

exports.displayImage = function  (req, res, next) {
  Product.getProductByName('ha', function  (err, img) {
    if(err){
      console.log('err');
    }
    res.contentType('image/png');
    res.send(img.image.data);
    console.log(img.image.data);
    return;
  });
}

exports.deleteImage = function (req, res, next){
  fs.unlinkSync(config.imagePath+req.body.name);
  fs.unlinkSync(config.imagePath+'mini.'+req.body.name);
  console.log('successfully delete' +  (config.imagePath + req.body.name).log);
}

exports.test = function  (req, res, next) {
  im.crop({
    srcPath: './images/luolita/53.png',
  dstPath: 'cropped.jpg',
  width: 800,
  height: 600,
  quality: 1,
  gravity: "North"
  }, function(err, stdout, stderr){
    // foo
  });
}
