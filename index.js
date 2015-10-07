var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
//  api = require('./routes/api'),
  http = require('http'),
  path = require('path');
var app = module.exports=express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

//GET ROUTES
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


