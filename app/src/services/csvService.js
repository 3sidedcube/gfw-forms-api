class CSVConverter {
    
    static convert(objArray) {
        var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        //Assume that the headers of the document are equal to the keys in the JSON object. 
        var headers = Object.keys(array[0]);
        var stringWithHeaders = CSVConverter.parseHeaders(headers);
        var parsedString = CSVConverter.parseBody(array, stringWithHeaders);
        return parsedString;
    }

    static parseHeaders(headers) {
        //Push the headers into the CSV string. 
        var str = '';
        headers.forEach(function(item) {
            str += CSVConverter.escapeCommas(item) + ',';
        });
        str += '\r\n';
        return str;
    }

    static parseBody(array, str) {
        var value, line;

        array.forEach(function (item, index) {
            line = '';
            for ( index in item ) {
            if (  line !== '' ) line += ','; 
            value = CSVConverter.escapeCommas(item[index]);
            line += value;
            }
            str += line + '\r\n';
        });
        return str;
    }

    static escapeCommas(value) {
        const regex = /\,/;
        if (typeof value  === "string") {
            // If the value contained in the JSON object is a string:
            // Perform a regex test to check and see if the value has a comma already in place and escape the value. 
            // e.g. "Smith, Jones" as a value should not be separated two different columns. 
            return regex.test(value) ? '"' + value + '"' : value;
        }
        return value;
    }

}

module.exports = CSVConverter;