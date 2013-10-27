
/*
 * GET users listing.
 */

module.exports = function(req, res){
  if(req.user){
    params = {username: req.user.username}
    console.log(req.user)
    res.render('manage', params);
  }else{
    res.send(400)
  }
};
