import mongoose  from "mongoose";
mongoose.Promise = global.Promise;

import userType from "./userType/index.js";
import user from "./user/index.js";
import attempt from "./attempts/index.js";
import userOTP from "./otpVerification/index.js";
import category from "./categorie/index.js";
import subCategory from "./subCategorie/index.js";
//import subSubCategory from "./subSubCategorie/index.js";
//import counter from "./counter/index.js";
import userCategory from "./proCategorie/index.js";
import proCategory from "./proCategorie/index.js";
import proBusin from "./proBusiness/index.js";
import token from "./token/index.js";
import content from "./content/index.js";
import faqCategory from "./faqCategorie/index.js";
import faqQuestion from "./faqQuestion/index.js";
import payment from "./payments/index.js";
import contactUs from "./contactUs/index.js";
import userBookServ from "./userBookService/index.js";
import booking from "./booking/index.js";
import address from "./address/index.js";

 const db = {};

 db.mongoose = mongoose;

// const db = {
//   userType: "./userType/index.js"
 
// };



db.user = user
 db.userType = userType;
 db.attempt = attempt
 db.userOTP=userOTP;
 db.category=category
 db.subCategory=subCategory
 //db.subSubCategory=subSubCategory
 //db.counter=counter
 db.proCategory=proCategory
 db.proBusin=proBusin
 db.token=token
 db.content=content
 db.faqCategory=faqCategory
 db.faqQuestion=faqQuestion
 db.payment=payment
 db.contactUs=contactUs
 db.userBookServ=userBookServ
 db.booking=booking
 db.address=address
// db.follow = require("./follow");
// db.nft = require("./nft");
// db.blog = require("./blog");
// db.bid = require("./bid");
// db.history = require("./history");
// db.auction = require("./auction");
// db.attempt = require("./attempts");
// db.nftMetaData = require("./nft-metadata");
// db.activity = require("./activity");
// db.subscribe = require("./subscribe");
// db.pandoras = require("./pandoras");
// db.UserOTPVerification = require("./otpVerification");
// db.allowlist = require("./allowlist");
// db.pandorasAllowlist = require("./pandorasAllowlist");
// db.launchPad = require("./launchPad");
// db.multipleUser = require("./multipleUser");
// db.multipleUserSell = require("./multipleUserSell");
// db.nftcollection = require("./nftCollection");
// db.swapbid = require("./swapbid");
// db.importCollection = require("./importCollection");
// db.dhcontractcollection = require("./dhcontractCollection");
// db.launchpadMetaData = require("./launchpad-metadata");


export default db;
