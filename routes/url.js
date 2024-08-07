const express = require("express");
const {handleGenerateNewShortUrl,handleGetAnalytics, handleDateTime} = require('../controller/url');

const router = express.Router();

router.get('/analytics/:shortId',handleGetAnalytics)
router.post('/',handleGenerateNewShortUrl);
router.get('/',handleDateTime);

module.exports = router;