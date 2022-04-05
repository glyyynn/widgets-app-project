'use strict'
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//older api example
const { google } = require('googleapis');
const key = require('./auth.json');
const scopes ='https://www.googleapis.com/auth/analytics.readonly';
const jwt = newgoogle.auth.JWT(key.client_email,null, key.private_key, scopes);
const view_id = 'G-7YSR7LCWS3';

process.env.GOOGLE_APPLICATION_CREDENTIALS='./auth.json';

jwt.authorize((err, response) => {
  google.analytics('v3').data.ga.get(
    {
      auth: jwt,
      ids:'ga:'+ view_id,
      'start-date':'30daysAgo',
      'end-date':'today',
      metrics:'ga:pageviews'
    },
    (err, result) => {
      console.log(err, result);
    }
  )
});