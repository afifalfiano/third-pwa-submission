var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BMrvrgJZJCTckmgY16Tt8KtcT3PrU0wAw0TeHA5nmoyTi2N7JZF_QwOvgtg_gc8DWTE5W-F9GHk70ZilGIB9nkY",
   "privateKey": "0Bdt76y_X9qBLkd2NhMOUO57_N5E0be6-QtGH2uHQBc"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ey83BMYDZLw:APA91bFO56qB51xfAAAHdFMPotKQT_XZ0ISfun8_1m1gLWB4LdJ17_rZ7gKNvCVgCbm70RqfsuEc-AshTKfxrtHb18ydKMdLTi352QQjaoQ7jwQ8rknSfDxukl_Ygb1Vzhc3HKNBnU3w",
   "keys": {
       "p256dh": "BI5TM7HNk94gjGX/P+/LBqY8aztyyaRZwBxhO9luGYhW9cm9e6XL3yLUZ+71o4OkxXqelgMpLySAtqef6UtiQJ4=",
       "auth": "VPzjlEWO/jNqZRi313SiTg=="
   },
   "image" : './img/example.jpg',
   "icon": './logo.png'
};
var payload = 'Saksikan! Laga BigMatch! Manchester United vs Liverpool';
 
var options = {
   gcmAPIKey: '46378783589',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);