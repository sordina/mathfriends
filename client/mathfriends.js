// Collections and subscriptions

Snippets = new Meteor.Collection("snippets");

// Templates

Template.body.snippets = function () {
	return Snippets.find()
};

var renderer = function(arg) { Meteor.defer(function(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"output_" + arg ]);
})}

Template.snippet.rendered = renderer
Template.small_snippet.rendered = renderer

Template.body.is_open   = function (snippet) { return   snippet.is_open; }
Template.body.not_open  = function (snippet) { return ! snippet.is_open; }
Template.body.snippets  = function ()        { return Snippets.find({},{sort : {timestamp:-1}})}

Template.small_snippet.events = { 'click li': function() { Snippets.update({_id: this._id},{$set: {is_open:true }}) }}
Template.newsnippet.events    = { 'click a':  function() {
	Snippets.insert({name: "Update Me!", is_open:true, timestamp: (new Date().getTime()) })
}}

Template.snippet.events = {
	'click .close':   function() { Snippets.update({_id: this._id}, {$set: {is_open:false}}) },
	'keyup input':    function() { Snippets.update({_id: this._id}, {$set: {name: jQuery("#name_"+this._id).val() }}) },
	'keyup textarea': function() {
		var input_text = jQuery("#input_"+this._id).val()
		Snippets.update({_id: this._id}, {$set: {snippet: input_text}})
	}
}
