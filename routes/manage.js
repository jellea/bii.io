var redis = require('redis') 
var client = redis.createClient()

exports.get = function(req, res){
  if(req.user){
    params = {
      username: req.user.username,
      broadcastEnabled: req.user.broadcastUpdate,
      broadcastMsg: req.user.updateMsg,
      oldBio: req.user.oldBio
    }
    res.render('manage', params)
  }else{
    res.redirect('/')
  }
}

exports.post = function(req, res){
  console.log(req.user)
  if(req.body.action==="msgSet"){
    if(req.body.payload===""){
      client.hmset(req.user.username, {broadcastEnabled:false},
            function(err){if(!err){res.send(200)}else{res.send(500)}})
    }else{
      client.hmset(req.user.username, {broadcastEnabled:true, broadcastMsg: req.body.payload},
            function(err){if(!err){res.send(req.body.payload)}else{res.send(500)}})
    }
  }else if(req.body.action==="revertBio"){
    if(req.body.payload===true){
      res.send(200)
    }else{
      res.send(502)
    }
  }else if(req.body.action==="deactiveBiiio"){
    if(req.body.payload===true){
      client.hmset(req.user.username, {enabled: false},
          function(err){if(!err){res.send(req.body.payload)}else{res.send(500)}})
    }else{
      res.send(502)
    }

  }else{
    res.send(419)
  }
}
