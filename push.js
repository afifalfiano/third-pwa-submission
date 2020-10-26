var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BKCLyc10ckb4fNSygwZau46FgJ3E92p9kvi5y559pZATa1g7dxH_ZkjkB_FUEWOeYSSWf_nSDwIVXuV8fpaadsc",
   "privateKey": "yOiK55dLJT1R94zYqcEr0ZTnSuxAPlPVDQq7kp9toc4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eSDBOThTknc:APA91bF3wuy9vEvrud-wMp3le5pivXHK3q5Nqei5RioN2EtoNQKlYtKw9xb4lA_2sz7g4l6YuhvWaNOQrFv41pJpL_se3eFEy-Zk_KziPwETLGGA9UEWX0RhpNwovnbP1ca7N4nnsO2e",
   "keys": {
       "p256dh": "BKmnaRiWp44t+kWG2oEVyssszgAhDqIkywwaUC9TE28929qKM3NB5SGVSjTN5SkEwBdhGFETinDvMW5BmpqhRv0=",
       "auth": "OlAKlCIE+k4Kz6aoyowT9g=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '46378783589',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);