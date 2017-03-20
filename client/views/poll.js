Template.pollListItem.events = {
	'click [data-action="view-poll"]': function(event){
		event.preventDefault();
		Router.go("/poll/" + this._id);
	}
};

Template.pollDetails.events = {
	'click [data-action="vote-on-poll"]': function(event){
		event.preventDefault();
		var poll = Template.currentData();
		//console.log("poll is:", poll);
		var pollOption = this;
		var pollTemplate = Template.instance();
		var pollId = poll && poll._id;
		//console.log(pollTemplate);
		var timestamp = moment().valueOf();
		var option = pollOption.valueOf();
		Meteor.call('insertVote', Meteor.userId(), pollId, timestamp, option, function(err, res) {
			if(err) {
				console.log("error")
			} else {
					if(!res) {
						pollTemplate.$('#vote-alert').fadeIn('slow');
					} else {
						pollTemplate.$('.poll-details-results').fadeIn('slow');
					}
			}
		})
	}
}

Template.pollDetails.helpers({
	'voteCountForOption': function(){
		var pollOption = this;
		return Votes.find({option: pollOption.valueOf()}).count();
	},
	'pollActive': function(){
		var pollTemplate = Template.instance();
		console.log(pollTemplate);
		var expiration = pollTemplate.data.expiration;

		if(moment().valueOf() < expiration) {
			return true;
		}
	}
});

Template.pollListItem.helpers({
	'pollActive': function(){
		var pollTemplate = Template.instance();
		var expiration = pollTemplate.data.expiration;

		if(moment().valueOf() < expiration){
			return true;
		}
	},
	'stillActive': function(){
		var pollTemplate = Template.instance();
		var expiration = pollTemplate.data.expiration;
		//console.log(expiration);

		if(moment().valueOf() < moment(expiration).add(10, 'seonds').valueOf()) {
			return true;
		}
	},
	'numOfVotes': function(){
		var pollTemplate = Template.instance();
		var pollId = pollTemplate.data._id;
		//console.log(pollId);
		return Votes.find({pollId : pollId}).count();
	},
	'hoursAgo': function(){
		var pollTemplate = Template.instance();
		var expiration = pollTemplate.data.expiration;
		//console.log(moment().valueOf());

		//console.log(moment(expiration).endOf('day').humanize());
		
		if(moment().valueOf() > expiration) {
			return moment(expiration).fromNow();
		}
	},
	'untilActive': function(){
		var pollTemplate = Template.instance();
		var expiration = pollTemplate.data.expiration;

		if(moment().valueOf() < expiration) {
			return moment(expiration).endOf(expiration).format("dddd, MMMM Do YYYY, h:mm a");
		}

	}
})