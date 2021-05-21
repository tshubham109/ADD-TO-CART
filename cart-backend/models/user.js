const Sequelize=require('sequelize');
const db=require('../database');

const User=db.define('user',{

    userId:{
        type: Sequelize.STRING,
     }
     ,
     password:{
        type: Sequelize.STRING,
     },
    
     role:{
        type:Sequelize.INTEGER
     }

})

module.exports=User