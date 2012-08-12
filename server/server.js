// {{
//   name:      String
//   snippet:   String
//   timestamp: Date
//   user:      String
// }}
Snippets = new Meteor.Collection("snippets")
Users    = new Meteor.Collection("users")

Meteor.startup(function () {
	if (Snippets.find().count() === 0) {
		Snippets.insert({
			name:      "Euler's Identity",
			snippet:   "e^{i\\pi} = -1",
			timestamp: (new Date().getTime())
		})
	}
});
