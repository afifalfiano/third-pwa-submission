var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIkthC_plCpXzHjwhgBUaAcVzaM5UFTxYFWWeKAg256L8I8SwtEitz4rCi1uQdzDfjgaedasyRKreofql5NSK9w",
   "privateKey": "ryo4E18isMa1YoV3Ylxvch7NSPIuEBWji5M1WDRZQMM"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ezihfX5hnxQ:APA91bG2m1TszO-WsTjBmd_UKVCBLmPVJ6OAF8arxec6e9rYXPVFK2QtBrm7f8l9k6qOQBqfaR3MMQwwgx03gyAK1Nw7am6gFKKX-uPGVSyLmFSI4e8TPbIxJNE8dbRvDJv5d7XQikeU",
   "keys": {
       "p256dh": "BBWBOhWvOLuPf0UCr2gNXDXYe0ipGLxTTI8AAszGGXAwzuiCDxSTiqNkKkj6LAo51d4nmYRUYySrt6SGE3/LGVI=",
       "auth": "vbzpLaKRqeHZpAhucR46pw=="
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