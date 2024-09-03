const express = require('express');
const controllers = require('../controller/urlC');

const router = express.Router();

router.route('/')
    .get(controllers.getURLs)
    .post(controllers.createURL)

// Route to redirect using shortId
router.route('/:shortId')
    .get(controllers.redirectToUrl)
    .delete(controllers.deleteURL)

router.route('/analytics/:shortId')
    .get(controllers.analyticsOfURL)

module.exports = router;