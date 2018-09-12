const express = require('express');
const request = require('request');
const router = express.Router();
const config = require('config');

var checkQuery = function(req, res, next) {
    if (!req.params.query) {
        res.status(500);
        res.send("Error: Looks like you didn't supply a query string.");
    }
    return next();
};

var getFoods = function(req, res, next) {
    request.get({url: "https://api.nal.usda.gov/ndb/search/?format=json&ds=Standard%20Reference&q="
            + req.params.query
            + "&max=25&api_key="
            + config.get('server.ndb.APIKey')}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
            if (!body.list) {
                res.status(404);
                res.send("No results found for query " + req.params.query);
            }
            else {
                var foodList = body.list.item;
                res.send({foods: foodList});
            }
        }
    });
};

/* GET foods by name. */
router.get('/:query', checkQuery, getFoods);

module.exports = router;
