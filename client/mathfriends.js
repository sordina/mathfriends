// Session Stuff
var logged_in = function() { return Session.get('user') }


// Collections and subscriptions
Snippets = new Meteor.Collection("snippets");


// Templates

Template.body.snippets = function () { return Snippets.find() };

var renderer = function(arg) { Meteor.defer(function(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"output_" + arg ]);
})}

Template.new_or_login.focus_login = function() { Meteor.defer(function(){
	jQuery("#login_name").focus()
})}

Template.snippet.rendered         = renderer
Template.small_snippet.rendered   = renderer

Template.logout.logged_in          = logged_in
Template.new_or_login.logged_in    = logged_in

Template.body.is_open   = function (snippet) { return snippet.is_open; }
Template.body.snippets  = function ()        { return Snippets.find({},{sort : {timestamp:-1}})}

Template.logout.events = { 'click a': function(e) { Session.set('user',null) } }

Template.login.events = {
	'keydown input#login_name': function(e) { if(e.keyCode == 13) { jQuery("#login_pass").focus() }},
	'keydown input#login_pass': function(e) { if(e.keyCode == 13) { Session.set('user', jQuery("#login_name").val()) }},
	'focus   input':            function(e) { jQuery(e.target).val('') }
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
