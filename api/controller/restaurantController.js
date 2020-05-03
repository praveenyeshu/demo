
//excel upload
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var multer = require('multer');



const { handleError, ErrorHandler } = require('../helpers/error')

//const { errSample } = require('../helpers/constants/error/errorCodes')

// restaurantController.js
// Import Restaurants model
Restaurant = require('../models/restaurantModel');
// Handle index actions
exports.index = function (req, res) {
console.log("get restaurants")
    Restaurant.get(function (err, restaurants) {
        if (err) {

            res.status(500).json({
                status: "error",
                statusCode,
                message
            });

        }

        res.json({
            status: "success",
            message: "Restaurants retrieved successfully",
            data: restaurants
        });
    });
};
// Handle create restaurant actions
exports.new = function (req, res) {
    var restaurant = new Restaurant();
    restaurant.name = req.body.name;
    restaurant.email = req.body.email;
    restaurant.password = req.body.password;
    restaurant.mobile = req.body.mobile;
    restaurant.address = req.body.address;
    restaurant.status = "pending";//req.body.status;
    restaurant.emailStatus = "not verified";//req.body.emailStatus;
    restaurant.isActive = req.body.isActive;
    restaurant.isDeleted = req.body.isDeleted;


    //get all reataurants
    Restaurant.get(function (err, restaurants) {
        if (err) {

           return res.status(500).json({
                status: "error",
                statusCode,
                message
            });

        }

        //console.log(restaurants);

        var existingRestaurant=restaurants.find(f=>f.name==restaurant.name.trim());

        if(!existingRestaurant)
        {

            // res.json({
            //             message: 'New restaurant created!',
            //             data: restaurant
            //         });

            restaurant.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'New restaurant created!',
                    data: restaurant
                });
            });
        }
        else
        {
            res.status(500).json({
                status: "error",
                statusCode:500100,
                message:"Restaurant already exist."
            });
        }

        

    });


    //if (isValidRestaurant(req)) {
        //save the Restaurants and check for errors
        // restaurant.save(function (err) {
        //     if (err)
        //         res.json(err);
        //     res.json({
        //         message: 'New restaurant created!',
        //         data: restaurant
        //     });
        // });
   // }

};
// Handle view restaurant info
exports.view = function (req, res) {
    Restaurant.findById(req.params.restaurant_id, function (err, restaurant) {
        if (err)
            res.send(err);
        res.json({
            message: 'Restaurant details loading..',
            data: restaurant
        });
    });
    
};
// Handle update restaurant info
exports.update = function (req, res) {
    Restaurant.findById(req.params.restaurant_id, function (err, restaurant) {
        if (err)
            res.send(err);

            restaurant.name = req.body.name;
            restaurant.email = req.body.email;
            restaurant.password = req.body.password;
            restaurant.mobile = req.body.mobile;
            restaurant.address = req.body.address;

        // save the Restaurants and check for errors
        restaurant.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Restaurant Info updated',
                data: restaurant
            });
        });
    });
};
// Handle delete Restaurants
exports.delete = function (req, res) {
    Restaurant.remove({
        _id: req.params.Restaurants_id
    }, function (err, Restaurants) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Restaurant deleted'
        });
    });
};



exports.downloadTemplate = function (req, res) {
    //const file = `${__dirname}/assets/resource/RestaurnatTemplate.xlsx`;
    const file = `./assets/resource/RestaurnatTemplate.xlsx`;
    res.download(file); // Set disposition and send it.
};


function isValidRestaurant(restaurant) {

    console.log("isValidRestaurant")
    console.log(restaurant)

    if (restaurant.name && restaurant.email && restaurant.password && restaurant.mobile && 
        restaurant.address) {

        if (restaurant.name.trim()!="" && restaurant.email.trim()!="" && 
        restaurant.password.trim()!="" && restaurant.mobile.trim()!="" && 
        restaurant.address.trim()!="") {

        }
        else
            throw new ErrorHandler(500100, "Bad Request")
    }
    else
        throw new ErrorHandler(500100, "Bad Request")
}




var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './assets/Imports/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');


// Handle Import Restaurants
exports.import = function (req, res) {
    var exceltojson;
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: true
            }, function (err, result) {
                if (err) {
                    return res.json({ error_code: 1, err_desc: err, data: null });
                }
                res.json({ error_code: 0, err_desc: null, data: result });
            });
        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    })
};



