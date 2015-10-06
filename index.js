
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

 app.get('*', function(req, res) {
        res.render('pages/index'); // load the single view file (angular will handle the page changes on the front-end)
    });

//
//app.get('/', function(request, response) {
//  response.render('pages/index');
//});
//
//app.get('/Forecast', function(request, response) {
//  response.render('pages/Forecast');
//});
//
//app.get('/Home', function(request, response) {
//  response.render('pages/Home');
//});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


