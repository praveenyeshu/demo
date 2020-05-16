// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();


// var swaggerUi = require('swagger-ui-express'),
//     swaggerDocument = require('./swagger.json');

const { handleError, ErrorHandler } = require('./helpers/error')


//const { ErrorCodes,RestaurantsErr } = require('./helpers/Constants/Error/errorCodes')
//const { errSample } = require('./helpers/Constants/Error/errorCodes')




// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
// mongoose.connect('mongodb+srv://rw:rw@food-ordering-cluster1-qrgai.mongodb.net/food-ordering?retryWrites=true&w=majority', 
//     { useUnifiedTopology: true,useNewUrlParser: true});

mongoose.connect('mongodb://localhost/food-ordering', { useNewUrlParser: true});

var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

app.get('/error', (req, res) => {
     throw new ErrorHandler(501, 'Internal server error hello');
    //throw new ErrorHandler(errSample.RESTAURANT_NOT_FOUND,errSample.RESTAURANT_NOT_FOUND_MESSAGE );
    
  })

  
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use Api routes in the App
app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
    console.log("global Error Handler");
    handleError(err, res);
    //res.json({ message: error.message });
  });


// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

