require(["dojo/parser", "dijit/registry", "dojo/dom", "dojo/domReady!"], function(parser, registry, dom){
        parser.parse();
        // dom.byId("foobar") would only be a normal domNode.
        var myDialog = registry.byId("foobar");
        myDialog.set("content", "<p>I've been replaced!</p>");
        myDialog.show();
    });