var app = require('http').createServer(handler),
mysql = require('mysql');
config = require('./retrospectiveConfig.js');

app.listen(config.getBackendPort());

var connection = mysql.createConnection({
  host: config.getDatabaseHost(),
  user: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName()
});
connection.connect(function(error) {
  if (error) {
    console.log('Error connecting to database');
    console.log(error);
  }
});

function handler(request, response) {
  var contentType = 'application/json';

  console.log(request.method);
  console.log(request.url);

  if (request.url === '/feedback') {
    if (request.method === 'OPTIONS') {
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'origin,content-type,accept',
        'Access-Control-Request-Method': 'GET,POST',
      });
      response.end();
    } else if (request.method === 'GET') {
      connection.query('SELECT * FROM retrospective ORDER BY date DESC LIMIT 10;', function(error, rows, fields) {
        if (error) {
          response.writeHead(500, {
            'Access-Control-Allow-Origin': '*'
          });
          response.end();
        } else {
          response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': contentType
          });
          response.end(JSON.stringify(rows));
        }
      });
    } else if (request.method === 'POST') {
      request.on('data', function(data) {
        var stringData = data.toString();
        console.log(stringData);
        var decodedData = JSON.parse(stringData);

        connection.query('INSERT INTO retrospective (positive, comment) VALUES (' + decodedData.positive + ', "' + decodedData.comment + '");', function(error) {
          if (error) {
            response.writeHead(500, {
              'Access-Control-Allow-Origin': '*'
            });
            response.end(JSON.stringify(error));
          } else {
            response.writeHead(201, {
              'Access-Control-Allow-Origin': '*'
            });
            response.end();
          }
        });
      });
    }
  }
}
