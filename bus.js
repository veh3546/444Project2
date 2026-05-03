
function isNum(value){
    if(typeof value == "number") {
        return Number.isInteger(value);
    } else if(typeof value == "string") {
        // if inputted as a string, test if the string only contains digits
        let pattern = /\D/g;
        return !pattern.test(value);
    }
    return true;
}

function isString(value){
    return (typeof value == "string");
}

function isValidDate(value){
    // uses format YYYY-MM-DD
    let pattern = /\d\d\d\d-\d\d-\d\d/;
    return (pattern.test(value) && value.length == 10);
}

function hash(value){
    return value;
}


export{
    isNum,
    isString,
    isValidDate,
    hash
}