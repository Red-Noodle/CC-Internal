const express = require('express');
const router = express.Router();
const axios = require('axios');


//Admin Model
const Admin = require('../models/Admin');

//Get Key
router.get('/key', (req, res) => {
    res.status(200).json(process.env.SWOOP_KEY);
});

//Get all Admins
router.get('/', (req, res) => {
     Admin.find()
        .exec()
        .then(admins => {
            //Responding with data of all admins
            res.status(200).json(admins);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({success: false, message: err});
        });
     
});

//Get admin by id
router.get('/:adminId', (req, res) => {
    var id = req.params.adminId;
    //Finding an admin by the id given
    Admin.findById(id)
    .exec()
    .then(admin => {
        if(admin) {
            //responding with the data of the matched admin
            res.status(200).json(admin);
        } else {
            res.status(404).json({success: false, message: 'admin not found'});
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({success: false, message: err});
    });
});

router.get('/login', (req, res) => {
    res.render('../views/login.html');
})

//Get admin by key
router.get('/key/:key', (req, res) => {
    var key = req.params.key;
    Admin.findOne({loginKey: key})
    .exec()
    .then(admin => {
        if(!admin) {
            res.status(404).json({success: false, message: 'admin not found'});
        } else {
            res.status(200).json(admin);
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({success: false, message: err});
    });
});

//Swoop Login
router.get('/login/swoop', (req, res) => {
    //receive an id from swoop
    var key = req.query.id;
    //validating id and getting email address
    axios.get(process.env.SWOOP_LOGIN_LINK + key)
    .then(response => {
        //Receive email from swoop
        var email = response.data;
        Admin.findOne({email: email})
        .exec()
        .then(admin => {
            //Email auth and setting key
            if(!admin) {
                res.status(404).redirect('http://localhost:3000/login.html');
            } else {
                //setting environment variable to key to pass along
                process.env.SWOOP_KEY = key;
                //updating admin with key to pass along
                Admin.updateOne(
                  { _id: admin._id },
                  {
                    $set: {
                      name: {
                        firstName: admin.name.firstName,
                        lastName: admin.name.lastName
                      },
                      email: admin.email,
                      loginKey: key
                    }
                  },
                  { upsert: true, multi: true }
                )
                .exec()
                .then(data => {
                    res.status(200).redirect('http://localhost:3000/')
                })
                .catch(err => {return console.log(err)});
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end();
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).end();
    });
});

//Register Page
router.get('/register', (req, res) => {

});

//Handle Register
router.post('/register', (req, res) => {
    //Define variables from request body
    var { firstName, lastName, email } = req.body;
    //Check required fields
    if (!firstName || !lastName || !email) {
        res.status(500).redirect('http://localhost:3000/adminAdd.html');
    } else {
        // checking if admin already exists
       Admin.findOne({email: email})
       .then(admin => {
           if(admin) {
               // sending a message if admin does exist
               res.status(500).redirect('http://localhost:3000/adminAdd.html');
           } else {
               //create new admin if one wasn't found
               newAdmin = new Admin({
                   name: {
                       firstName: firstName,
                       lastName: lastName
                   },
                   email: email
                   //save new admin
               }).save()
                    .then(admin => {
                        return res
                          .status(200)
                          .redirect("http://localhost:3000/adminAdd.html");
                    })
                    .catch(err => {
                       console.log(err);
                       return res
                         .status(500)
                         .redirect("http://localhost:3000/adminAdd.html");
                   });
           }
       })
       .catch(err => {
           console.log(err);
           return res.status(500).redirect('http://localhost:3000/adminAdd.html');
      });
    }
});

//Handle Logout
router.get('/auth/logout', (req, res) => {
    //Deleting key
    process.env.SWOOP_KEY = "";
    res.status(200).json(process.env.SWOOP_KEY);
});

// //Handle updating an admin
router.put('/:adminId', (req, res) => {
    var id = req.params.adminId;
    //Finding one to update
    Admin.updateOne(
      { _id: id },
      {
        $set: {
            name: { //Receiving update data from the request body
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
            },
          email: req.body.email
        }
      },
      { upsert: true, multi: true }
    )
    .exec()
    .then(updatedAdmin => {
        if (!updatedAdmin) {
          res.status(404).json({success: false, message: 'admin not found'});
        } else {
          res.status(200).json({success: true, message: 'admin updated'});
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({success: false, message: err});
      });
});

// //Handle deleting an admin
router.delete('/:adminId', (req, res) => {
    var id = req.params.adminId;
    //Using id provided to find one to delete
    Admin.deleteOne({_id: id})
    .exec()
    .then(admin => {
        if(!admin) {
            res.status(404).json({success: false, message: 'admin not found'});
        } else {
            res.status(200).json({success: true, message: 'admin was deleted'});
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({success: false, message: err});
    });
});

module.exports = router;