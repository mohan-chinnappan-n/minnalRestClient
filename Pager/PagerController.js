({
    currentPageChange: function(component, event, helper) {
        var myEvent = $A.get("e.c:CurrentPageChange");
        myEvent.setParams({"currentPage": event.target.value});
        myEvent.fire();
    }
})