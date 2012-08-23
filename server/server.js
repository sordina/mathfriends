Users    = new Meteor.Collection("users")
Snippets = new Meteor.Collection("snippets")

Meteor.publish("users", function (userfilter) { return Users.find() } )

Meteor.publish("snippets", function (userfilter, snippetfilter) {
	if(snippetfilter) {
		return Snippets.find({_id: snippetfilter})
	} else if(userfilter) {
		return Snippets.find({user: userfilter})
	} else {
		return Snippets.find({})
	}
});

Meteor.startup(function () {
	if (Snippets.find().count() === 0) {
		Snippets.insert({
			name:      "Euler's Identity",
			snippet:   "e^{i\\pi} = -1",
			timestamp: (new Date().getTime())
		})
	}
});
