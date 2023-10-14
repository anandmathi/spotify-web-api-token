const request = require('request');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
      origin: "*"
    }
))
app.options('*', cors( {
  allowedHeaders: ['Authorization', 'Content-Type']
}));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.set('port', process.env.PORT || 3000);

app.get('/token', function(req, resp) {
  // resp.header('Access-Control-All/*ow-Origin', '*');
  // resp.header('Access-Control-Allow-Headers', 'X-Requested-With');*/

  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  // your application requests authorization
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

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      resp.json({ token: body.access_token });
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
