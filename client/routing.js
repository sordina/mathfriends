var Router = Backbone.Router.extend({

	routes: {
		"":                 "root",
		"about":            "about",
		":whatever":        "root",
		"snippet/:snippet": "snippet"
	},

	root: function () {
		Session.set('snippetfilter', null)
	},

	about: about,

	snippet: function (sid) {
		Session.set('snippetfilter', sid)
		setTimeout(function(){
			var snippet = Snippets.findOne({_id: sid})
			if(snippet) {
				document.title = "" + snippet.name + " - MathFriends.meteor.com!"
			}
		}, 3000) // TODO: A timeout is silly... Find a way to use a callback somehow.
	}
});

Meteor.startup(function () {
	var router = new Router();
	Backbone.history.start({pushState: true});
});
