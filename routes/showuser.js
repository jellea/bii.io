'use strict'

module.exports = function(req, res){
  res.render('showuser', {accountname: "hooooi", photo:"http://lorempixel.com/100/100/animals/"});
};
