const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
// const jwtSecret = "1231231"
const jwt = require('jsonwebtoken');


const User = require('../../models/user');

router.post('/', (req, res) => {
    const { 
        fname, mname, lname, bdate, gender, mnumber, presentAdd, email, pass
    } = req.body;

    if( !fname || 
        !lname || 
        !email ||
        !pass){
            return res.status(400).json({msg: 'Please enter all fields!'});
        }
    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User all ready taken!' });
            
            const newUser = new User({
                fname, mname, lname, bdate, gender, mnumber, presentAdd, email, pass
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.pass, salt, (err, hash) =>{
                    if(err) throw err;
                    newUser.pass = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                {id: user.id}, 
                                config.get('jwtSecret'), 
                                {expiresIn: '1h'}, 
                                function(err, token) {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            fname: user.firstName, 
                                            lname: user.lastName, 
                                            mname: user.middleName, 
                                            sex: user.sex, 
                                            bdate: user.birthDate, 
                                            email: user.email, 
                                            mnumber: user.mobileNumber, 
                                            preadd: user.presentAddress, 
                                            uname: user.userName
                                        }
                                    });

                                });
                        });
                });
            })
        })
});

module.exports = router;