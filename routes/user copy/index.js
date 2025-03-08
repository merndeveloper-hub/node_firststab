import express from "express";
// const profile = require("./profile");
// const follow = require("./follow");
// const search = require("./search");
// const web3 = require("./web3");
// const nft = require("./nft");
// const sell = require("./sell");
 import category from "./category/index.js";
// const bid = require("./bid");
// const history = require("./history");
// const auction = require("./auction");
// const subscribe = require("./subscribe");
// const activity = require("./activity");
// const { tokenVerification } = require("../../middleware/token-verification");
// const pandoras = require("./pandoras");
// const allowlist = require("./allowlist");
// const getNfts = require("./getdata");
// const launchpad = require("./launchpad");
// const swap = require("./swap");
// const userCollection = require("./userCollection");
// const allUsers = require("./allUsers");
 import faqCategory from "./faqCategorie/index.js";
 import faqQuestion from "./faqQuestion/index.js";

 import contentPages from "./contentPages/index.js";
 import business from "./business/index.js";
import updateProfile from "./profile/index.js";

const router = express.Router();

// router.use("/profile", profile);
// router.use("/follow", tokenVerification, follow);
// router.use("/search", search);
// router.use("/web3", web3);
router.use("/profile", updateProfile); // after login check the token
 router.use("/business", business);
 router.use("/category", category);
 router.use("/contentPage", contentPages);
 router.use("/faqCategory", faqCategory);
 router.use("/faqQuestion", faqQuestion);
 
// router.use("/sell", sell);
// router.use("/auction", auction);
// router.use("/subscribe", subscribe);
// router.use("/pandoras", pandoras);
// router.use("/getdata", getNfts);
// router.use("/allowlist", allowlist);
// router.use("/", activity);
// router.use("/apply", launchpad);
// router.use("/swap", swap);
// router.use("/userCollection", userCollection);
// router.use("/allusers", allUsers);
// router.use("/swapoffer", swapoffers);
// router.use("/contractCollection", dhcontractCollection);
// router.use("/removeData", removeListing);

export default router;
