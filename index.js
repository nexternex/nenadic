var express = require('express');
var app = express();

app.use(app.router);
app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendfile(__dirname + '/public/index.html');
});
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/Forecast', function(request, response) {
  response.render('pages/Forecast');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


