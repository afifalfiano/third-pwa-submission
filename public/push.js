var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCewX_MtFRBWRpbCLhaQjzJUeGSzYahU5oGKT-rM46JgjEpCgLbVuSVshsvqRx2J0PHrtci_VFb64DTlXjcxN9c",
   "privateKey": "nsL4PtN4QqSkSp02lM__jw6GjiIQmLxr-tu1EYAdpOo"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": " https://fcm.googleapis.com/fcm/send/eJ4N_4zD9uc:APA91bEgBTVyZ_XpsTRpoylTMrj3nTwu6QheOzojn_quhCpMrkleFcuoz6TJZJ89DKtUfNin68R29pVGhMiS4pul0fsf8Op_g8ZUfcLektFGRsiDLLObbVLI82c7bqq4BjK-5bhrb4iK",
   "keys": {
       "p256dh": "BIaprS35NlmgvrWcQnQi4kY+epnDCEkQMbvMS6bAfwwx4EPjfgphF1DI/Y+Q7I/vhJ1Fmh+5C34fXH3IV/qCOcE=",
       "auth": "ZsUowzi5k8nFCQgRrZBf7w=="
   }
};
var payload = "Saksikan! Laga BigMatch! Manchester United vs Liverpool";
 
var options = {
   gcmAPIKey: '46378783589',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);