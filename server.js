//Install express server
const express = require('express');
const path = require('path');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

const app = express();

// Import routes
let apiRoutes = require("./api/api-routes");

const { handleError, ErrorHandler } = require('./api/helpers/error')

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://rw:rw@food-ordering-cluster1-qrgai.mongodb.net/food-ordering?retryWrites=true&w=majority', 
    { useUnifiedTopology: true,useNewUrlParser: true});
    var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")



// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/food-ordering-web'));

app.get('/#/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/food-ordering-web/index.html'));
});


app.use((err, req, res, next) => {
    console.log("global Error Handler");
    handleError(err, res);
    //res.json({ message: error.message });
  });
  

// Use Api routes in the App
app.use('/api', apiRoutes);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);