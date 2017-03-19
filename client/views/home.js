Template.homePage.helpers({
	polls: function () {
		return Polls.find({}, {sort: {timestamp: -1}});
	},
	isUser: function() {
		return currentUser === Meteor.userId();
	}
});