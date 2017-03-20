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
		var option_one = template.$('#newPollOption1').val();
		var option_two = template.$('#newPollOption2').val();
		var expiration = template.$('#newPollDuration').val();
		var timestamp = moment().valueOf();

		if(title === "" || title.length === 0) {
			alert("Polls must have a title");
		} else if(expiration === "" || expiration.length === 0) {
			alert("Must insert number of hours")
		} else {
			Meteor.call('insertNewPoll', Meteor.userId(), title, desc, timestamp, option_one, option_two, expiration);
			template.creatingPoll.set(false);
		}
	},
	'click [data-action="add-option-one"]': function(event){
		$('#add-option').hide(function() {
			$('#newPollOption1').fadeIn('slow');
			$('#add-option-two').fadeIn('slow');
		})
	},
	'click [data-action="add-option-two"]': function(event){
		$('#add-option-two').hide(function() {
			$('#newPollOption2').fadeIn('slow');
		})
	}
};

Template.newPoll.helpers({
	addOption: function(){
		return false;
	}
})