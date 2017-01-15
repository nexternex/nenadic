//serve side for node--start node first file

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('error-handler'),
    morgan = require('morgan'),
    multer = require('multer'),
    upload = multer({ dest: './uploads/'});
    fs = require('fs'),
    routes = require('./routes'),
//    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = module.exports=express();
var mongoose = require('mongoose');

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
var schema = new mongoose.Schema({ text: 'string',place: 'string',desc: 'string',date: 'string',id:'string' });
var schema_list = new mongoose.Schema({ name: 'string',lastname:'string',company:'string',address:'string',size:'string',category:'string',c_id:'string',img:'string' });

var Todo = mongoose.model('Todo', schema);
var List = mongoose.model('List', schema_list);
var S3url="";

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
 
//S3 Bucket IMAGES//

const aws = require('aws-sdk');

/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = process.env.S3_BUCKET;
/*
 * Respond to GET requests to /account.
 * Upon request, render the 'account.html' web page in views/ directory.
 */
app.get('/account', (req, res) => res.render('account.html'));
/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
	
    };

	console.log("Log za putanju na S3: " + returnData.url);
	S3url=returnData.url;
    res.write(JSON.stringify(returnData));
    res.end();
  });
});
/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in
 * a way that suits your application.
 */

app.post('/api/save-details/:user_id', (req, res,err) => {
  // TODO: Read POSTed form data and do something useful

 		console.log("save-detail: " + S3url + ":" + req.params.user_id );
  		
		  List.update({ 'c_id': req.params.user_id }, { $set: { img:S3url }},function(err, lists) {
				if (err)
					res.send(err)
				});

        if(err) {
            return res.end("Error uploading file.");
        }
        res.end('File uploaded');
 		console.log("uspesno zavrsen update url-a")
});

// Image 2 DRUGI METOD UPIS NA DISK--trenutno rem zbog upisa na S3
	// app.post('/api/photo',function(req,res){
	//     upload(req,res,function(err) {

	//         console.log("user_id:"+req.body.user_id);
	//         console.log("path:"+req.files.userPhoto.path);

	// 		List.update({ c_id: req.body.user_id }, { $set: { img:req.files.userPhoto.path }},function(err, lists) {
	// 				if (err)
	// 					res.send(err)
	// 				});
			
	//         if(err) {
	//             return res.end("Error uploading file.");
	//         }
	//         res.end('File uploaded');
	//     });
// });

//BACKEND ROUTES api/////////////////////////////////////////////////////////////////////////////
// GET ALL TODOS
	app.get('/api/todos:user_id', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find({ 'id': req.params.user_id },function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format

		});
	});

// CREATE TODO and send back all todos after creation
	app.post('/api/todos', function(req, res) {
		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
            place : req.body.place,
            desc : req.body.desc,
            date : req.body.date,
            id: req.body.id,
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
// DELETE TODO
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

            // get and return all the todos after you delete another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				    res.json(todos);
			});
		});
	});

// GET LISTS 
	app.get('/api/lists', function(req, res) {
		List.find(function(err, lists) {
			if (err)
				res.send(err)

			res.json(lists); // return all todos in JSON format
            console.log("R2D2 says:nasao sam list:"+lists);
		});
	});


// FIND USER PROFILE//
	app.get('/api/profile:profile_id', function(req, res) {
        // use mongoose to get all profiles in the database
		List.find({ 'c_id': req.params.profile_id },function(err, profile) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			res.json(profile); // return all todos in JSON format
            console.log("R2D2 says:nasao sam profile:"+List);
		});
	});

// UPDATE LIST 
// ++ oglasi/lisitng and send back all lists after creation
	app.post('/api/lists_update', function(req, res) {
        console.log(req.body.formData.user_id+":"+ req.body.formData.company);
		// create a list, information comes from AJAX request from Angular
		List.update({ 'c_id': req.body.user_id },
			 { $set: { 
				name :req.body.name,
				lastname : req.body.formData.name,
				company : req.body.formData.company,
				address : req.body.formData.address,
				size : req.body.size.singleSelect,
				category : req.body.category.singleSelect
			 }}, function(err, list) {
			if (err)
				res.send(err);
			// get and return all the lists after you create another
			List.find({ 'c_id': req.params.profile_id },function(err, profile) {
				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err)
				res.json(profile); // return all lists in JSON format
				console.log("R2D2 says:nasao sam profile:"+List);
				});
			});
		});
		app.post('/api/lists_data/:user_id', function(req, res) {
        console.log(req.body.formData.name+":"+req.body.size.singleSelect);
		// create a list, information comes from AJAX request from Angular
		List.create({
			name :req.body.name,
            lastname : req.body.formData.name,
            company : req.body.formData.company,
            address : req.body.formData.address,
            size : req.body.size.singleSelect,
            category : req.body.category.singleSelect,
            c_id: req.body.formData.c_id
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
// DELETE LIST
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


