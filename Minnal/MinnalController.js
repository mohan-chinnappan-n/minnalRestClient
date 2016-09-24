({
    handleResponse: function(component, event, helper) {
        var response = event.getParam("response");
        //var responseStr = JSON.stringify(response.body, undefined, 4);
        component.set("v.response", response.body)

        var responseBody = JSON.parse(response.body);
        // cache the full response
        component.set("v.bodyContentAll", responseBody);

        var pageSize =  component.get('v.pageSize');
        var currentPage = component.get('v.currentPage') - 1;

        var paged = helper.jsonPagination(responseBody, currentPage, pageSize) ;
        component.set("v.bodyContent", paged);


    },

    getContent: function(component, event, helper) {
        //console.log("getContent");
        var response = event.getParam("response");
       var responseBody = JSON.parse(response.body);
        // cache the full response
        component.set("v.bodyContentAll", responseBody);

        var pageSize =  component.get('v.pageSize');
        var currentPage = component.get('v.currentPage') - 1;

        var paged = helper.jsonPagination(responseBody, currentPage, pageSize) ;
        component.set("v.bodyContent", paged);
    },

    searchKeyChange : function(component, event, helper) {
        var searchKey = event.getParam("searchKey");
        if (searchKey.trim().length  == 0 ){ // reset to all
            component.set("v.bodyContent", component.get("v.bodyContentAll") );
        }
        //console.log("searchKey", searchKey);
        var bodyContent = component.get("v.bodyContent");
        var searchOn =  component.get("v.searchOn");
        //console.log('searchOn',searchOn);
        var searchOnType =  component.get("v.searchOnType");
        //console.log('searchOnType',searchOnType);

        var searchResult = helper.jsonSearch(bodyContent, searchOn, searchKey, searchOnType);
        component.set("v.bodyContent",searchResult);



    },



    sortColumn: function(component, event, helper) {

        var column = event.target.id;
        var dir = event.target.dataset.dir == 'asc' ? 1 : -1;
        var type = event.target.dataset.type;
        var bodyContent = component.get("v.bodyContent");
        var elementTextContent = document.getElementById(column).innerText;
        var pageSize = component.get('v.pageSize');
        console.log(pageSize);
        //console.log('elementTextContent', elementTextContent)



        var sorted = helper.jsonSort(bodyContent, column, type, dir, 0, pageSize) ;
        component.set("v.bodyContent",sorted);


        if (event.target.dataset.dir == 'asc') event.target.dataset.dir = 'desc';
        else event.target.dataset.dir = 'asc';



    },
    pageSizeChange: function(component, event, helper) {
        component.set("v.bodyContent", component.get("v.bodyContentAll") );

        var pageSize = parseInt(event.getParam("pageSize"))
        if (pageSize < 1) pageSize = 1;
        //console.log(pageSize);
        component.set('v.pageSize', pageSize);
        var currentPage = component.get('v.currentPage') - 1;
        //console.log(currentPage);

        var paged = helper.jsonPagination(component.get("v.bodyContent"), currentPage, pageSize) ;
        component.set("v.bodyContent", paged);
    },

    currentPageChange: function(component, event, helper) {

        component.set("v.bodyContent", component.get("v.bodyContentAll"));

        var currentPage = event.getParam("currentPage")
        if (currentPage < 1) currentPage = 1;
        component.set('v.currentPage', currentPage);


        var currentPage = component.get('v.currentPage') - 1;
        var pageSize = parseInt( component.get('v.pageSize') );

        //console.log(currentPage, pageSize);

        var paged = helper.jsonPagination(component.get("v.bodyContent"), currentPage, pageSize) ;
        component.set("v.bodyContent", paged);
    }





})
