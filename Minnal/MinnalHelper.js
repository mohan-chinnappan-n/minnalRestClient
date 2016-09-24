({

  jsonSort: function(jsonObj, prop, type, direction, offset, limit) {
    //console.log (jsonObj);
    //console.log (prop);

    if (arguments.length < 3) throw new Error("jsonSort requires 3 arguments");
    var direct = arguments.length > 3 ? arguments[3] : 1; //Default to ascending

    if (jsonObj && jsonObj.constructor === Array) {
      var propPath = (prop.constructor === Array) ? prop : prop.split(".");

      //console.log('propPath', propPath);

      jsonObj.sort(function(a, b) {
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
    return this.jsonPagination(jsonObj, offset, limit);
  },

  jsonPagination: function(jsonObj, offset, limit) {
    var resultArray = [];
    var length = jsonObj.length;

    for (var i = offset; i < (offset + limit); i++) {
      if (jsonObj[i] == undefined) break;
      resultArray.push(jsonObj[i]);
    }
    return resultArray;


  },


  jsonSearch: function(jsonObj, prop, value, type) {
    //console.log(jsonObj, prop, value,type);
    //console.log('prop', prop);

    var resultArray = [];
    if (type == undefined) type = 'string';
    jsonObj.forEach(function(item) {
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
