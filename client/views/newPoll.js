Template.newPoll.created = function(){
	var template = this;
	template.creatingPoll = new ReactiveVar(false);
};

Template.newPoll.events = {
	'click [data-action="open-new-poll-input"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		template.creatingPoll.set(true);
	},
	'click [data-action="cancel-new-poll"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		template.creatingPoll.set(false);
	},
	'click [data-action="create-new-poll"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		Polls.insert({
			userId: Meteor.userId(),
			title: template.$('#newPollTitle').val(),
			description: template.$('#newPollDescription').val(),
			timestamp: moment().valueOf(),
			options: [
				'Yes',
				'No'
			]
		});
		template.creatingPoll.set(false);
	}
};