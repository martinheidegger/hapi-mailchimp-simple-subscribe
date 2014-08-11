# hapi-mailchimp-simple-subscribe

```JavaScript
server.pack.register({
    plugin: require("hapi-mailchimp-simple-subscribe"),
    options: {
        apiKey: "mailchimp-api-key",
        listId: "id-of-your-mailchimp-list"
    }
}, {
    route: {
        prefix: "/ml"
    }
});
``` 

And you should be able to do a push request to "/ml/subscribe" with "mail=a.mail@you.com".

Cheers!