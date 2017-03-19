Template.pollListItem.events = {
	'click [data-action="view-poll"]': function(event){
		event.preventDefault();
		Router.go("/poll/" + this._id);
	}
};

Template.pollDetails.events = {
	'click [data-action="vote-on-poll"]': function(event){
		event.preventDefault();
		Session.set('hasVoted', false);
		var poll = Template.currentData();
		var pollOption = this;

		var pollId = poll && poll._id;
		var timestamp = moment().valueOf();
		var option = pollOption.valueOf();
		//console.log(Meteor.userId());
		//var hasVoted = Votes.findOne({userId: Meteor.userId(), pollId: pollId});
		//console.log(hasVoted);
		Meteor.call('insertVote', Meteor.userId(), pollId, timestamp, option, function(err, res) {
			if(err) {
				console.log("error")
			} else {
				//hasVoted = true
				//alert('Users can only sumbit one vote.')
				//if(this.userId === Meteor.userId()) {
					Session.set('hasVoted', res);
					console.log('my response from vote is:', res);
				console.log(this.userId)
				//}
			}
		});
	}
};

Template.pollDetails.helpers({
	'voteCountForOption': function(){
		var pollOption = this;
		return Votes.find({option: pollOption.valueOf()}).count();
	},
	'hasVoted': function(){
		return Session.get('hasVoted');
	}

});