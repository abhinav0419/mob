var express = require("express");
var app = express();
var mysql = require('mysql');
app.use(express.json());
app.use(express.urlencoded());
app.set('views',__dirname+'/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.static(__dirname + '/public'));

app.listen('3000');


var connection = mysql.createConnection({
  host     : 'us-cdbr-east-06.cleardb.net',
  user     : 'bd5505b0354d8f',
  password : '8a18b277 ',
  database: 'heroku_282c5e92e038485'
});


connection.connect(function(err){
	if(err) console.log("Error occured connecting the database:",err);
	else console.log("Database connected successfully");
});


app.get('/', function(req,res){	
	connection.query('select * from mob', function(err, data){		
		res.render('index',{users: data});
			
	})
});


app.post('/users', function(req,res){
	console.log('Calling POST');
	console.log('Request from form:',req.body);
        var fname=req.body.fname;
	var lname=req.body.lname;
	var address=req.body.address;
        var id=req.body.uid;
	connection.query('insert into mob values (?,?,?,?);',[id,fname,lname,address],function(err){
		if(err) console.log("Error occured while inserting the data:",err);
		res.render('index');
	})
});

app.delete('/users',function(req, res){
	console.log("Calling DELETE to remove the user contact", req.body);
	var id = req.body.id;
	connection.query('delete from mob where Id="'+id+'"', function(err){
		if(err) console.log("Error deleting the user from database: ",err);
		res.render('index');
	})
});

//Update the user contact.
app.put('/users', function(req,res){
	console.log('Calling PUT for updating user information:',req.body);
	var fname = req.body.updFname,
		lname = req.body.updLname,
		address = req.body.updAddress,
		id = req.body.Id;
	connection.query('update mob SET fname="'+fname+'",lname="'+lname+'",address="'+address+'" where Id="'+id+'";',function(err,docs){
		if(err) console.log("Error occured updating the user in database: ",err);
		res.render('index');
	})	
	
	
});


