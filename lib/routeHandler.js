"use strict";

/*jslint regexp: true */
var boom = require("boom"),
    validateRegExp = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/*jslint regexp: false */

function validateEmail(email) {
    return validateRegExp.test(email);
}

module.exports = function setupRouteHandler(settings) {
    var Mailchimp = require("mailchimp-api/mailchimp").Mailchimp,
        mailchimp = new Mailchimp(settings.apiKey);
    return function subscribe(request, reply) {
        var mail = request.payload.mail;
        if (validateEmail(mail)) {
            console.log("Trying to register:", mail);
            mailchimp.lists.subscribe({
                id: settings.listId,
                email: {
                    email: mail
                },
                send_welcome: settings.sendWelcome,
                double_optin: settings.doubeOptin
            }, function onSuccess() {
                reply("OK");
            }, function onError(error) {
                console.log("Error when trying to register:", mail, " (", error, ")");
                reply(boom.badImplementation("Something went wrong :("));
            });
        } else {
            reply(boom.notAcceptable("No valid mail address provided!"));
        }
    };
};
