var Router = Backbone.Router.extend({

	routes: {
		"":                 "root",
		":whatever":        "root",
		"snippet/:snippet": "snippet"
	},

	root: function () {
		Session.set('snippetfilter', null)
	},

	snippet: function (sid) {
		console.log("Routing for snippet " + sid)
		Session.set('snippetfilter', sid)
	}
});

Meteor.startup(function () {
	var router = new Router();
	Backbone.history.start({pushState: true});
});
