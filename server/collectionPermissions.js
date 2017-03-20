Polls.allow({
	insert: function(userId, doc){
		// the user must be logged in, and the document must be owned by the user
    	return (userId === userId);
	},
	update: function(userId, doc, fields, modifier){
		return true;
	},
	remove: function(userId, doc){
		return true;
	}
});

Votes.allow({
	insert: function(userId, doc){
		// the user must be logged in, and the document must be owned by the user
    	console.log("doc.owner:", doc.owner);
    	return (userId && doc.owner === userId);
    	//return (userId === userId);
	},
	update: function(userId, doc, fields, modifier){
		return true;
	},
	remove: function(userId, doc){
		return true;
	}
});


Meteor.methods({
	insertNewPoll: function(userId, title, desc, timestamp, option_one, option_two, option_three, expiration) {
		var expiration = moment().add(expiration, 'seconds').valueOf();
		console.log(expiration);
		Polls.insert({
			userId: userId,
			title: title,
			description: desc,
			timestamp: timestamp,
			options: [
				'Yes',
				'No',
				option_one,
				option_two,
				option_three
			],
			expiration: expiration
		});
	},
	insertVote: function(id, pollId, timestamp, option) {
		//find the vote where id = this.userId and pollId = this.pollId
		var hasVoted = Votes.findOne({userId: Meteor.userId(), pollId: pollId});
		if(hasVoted) {
			console.log('user already voted');
			return false;
		} else {
			Votes.insert({
				userId: id,
				pollId: pollId,
				timestamp: timestamp,
				option: option
			});
			return true;

		}
	}
});
