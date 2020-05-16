
//excel upload
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var multer = require('multer');

var fs = require('fs');



const { handleError, ErrorHandler } = require('../helpers/error')

//const { errSample } = require('../helpers/constants/error/errorCodes')

// restaurantController.js
// Import Restaurants model
Restaurant = require('../models/restaurantModel');
// Handle index actions
exports.index = function (req, res) {
    console.log("get restaurants");

    // Restaurant.find( {$or: [ { name: "Restaurant 2" }, { mobile: 739202625272 } ]},function (err, restaurants) {
    //     if (err) {

    //         res.status(500).json({
    //             status: "error",
    //             statusCode,
    //             message
    //         });

    //     }

    //     res.json({
    //         status: "success",
    //         message: "Restaurants retrieved successfully",
    //         data: restaurants
    //     });
    // });
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

        var existingRestaurant = restaurants.find(f => f.name == restaurant.name.trim());

        if (!existingRestaurant) {

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
        else {
            res.status(500).json({
                status: "error",
                statusCode: 500100,
                message: "Restaurant already exist."
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

        if (restaurant.name.trim() != "" && restaurant.email.trim() != "" &&
            restaurant.password.trim() != "" && restaurant.mobile.trim() != "" &&
            restaurant.address.trim() != "") {

        }
        else
            throw new ErrorHandler(500101, "Bad Request")
    }
    else
        throw new ErrorHandler(500101, "Bad Request")
}

async function validateImportData(results) {

    let returnList = [];

    for (let i = 0; i < results.length; i++) {
        let data = results[i];

        if (data.name && data.email && data.password && data.mobile && data.address) {

            if (validateEmail(data.email.trim()) && validateMobile(data.mobile.trim())) {
                //pushing it to list
                returnList.push(
                    {
                        name: data.name ? data.name : '',
                        email: data.email ? data.email : '',
                        password: data.password ? data.password : '',
                        mobile: data.mobile ? data.mobile : '',
                        address: data.address ? data.address : '',
                        isValid: true
                    }
                );

            }
            else {
                //pushing it to list
                returnList.push(
                    {
                        name: data.name ? data.name : '',
                        email: data.email ? data.email : '',
                        password: data.password ? data.password : '',
                        mobile: data.mobile ? data.mobile : '',
                        address: data.address ? data.address : '',
                        isValid: false,
                        ErrorInfo: 'Invalid Mobile/Email.'
                    }
                );
            }

        }
        else {

            //pushing it to list
            returnList.push(
                {
                    name: data.name ? data.name : '',
                    email: data.email ? data.email : '',
                    password: data.password ? data.password : '',
                    mobile: data.mobile ? data.mobile : '',
                    address: data.address ? data.address : '',
                    isValid: false,
                    ErrorInfo: 'Data Missing/Invalid.'
                }
            );

        }
    }


    // records =await Restaurant.find().where('name').in(data.name.trim()).exec();
    // console.debug(records);
    console.debug("duplicate check");
    let duplicateCheckList = returnList.filter(f => f.isValid);
    if (duplicateCheckList) {
        console.debug("finding");
        await Restaurant.find(
            {
                $or: [
                    { name: { $in: duplicateCheckList.map(m => m.name.trim()) } },
                    { email: { $in: duplicateCheckList.map(m => m.email.trim()) } },
                    { mobile: { $in: duplicateCheckList.map(m => m.mobile.trim()) } }
                ]
            }, function (err, restaurants) {

                console.debug('found');
                console.debug(restaurants);

                if (restaurants.length > 0) {

                    //push exists list to aray
                    restaurants.forEach(f => {
                        let exis = returnList.find(fi => fi.isValid && f.name == fi.name);
                        console.debug(exis);
                        exis.isValid = false;
                        exis.ErrorInfo = 'Record name/email/mobile already exists.';

                    });

                }


            });
    }





    return returnList;
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function validateMobile(mobile) {
    var phoneno = /^\d{10}$/;
    if (phoneno.test(mobile)) {
        return true;
    }
    else {
        return false;
    }
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
            res.status(500).json({
                status: "error",
                statusCode: 500102,
                message: "No file passed."
            });
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
            }, async function (err, result) {
                if (err) {

                    return res.json({ error_code: 1, err_desc: err, data: null });
                }
                //success fully imported and has data object

                //validate data
                let importedData = await validateImportData(result);

                console.debug('Returned');

                console.debug('deleting file');




                // console.debug('calling');
                // let inlist=result.map(a=>a.name)
                // let a = await Restaurant.find().where('name').in(inlist).exec();

                // console.log(a);
                console.debug('done');
                res.json({ status: "success", statusCode: 0, message: null, data: importedData });
            });

            //deleting imported file
            try {
                fs.unlinkSync(req.file.path);
            }
            catch (e) {
                //err
            }

        } catch (e) {
            res.status(500).json({
                status: "error",
                statusCode: 500101,
                message: "Corupted excel file."
            });
        }
    })
};




// Handle Import Save Restaurants
exports.importSave = function (req, res) {
    console.debug("importSave");

    let restaurantList = [];

    req.body.forEach(item => {

        let restaurant = new Restaurant();
        restaurant.name = item.name;
        restaurant.email = item.email;
        restaurant.password = item.password;
        restaurant.mobile = item.mobile;
        restaurant.address = item.address;
        restaurant.status = "pending";
        restaurant.emailStatus = "not verified";
        restaurant.isActive = true;
        restaurant.isDeleted = false;

        restaurantList.push(restaurant)
        

        // restaurant.save(function (err) {
        //     console.debug(err);
        // });

    });
    console.debug("restaurantList");
    console.debug(restaurantList);
    let restaurant = new Restaurant();

    restaurant.collection.insertMany(restaurantList, onInsert);

    function onInsert(err, docs) {
        if (err) {
            // TODO: handle error
        } else {
            console.info('%d potatoes were successfully stored.', docs.length);
            res.json({
                message: 'Restaurant created successfully..',
                data: req.body
            });
        }
    }

    

};



