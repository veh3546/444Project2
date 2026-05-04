function isNum(value){
    if(typeof value == "number") {
        return Number.isInteger(value);
    } else if(typeof value == "string") {
        // if inputted as a string, test if the string only contains digits
        let pattern = /\D/g;
        return !pattern.test(value);
    } else {
        return false;
    }
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
    let newHash = 0;
	for(let i = 0; i < value.length; i++) {
		const charCode = value.charCodeAt(i);
		newHash += charCode * (110 * (i + 1) - 1);
	}
    return newHash.toString();
}


export{
    isNum,
    isString,
    isValidDate,
    hash
}