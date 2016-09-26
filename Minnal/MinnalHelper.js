({

  jsonSort: function(jsonArray, prop, type, direction, offset, limit) {
    //console.log (jsonArray);
    //console.log (prop);

    if (arguments.length < 3) throw new Error("jsonSort requires 3 arguments");
    var direct = arguments.length > 3 ? arguments[3] : 1; //Default to ascending

    if (jsonArray && jsonArray.constructor === Array) {
      var propPath = (prop.constructor === Array) ? prop : prop.split(".");

      //console.log('propPath', propPath);

      jsonArray.sort(function(a, b) {
        for (var p in propPath) {
          if (a[propPath[p]] && b[propPath[p]]) {
            a = a[propPath[p]];
            b = b[propPath[p]];
          }
        }
        // convert numeric strings to integers
        switch (type) {
          case "integer":
            a = parseInt(a);
            b = parseInt(b);
            break;
          case "float":
            a = parseFloat(a);
            b = parseFloat(b);
            break;
          default:

        }

        return ((a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0));
      });
    }
    return this.jsonPagination(jsonArray, offset, limit);
  },

  jsonPagination: function(jsonArray, offset, limit) {


    var from = offset * limit;
    var to = from + limit;
    //console.log(jsonArray.length, from, to) ;
    //console.log(jsonArray.slice(from, to ));
    return jsonArray.slice(from, to);


  },


  jsonSearch: function(jsonArray, prop, value, type) {
    //console.log(jsonArray, prop, value,type);
    //console.log('prop', prop);

    var resultArray = [];
    if (type == undefined) type = 'string';
    jsonArray.forEach(function(item) {
      //console.log(item[prop])
      if (item != undefined && item[prop] != undefined) {
        switch (type) {
          case 'string':
            if (item[prop].toUpperCase().startsWith(value.toUpperCase())) {
              resultArray.push(item);

            }
            break;
          case 'integer':
          case 'float':
            if (item[prop] == value) {
              resultArray.push(item);

            }
            break;

        }
      }

    });

    return resultArray;

  }







})
