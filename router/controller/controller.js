const controller = {};

controller.addProduct = require("./addProduct").addProduct;
controller.checkJoin = require("./checkJoin").checkJoin;
controller.loginAccount = require("./loginAccount").loginAccount;
controller.logoutAccount = require("./logoutAccount").logoutAccount;
controller.joinMember = require("./joinMember").joinMember;
controller.joinSeller = require("./joinSeller").joinSeller;

module.exports = controller;