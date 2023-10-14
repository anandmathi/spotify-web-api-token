const request = require('request');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Configure CORS for preflight requests
app.options('*', cors());

app.set('port', process.env.PORT || 3000);

app.get('/token', function (req, resp) {
  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      resp.json({ token: body.access_token });
    }
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
