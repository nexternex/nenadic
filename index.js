
var express = require('express');
    routes = require('./routes');
var app = module.exports=express();

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
//  app.use(express.bodyParser());
//  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

//GET ROUTES
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


