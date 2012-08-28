
// Permissions
//
Snippets.allow({update: function(userid,docs,fields,modifier){
	try {
		docs.forEach(function(doc){ if(doc.user != userid) { throw "false" } })
	} catch(e) {return false}

	return true;
}})

// Publications
//
Meteor.publish("snippets", function (userfilter, snippetfilter) {
	if(snippetfilter) {
		return Snippets.find({_id: snippetfilter})
	} else if(userfilter) {
		return Snippets.find({user: userfilter.replace(/^userid_/,'')})
	} else {
		return Snippets.find({})
	}
});

Meteor.publish("users", function() {
	return Meteor.users.find()
})

Meteor.startup(function () {
	if (Snippets.find().count() === 0) {
		Snippets.insert({
			name:      "Euler's Identity",
			snippet:   "e^{i\\pi} = -1",
			timestamp: (new Date().getTime())
		})
	}
});

Meteor.accounts.facebook.setSecret("b63693b7202408a7595958815bf85e13")
