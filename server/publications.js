//****************
//PUBLICATIONS
//****************

Meteor.publish('polls', function () {
	check(arguments, [Match.Any]);
	return [
		Polls.find({}),
		Votes.find({})
	];
});


Meteor.publish('pollDetails', function (pollId) {
	check(pollId, String);
	return [
		Polls.find({_id: pollId}),
		Votes.find({pollId: pollId})
	];
});

Meteor.publish('votes', function (pollId) {
	return Votes.find({pollId : pollId});
});