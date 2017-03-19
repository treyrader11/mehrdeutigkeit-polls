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
		var invalid = false;
		var template = Template.instance();
		var title = template.$('#newPollTitle').val();
		var desc = template.$('#newPollDescription').val();
		var timestamp = moment().valueOf();

		if(title === "" || title.length === 0) {
			alert("Polls must have a title");
		} else {
			Meteor.call('insertNewPoll', Meteor.userId(), title, desc, timestamp);
			template.creatingPoll.set(false);
		}
	}
};

Template.newPoll.helpers({
	//'invalid': function() {
	//	return Session.get('invalid');
	//}
})