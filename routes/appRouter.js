'use strict';

// require packages and modules
const request = require('request');

// set routes
const appRouter = function(app) {

  // home page
  app.get('/', function (req, res) {
    // display html page
    // res.sendFile('index.html', { root: './views/' });
    res.render('index');

  })

  // home page
  app.post('/', function (req, res) {
    // data input from form
    const pregnancies = req.body.pregnancies;
    const bmi = req.body.bmi;
    const age = req.body.age;

    // api keys and endpoint
    const apiKey = 'xxx';
    const endPoint = 'xxx';

      // shape of data sent to endpoint
      const data = {
        'Inputs': {
          'input1':
            [
              {
                'Pregnancies': pregnancies,
                'BMI': bmi,
                'Age': age,
              }
            ],
        },
        'GlobalParameters': {}
      }

      // set headers and body
      const options = {
          uri: endPoint,
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'authorization': 'Bearer ' + apiKey,
          },
          body: JSON.stringify(data)
      }

      // request
      request(options, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            let result = JSON.parse(body);
            console.log(result);
            res.render('index', 
              { // root: './views/', // only needed if using html and also change render to sendFile
                result: result,
                error: null
              });
        } else {
            console.log("The request failed with status code: " + res.statusCode);
            res.render('index', 
             { // root: './views/', // only needed is using html and also change render to sendFile
                result: null,
                error: 'The request failed with status code: ' + res.statusCode
             });        
          }
      });
    
  })

  // // diabetes api
  // app.post('/api/v1/diabetesresult', function (req, res) {
  //   const url = 'xxx';
  //   const apiKey = 'xxx';
    
  //   request.post({
  //     "headers": { "content-type": "application/json",
  //                  "Authorization": "Bearer " + apiKey, },
  //     "url": url,
  //     "body": JSON.stringify({
  //       "Inputs": {
  //         "input1":
  //         [
  //             {
  //                 "Number of times pregnant": "2",
  //                 "Body mass index": "33",
  //                 "Age": "50"
  //             }
  //         ],
  //     },
  //     "GlobalParameters": {}
  //     })
  //     }, (error, response, body) => {
  //     if(error) {
  //         return console.dir(error);
  //     }
  //         console.dir(JSON.parse(body));
  //     });
  // })

}

module.exports = appRouter;