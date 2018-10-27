const async = require('async');
var express = require('express');
var router = express.Router();
var request = require('request');

var keys = [
  '89e8be7f9f0f84633f4ad7908eeff98e',
  '9191d936fc03d4c50faebb90012b5400',
  'bbcfa74d06e99ad12ff205fd3056624e',
  'e37f7e7ae93afaea4785e551f46c674d',
  '7bab51de82c6ead1e59391babd7e8749',
  '2c15f03013f52a32274500852ff692c5',
  '1f0261179580554d001dd0b8dd9459fa',
  '068e13867142400a86f39167e9b5bae3',
  '10d932bbb3a7eefda9261f505673d969',
  '097892a0161914c98a49dd0384fce58a',
];

function proc(jdata) {
  var alert = '';
  if ('alerts' in jdata) {
    alert = jdata.alerts;
  }
  var precipint = 0.0; //max is 25
  var i;
  for (i = 0; i < 7; i++) {
    precipint += jdata.daily.data[i].precipIntensityMax;
  }
  var flood = precipint > 50; // --- True Value
  // flood = Math.random() >= 0.5; // ------   Random values
  // flood = true; // -------- Always Flood
  var fahrenheit =
    0.5 *
    (jdata['daily']['data'][0]['temperatureHigh'] +
      jdata['daily']['data'][0]['temperatureLow']);
  var celsius = (fahrenheit - 32) * 5 / 9;
  return {
    alert: alert,
    precipint: Math.round(precipint * 100) / 100,
    flood: flood,
    lat: jdata.latitude,
    lng: jdata.longitude,
    temp: Math.round(celsius * 10) / 10,
    icon: jdata['daily']['data'][0]['icon'],
    humidity: jdata['daily']['data'][0]['humidity'],
  };
}

function httpGet(url, callback) {
  const options = {
    url: url,
    json: true,
  };
  request(options, (err, apiRes, body) => {
    callback(err, proc(body));
  });
}

// const spawn = require('child_process').spawn;

// let runPy = new Promise(function(success, nosuccess) {
// ------- specify function names, arguments in array--------
//   const pyprog = spawn('python', ['./python_scripts/test.py']);

//   pyprog.stdout.on('data', res => {
//     success(res.toString());
//   });

//   pyprog.stderr.on('data', err => {
//     nosuccess(err.toString());
//   });
// });

router.get('/', (req, res, next) => {
  // runPy
  //   .then(data => {
  //     return res.status(200).json({
  //       message: data,
  //     });
  //   })
  //   .catch(err => {
  //     return res.status(500).json({
  //       error: err,
  //     });
  //   });
  var location = req.query['location'];
  if (!location) {
    return res.status(400).json({
      err: 'Please Specify a Location',
    });
  }
  var locs = location.split(',');
  var locations = [
    parseFloat(locs[0]).toString() + ',' + parseFloat(locs[1]).toString(),
    (parseFloat(locs[0]) + 0.02).toString() +
      ',' +
      parseFloat(locs[1]).toString(),
    parseFloat(locs[0]).toString() +
      ',' +
      (parseFloat(locs[1]) + 0.02).toString(),
    (parseFloat(locs[0]) - 0.02).toString() +
      ',' +
      parseFloat(locs[1]).toString(),
    parseFloat(locs[0]).toString() +
      ',' +
      (parseFloat(locs[1]) - 0.02).toString(),
    (parseFloat(locs[0]) + 0.02).toString() +
      ',' +
      (parseFloat(locs[1]) + 0.02).toString(),
    (parseFloat(locs[0]) + 0.02).toString() +
      ',' +
      (parseFloat(locs[1]) - 0.02).toString(),
    (parseFloat(locs[0]) - 0.02).toString() +
      ',' +
      (parseFloat(locs[1]) + 0.02).toString(),
    (parseFloat(locs[0]) - 0.02).toString() +
      ',' +
      (parseFloat(locs[1]) - 0.02).toString(),
  ];
  var urls = [];
  for (var i = 0; i < locations.length; i++) {
    var url = `https://api.darksky.net/forecast/${keys[
      Math.floor(Math.random() * keys.length)
    ]}/${locations[i]}?exclude=currently,minutely,hourly,flags`;
    urls.push(url);
  }

  async.map(urls, httpGet, (err, body) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    return res.status(200).json(body);
  });
});

module.exports = router;
