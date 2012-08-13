// Session Stuff
var logged_in = function() { return Session.get('user') }


// Collections and subscriptions
Snippets = new Meteor.Collection("snippets");
Users    = new Meteor.Collection("users");


// Templates

Template.body.snippets = function () { return Snippets.find() };

var renderer = function(arg) { Meteor.defer(function(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"output_" + arg ]);
})}

Template.new_or_login.focus_login = function() { Meteor.defer(function(){
	jQuery("#login_name").focus()
})}

Template.users.users = function(){ return Users.find({},{sort: {name:1}}) }

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

Template.logout.logged_in       = logged_in
Template.new_or_login.logged_in = logged_in

Template.body.is_open  = function (snippet) { return snippet.is_open; }
Template.body.snippets = function ()        { return Snippets.find({},{sort : {timestamp:-1}})}

Template.logout.events = { 'click a': function(e) { Session.set('user',null) } }

Template.login.events = {
	'keydown input#login_name': function(e) { if(e.keyCode == 13) { jQuery("#login_pass").focus() }},
	'keydown input#login_pass': function(e) { if(e.keyCode == 13) {
		var name     = jQuery("#login_name").val()
		var pass     = jQuery("#login_pass").val()
		var existing = Users.findOne({name: name})
		if(existing) {
			if(existing.pass === pass) { Session.set('user', name) }
			else {alert('wrong password')}
		} else {
			if(pass === prompt("Please confirm your password for the new user " + name)) {
				Users.insert({name: name, pass: pass})
				Session.set('user', name)
			} else {
				alert("New user creation aborted.")
			}
		}
	}},
	'focus input': function(e) { jQuery(e.target).val('') }
}

Template.small_snippet.events = { 'click li': function() { Snippets.update({_id: this._id},{$set: {is_open:true }}) }}

Template.newsnippet.events    = { 'click a':  function() {
	Snippets.insert({name: "Update Me!", is_open:true, user: Session.get('user'), timestamp: (new Date().getTime()) })
}}

Template.snippet.events = {
	'click .close':   function() { Snippets.update({_id: this._id}, {$set: {is_open:false}}) },
	'keyup input':    function() { Snippets.update({_id: this._id}, {$set: {name: jQuery("#name_"+this._id).val() }}) },
	'keyup textarea': function() {
		var input_text = jQuery("#input_"+this._id).val()
		Snippets.update({_id: this._id}, {$set: {snippet: input_text}})
	}
}
