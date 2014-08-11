"use strict";

var lab = require("lab").script(),
    main = require("../lib");

lab.test("fun", function (done) {
    main.register({
        route: function () {
            return undefined;
        }
    }, {
        postRoute: "/ml/subscribe",
        apiKey: "abcdefged",
        listId: "holla"
    }, function () {
        done();
    });
});

exports.lab = lab;