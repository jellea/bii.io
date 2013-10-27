"use strict"

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , redis = require('redis')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy

var client = redis.createClient()
  , app = express()
  , secrets = require('./secrets')


// Login
passport.use(new TwitterStrategy({
    consumerKey: secrets.twitter.key,
    consumerSecret: secrets.twitter.secret,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    client.hmset(profile.id,{
        'username': profile.username,
        'photo': profile.photos[0].value,
        'oldBio': profile._json.description
    })

    client.hsetnx(profile.id, 'enabled', true)
    client.hsetnx(profile.id, 'broadcastUpdate', false)
    client.hsetnx(profile.id, 'updateMsg', "{username} just updated my twitter bio. #biiio https://bii.io/"+profile.username)

    done(null, profile)
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  client.hgetall(id, done)
})

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.cookieParser())
//app.use(express.methodOverride())
app.use(express.session({secret: 'roflpantoffel23r567tfyguyvuydwfhiwheqfiuhwehf'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/users', user.list)
app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/onoroff',
                                     failureRedirect: '/login' }))

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
