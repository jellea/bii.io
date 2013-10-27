var ntwitter = require('ntwitter'), secrets = require('./secrets')
var twit

var redis = require("redis"),
client = redis.createClient();

client.on("error", function (err) {
    console.log("Redis Error " + err);
});

//Haal alle gebruikers op
//TODO: Reddis logic
var keys =  client.keys("*", function(err, userids){
	// for loop
	for(i=0;i<userids;i++){
		if(userids[i].enabled){
			client.hgetall(userids[i], function(err, user){
				
				//Gaan we voor alle gebruikers eens dingen kijken
		
			//Voor alle users
			twit = new ntwitter({
				consumer_key : user.consKey,
				consumer_secret : user.consSecret,
				access_token_key : secrets.twitter.key,
				access_token_secret : secrets.twitter.secret
			})
		
			twit
				.verifyCredentials(function(err, data) {
				//Als de credentials goed is, gaan we dingen doen
				twit.getMentions({
					since_id : user.lastTweetID},function(err,data){
					console.log(data)
					tweets = data
					//TODO: Reddis logic
					//REDDIS UPDATE LAST CHECKED TWEET -> tweets[tweets.length-1].id_str
					client.hset(userids[i], "lastTweetID",tweets[tweets.length-1].id_str, redis.print)
					
					//Nieuwe mentions met biio
					newBio:
					for ( tweet = tweets.length; tweet > 0; tweet--) {
						
						
						
						//Check if biiio hashtag is there
						var rightTag = false
						for(tags in tweets[tweet].entities.hashtags){
							if(tags.text.toLowerCase() == "biiio"){
								rightTag = true
								break
							}	
						}
						
						if (rightTag) {
							var newBioText = tweets[tweet].replace("#biiio","").replace("@"+users[i].name,"");					
							newBioText = "Bio provided by @"+ user.screen_name +": "+newBioText;
							//Volgt gebruiker de commenter?
							twit.showFriendship(user.name, tweets[tweet].user.id_str, function(err, data) {
								console.log(data)
								if(data.relationship.following){
								//Change bio
								// params: name, url, location, description
								twit.updateProfile({description: newBioText}, function(err, data) {
									console.log(data)
									break newBio
								})
								}
							})
						}
					}
				})
			})
		}
	}
	})
})

client.end();