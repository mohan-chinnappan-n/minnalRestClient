({
    makeRequest : function(component, event, helper) {
        helper.makeRequest(component,event);   
    },
    
    getResponse : function(component, event, helper) {
        helper.getResponse(component, event);
    },  
    
    sendNewRequest : function(component, event, helper) {
        helper.makeNewRequest(component,event);   
    },
    
    onMethodChange : function(component, event, helper) {
        var selected = component.find("methods").get("v.value");
        component.set("v.method", selected);
    }
    
    
})