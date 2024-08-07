const express = require("express");
const URL = require("../models/url"); 
const User = require('../models/user');
const { restrictTo } = require("../middleware/auth");
const router = express.Router();

router.get('/admin/urls',restrictTo(['ADMIN']), async (req,res) =>{
    // if(!req.user) return res.redirect('/login')
   const allUrls = await URL.find({});
    return res.render("home",{
        urls : allUrls,
    })
}
);
router.get("/", restrictTo(["Normal"]), async (req,res) =>{
    // if(!req.user) return res.redirect('/login')
   const allUrls = await URL.find({ createdBy:req.user._id });
    return res.render("home",{
        urls : allUrls,
    });
});

router.get('/signup',async (req,res) => {
    return res.render("signup");
});
router.get('/login',async (req,res) => {
    return res.render("login");
});


module.exports = router;