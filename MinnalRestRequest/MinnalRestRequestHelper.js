({
    makeRequest : function(component, event) {

        var action = component.get("c.service");
        //console.log("resource:", component.get("v.resource") );

        action.setParams({
            path: component.get("v.resource"),
            method: component.get("v.method"),
            responseFormat: component.get("v.responseFormat"),
            bodyContent: component.get("v.bodyContent"),
            bodyContentType: component.get("v.bodyContentType")
        });

        action.setCallback(this, function(a) {
            //console.log(a.getReturnValue().body);
             // let us fire the event (make sure this component has handlder for this)
            //  someting like: <aura:handler event="mohansundar:MinnalRestResponseEvent" action="{!c.getResponse}"/>

            var myEvent = $A.get("e.mohansundar:MinnalRestResponseEvent");
            myEvent.setParams({
                response: a.getReturnValue()
            }).fire();

        });

        $A.enqueueAction(action);

    },

    getResponse : function(component, event) {
        var space = 4;
        var response = event.getParam("response");
        var res = JSON.parse(response.body);
        component.set("v.response", JSON.stringify(res, undefined, space) ) ;

    },

    makeNewRequest : function(component, event) {


        var action = component.get("c.service");
        //console.log("resource:", component.get("v.resource") );

        action.setParams({
            path: component.get("v.resource"),
            method: component.get("v.method"),
            responseFormat: component.get("v.responseFormat"),
            bodyContent: component.get("v.bodyContent"),
            bodyContentType: component.get("v.bodyContentType")
        });

        action.setCallback(this, function(a) {
            var myEvent = $A.get("e.mohansundar:MinnalRestResponseEvent");
            myEvent.setParams({
                response: a.getReturnValue()
            }).fire();

        });

        $A.enqueueAction(action);

    },


})
