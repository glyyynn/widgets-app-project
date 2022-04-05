'use strict';

const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const analyticsreporting = google.analyticsreporting('v4');

async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: './auth.json',
    scopes: 'https://www.googleapis.com/auth/analytics',
  });
  google.options({auth});

  const res = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: 'XXXXXX',
          dateRanges: [
            {
              startDate: '2022-03-22',
              endDate: '2023-03-24',
            },
            {
              startDate: '14daysAgo',
              endDate: '7daysAgo',
            },
          ],
          metrics: [
            {
              expression: 'ga:users',
            },
          ],
        },
      ],
    },
  });
  console.log(res.data);
  return res.data;
}

// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
  runSample.catch(console.error);
}
// export functions for testing purposes
module.exports = runSample;