
var express = require('express');
    routes = require('./routes');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(express.bodyParser());
app.use(express.methodOverride());
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('*', routes.index)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


