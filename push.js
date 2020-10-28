var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAckMDM1k-jKGDOin_FJD7QwC6j1JzZTquIKYBphUXua3Idsu_3CtuLS6kNKT5uPT3KNWcOPsIa7yoo7tDv2NxQ",
   "privateKey": "zge_qm71d_MIHbFl2q-NYT2OYl0H9nj-mv_FKXPkhdc"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d-VJNiooeZw:APA91bEKEj9PS0LnShkgNut-PwtmjcInjRGeyuovkWWI5opmNmgJDk96hv0QGq63kNxnM7g7Z0oqSELT2pafF4EAZPQD02GVoKDuSoRq7dtpf1AllhDQiQ4bR7yGiCFTdwH38albYRz4",
   "keys": {
       "p256dh": "BPb34Fwv+akiRgW4av7mcEVCehKy0YzqcQ5ye1BcD2oOTQ/8WtTI2mc2mhJU2RlEuMOksn9ZqiIaRoAXTp9BEZ8=",
       "auth": "vpM6v32DQDT7ebvrB2p8Zw=="
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