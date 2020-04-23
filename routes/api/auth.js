const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


const User = require('../../models/user');

router.post('/', (req, res) => {
    const { 
        email, 
        pass
    } = req.body;

    if( 
        !email || 
        !pass){
            return res.status(400).json({msg: 'Please enter all fields!'});
        }
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist!' });

            bcrypt.compare(pass, user.pass)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'})
                    jwt.sign(
                        {id: user.id}, 
                        config.get('jwtSecret'), 
                        {expiresIn: '1h'}, 
                        function(err, token) {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    fname: user.fname, 
                                    lname: user.lname, 
                                    mname: user.mname, 
                                    sex: user.gender, 
                                    bdate: user.bdate, 
                                    email: user.email, 
                                    mnumber: user.mnumber, 
                                    preadd: user.presentAdd
                                }
                            });

                        });

                    
                })
        })
});

router.get('/user', auth, (req, res) =>{
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})
module.exports = router;