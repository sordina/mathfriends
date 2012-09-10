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

	about: function() {
		Session.set('about',true)
	},

	snippet: function (sid) {
		Session.set('snippetfilter', sid)
	}
});

Meteor.startup(function () {
	var router = new Router();
	Backbone.history.start({pushState: true});
});
