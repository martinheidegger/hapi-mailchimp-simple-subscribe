"use strict";

var Joi = require("joi"),
    config = Joi.object({

        postRoute:    Joi.string().default("/subscribe"),
        apiKey:       Joi.string().required(),
        listId:       Joi.string().required(),
        sendWelcome:  Joi.boolean().default(true),
        doubleOptin:  Joi.boolean().default(false),
        route:        Joi.object({
            prefix:   Joi.string() 
        }).strict()

    }).strict();

exports.register = function simpleMailchimp(plugin, options, next) {

    Joi.validate(options, config, function (error, options) {
        if (error) {
            throw error;
        }
        plugin.route({
            method: 'POST',
            path: options.postRoute,
            handler: require("./routeHandler")(options),
            config: {
                payload: {
                    output: "data",
                    parse: true
                }
            }
        });
        next();
    });
};

exports.register.attributes = {
    pkg: require('../package.json')
};