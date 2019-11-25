

const makeRndStr = require("./makeRndStr.js");

module.exports = (fileName, maxlength) =>{
    let name = "";
    let extIndex = fileName.lastIndexOf('.');
    let fileExt = fileName.substring(extIndex, fileName.length).toLowerCase();
    
    name = makeRndStr(maxlength);
    name += fileExt;
    
    return name;
}