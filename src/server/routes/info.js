const express = require('express');
const request = require('request');
const router = express.Router();
const config = require('config');

var checkNumber = function(req, res, next) {
    if (!req.params.ndbno) {
        res.status(500);
        res.send("Error: Looks like you didn't supply an ndbno.");
    }
    return next();
};

var getFoodInfo = function(req, res, next) {
    request.get({url: "https://api.nal.usda.gov/ndb/V2/reports?ndbno="
            + req.params.ndbno
            + "&type=b&format=json&api_key="
    + config.get('server.ndb.APIKey')}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
            if (!body.foods) {
                res.status(404);
                res.send("No results found for ndbno " + req.params.ndbno);
            }
            else {
                var foodInfo = body.foods[0].food;
                res.send(foodInfo);
            }
        }
    });
};

/* GET nutrition info for food. */
router.get('/:ndbno', checkNumber, getFoodInfo);

module.exports = router;
