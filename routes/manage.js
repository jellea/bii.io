
/*
 * GET users listing.
 */

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
  if(req.query.action=="msgSet"){
    if(req.query.payload===""){
      client.hmset(req.user.username, {broadcastEnabled:false},
            function(err){if(!err){res.send(200)}else{res.send(500)}})
    }else{
      client.hmset(req.user.username, {broadcastEnabled:true, broadcastMsg: req.query.payload},
            function(err){if(!err){res.send(200)}else{res.send(500)}})
    }
  }else if()
  res.send(200)
}
