
module.exports  = (app, options)=>{
    options = {name : "", type : -1, ...options};
    console.log("setDefaultOption.js");
    app.set("userName", options.name);
    app.set("userType", options.type);

    app.set("defaultOption", {
        "name":app.get("userName"),
        "type":app.get("userType"),
    });
    console.log(app.get("defaultOption"));
}