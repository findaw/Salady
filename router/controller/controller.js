const controller = {};

controller.addProduct = require("./addProduct").addProduct;
controller.checkJoin = require("./checkJoin").checkJoin;
controller.loginAccount = require("./loginAccount").loginAccount;
controller.joinMember = require("./joinMember").joinMember;

module.exports = controller;