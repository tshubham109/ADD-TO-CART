const sequelize=require("./database")
sequelize.sync({force:true}).then(()=>console.log("db is ready"))


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
//const Products=require("./models/products");
const Product = require("./models/products");
const CartItem = require("./models/cart");


const app = express();
const PRODUCT_DATA_FILE = path.join(__dirname, 'server-product-data.json');
const CART_DATA_FILE = path.join(__dirname, 'server-cart-data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/api',require('./routes/products'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json());

CartItem.hasMany(Product,{
});
Product.belongsTo(CartItem,{
})




app.post('/addproduct',async(req,res)=>{
 
  if(req.body.id!==null)
    Product.create((req.body)).then(product=>res.send(product)).catch(err=>console.log(err));
   
 }
 )
 app.get('/allcartitems',(req,res)=>{
   CartItem.findAll().then(products=>res.send(products)).catch(err=>res.send(`error occured : ${err.message}`));
 })

 app.post('/addtocart',(req,res)=>{
    console.log(req.body);

    CartItem.create(({})).then(cart=>{
      req.body.map(product=>Product.create({title:product.title,cartId:cart.id,
      name:product.name,
    description:product.description}))


      res.send(cart)}
    ).catch(err=>console.log(err));
   
 }
 )
 app.get('/allproduct',(req,res)=>{
   Product.findAll().then(products=>res.send(products)).catch(err=>res.send(`error occured : ${err.message}`));
 })
 app.delete('/deletecartitem',(req,res)=>{
  CartItem.destroy({
    where: {
        id:req.body.id
    }
  }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
   if(rowDeleted === 1){
      console.log('Deleted successfully');
      res.send("deleted successfully!")
    }
  }, function(err){
     console.log(err); 
  });
 })

app.delete('/deletecarts',(req,res)=>{
  console.log("yyaa")
  CartItem.destroy({
    where:{},
    truncate:false
   
  }).then(()=>res.send()).catch(err=>console.log(err))
 
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
//app.use('/api',require('./routes/products'))




app.listen(app.get('port'), () => {
    
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
