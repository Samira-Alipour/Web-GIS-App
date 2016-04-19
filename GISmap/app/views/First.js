define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_OnDijitClickMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./First.html"

], function(declare, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, _WidgetsInTemplateMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        title:'My Title',
        _counter : 1,
        _onClick: function (e) {
        	if (this._firstClicked) 
        	{this.titleNode.innerHTML= this.title + "is clicked for the first time"; }
        		else
        	{this.titleNode.innerHTML= this.title + "was clicked" + (++this._counter) }
        },

        postCreate: function() {
        	this.titleNode.innerHTML = this.title;
        }

    });

});


/*define(["dojo/_base/declare",
		"dijit/_WidgetBase",
		"dijit/_OnDijitClickMixin"
		"dijit/_TemplatedMixin"
		"dijit/_WidgetsInTemplateMixin"
		"dojo/text!./First.html"
		"dijit/form/Button"
	], 
	funtion ("declare",
		"_WidgetBase",
		"_OnDijitClickMixin"
		"_TemplatedMixin"
		"_WidgetsInTemplateMixin"
		"dojo/text!./First.html"
		"template"
		"Button"
	) {
		return declare([_WidgetBase, _OnDijitClickMixin, _TemplatedMixin, _WidgetsInTemplateMixin], {
	        templateString: template

		})

})*/