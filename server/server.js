// {{
//   name:      String
//   snippet:   String
//   timestamp: Date
// }}
Snippets = new Meteor.Collection("snippets");

Meteor.startup(function () {
	if (Snippets.find().count() === 0) {
		Snippets.insert({
			name:      "Euler's Identity",
			snippet:   "e^{i\\pi} = -1",
			timestamp: (new Date().getTime())
		})
	}
});
