'use strict'
var redis = require('redis') 
var client = redis.createClient()

module.exports = function(req, res){
  client.hgetall(req.params.twuser, function(err, user){
    if (user === null){
      res.send(404, 'User not found')
    }
    else{
      res.render('changeuser', {accountname: user.username, photo: user.photo});
    }
  })
  
};
