// Session Stuff
var logged_in = function() {
	return display_name(Meteor.user())
}

function display_name(user) {
	var name = null
	var names = ['name','emails[0].email','_id']
	jQuery.each(names,function(index,item){
		try {
			eval("name = user." + item) // So dodgey
			if(name) return false;
		} catch(e) {}
	})
	return name
}

Meteor.subscribe("users")

Meteor.autosubscribe(function () {
	Meteor.subscribe("snippets", Session.get("userfilter"), Session.get("snippetfilter"));
});


// Templates

var renderer = function(arg) { Meteor.defer(function(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"output_" + arg ]);
	var sid = Session.get('snippetfilter')
	if(sid) {
		var snippet = Snippets.findOne({_id: sid})
		if(snippet) {
			document.title = "" + snippet.name + " - MathFriends.meteor.com!"
		}
	}
})}

Template.new_or_login.focus_login = function() { Meteor.defer(function(){
	jQuery("#login_name").focus()
})}

Template.users.users = function(){ return Meteor.users.find() }

Template.users.is_selected = function(userid) { return Session.get('userfilter') == "userid_" + userid }

Template.users.display_name = display_name

Template.users.events = {
	'click li' : function(e) {
		var pre = Session.get("userfilter")
		var val = jQuery(e.srcElement).attr("id")
		console.log(escape(val))
		Session.set("userfilter", val === pre ? null : val)
	}
}

Template.disqus.disqus_script = function(){
	jQuery(function(){
		/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
		var disqus_shortname = 'mathfriends';
		// var disqus_developer = 1;

		/* * * DON'T EDIT BELOW THIS LINE * * */
		(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		})();
	})
}

Template.snippet.rendered       = renderer
Template.small_snippet.rendered = renderer
Template.small_snippet.username = function() {
	return display_name(Meteor.users.findOne({_id: this.user}))
}
Template.small_snippet.owner = function() {
	return Meteor.user()._id == this.user
}

Template.logout.logged_in       = logged_in
Template.new_or_login.logged_in = logged_in


Template.body.snippets       = function()          { return Snippets.find() };
Template.body.expanded       = function(snippetid) { return Session.get('expanded_' + snippetid)}
Template.body.snippets       = function()          { return Snippets.find({},{sort : {timestamp:-1}})}
Template.body.no_snippets    = function()          { return Snippets.find({}).count() == 0 }
Template.body.single_snippet = function()          { return Session.get('snippetfilter')}

Template.logout.events = { 'click a': function(e) { Meteor.logout() } }

Template.small_snippet.events = { 'click li.open': function() { Session.set('expanded_' + this._id, true) } }

Template.newsnippet.events    = { 'click a':  function() {
	var sid = Snippets.insert({name: "Update Me!", user: Meteor.user()._id, timestamp: (new Date().getTime()) })
	Session.set('expanded_' + sid, true)
}}

Template.snippet.events = {
	'click .close':   function() { Session.set('expanded_' + this._id, false) },
	'keyup input':    function() { Snippets.update({_id: this._id}, {$set: {name: jQuery("#name_"+this._id).val() }}) },
	'keyup textarea': function() {
		var input_text = jQuery("#input_"+this._id).val()
		Snippets.update({_id: this._id}, {$set: {snippet: input_text}})
	}
}
