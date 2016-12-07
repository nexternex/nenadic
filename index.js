//serve side for node--start node first file

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('error-handler'),
    morgan = require('morgan'),
    multer = require('multer'),
    upload = multer({ dest: './tmp/'});
    fs = require('fs'),
    routes = require('./routes'),
//    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

 ///


var app = module.exports=express();
var mongoose = require('mongoose');
//var uristring='mongodb://nexnexter:n1g22s581,@waffle.modulusmongo.net:27017/bOs4amos?authMode=scram-sha1';
var uristring='mongodb://goran:n1g22s5@ds035014.mongolab.com:35014/nenadic';
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: 'nexnexter@gmail.com',
  pass: 'n1g22s581,'
}
console.log('test_001');
mongoose.connect(uristring,options, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
var db = mongoose.connection;
db.once('open', function () {
console.log('MongoDB connection successful.');
});

//database model
var schema = new mongoose.Schema({ text: 'string',place: 'string',desc: 'string',date: 'string' });
var schema_list = new mongoose.Schema({ name: 'string',lastname:'string',company:'string',address:'string',size:'string',category:'string' });

var Todo = mongoose.model('Todo', schema);
var List = mongoose.model('List', schema_list);


//app settings
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
// Host most stuff in the public folder
app.use(express.static(path.join(__dirname, 'public')));

//IMAGES//
app.use(multer({ dest: './tmp/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}));

app.post('/api/photo',function(req,res){
    
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("Upisah");
    });
});


//BACKEND ROUTES
	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
            console.log("R2D2 says:nasao sam:"+todos);
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
            place : req.body.place,
            desc : req.body.desc,
            date : req.body.date,
            id:req.body.id,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
				res.send(err)
				res.json(todos);
                
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

////////////////////////////////////////// LIST | ROUTES ///////////////////////////////////////

	app.get('/api/lists', function(req, res) {
        

		// use mongoose to get all todos in the database
		List.find(function(err, lists) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(lists); // return all todos in JSON format
            console.log("R2D2 says:nasao sam list:"+lists);
		});
	});
// create list and send back all lists after creation
	app.post('/api/lists', function(req, res) {
        console.log(req.body.formData.name+":"+req.body.size.singleSelect);
		// create a list, information comes from AJAX request from Angular
		List.create({
			name :req.body.name,
            lastname : req.body.formData.name,
            company : req.body.formData.company,
            address : req.body.formData.address,
            size : req.body.size.singleSelect,
            category : req.body.category.singleSelect
		}, function(err, list) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			List.find(function(err, lists) {
				if (err)
				res.send(err)
				res.json(lists);
                
			});
		});

	});
// delete a list
	app.delete('/api/lists/:list_id', function(req, res) {
		List.remove({
			_id : req.params.list_id
		}, function(err, list) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			List.find(function(err, lists) {
				if (err)
					res.send(err)
				res.json(lists);
			});
		});
	});

//GET ROUTES//
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index)

//start server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


