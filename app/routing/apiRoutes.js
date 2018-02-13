//bringing in the friends array for referencing and pushing new user data to it.
var friends = require(__dirname+"/../data/friends.js");

module.exports = function(app){

	app.get("/api/friends", function(req, res) {
	  return res.json(friends);
	});

	app.post("/api/friends", function(req, res) {


		var bestMatch = {
			name: "",
			photo: "",
			matchScore: 40
		};



		var totalDifference = 0;

		var newFriend= {
		    name: req.body.name,
		    photo: req.body.photo,
		    scores: req.body["scores[]"]
		  }


	  friends.push(newFriend);


	  for (var i=0;i<(friends.length-1);i++){
	  	totalDifference = 0;

	  	for (var j=0;j<friends[i].scores.length;j++){
	  		totalDifference += Math.abs(friends[i].scores[j] - newFriend.scores[j])
	  		}
	  	if (totalDifference<=bestMatch.matchScore){
	  			bestMatch.name = friends[i].name;
	  			bestMatch.photo = friends[i].photo;
	  			bestMatch.matchScore = totalDifference;
			  }
			  
	  }


	  res.json(bestMatch);

  });
}