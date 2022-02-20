const express = require('express');

const Employee = require('../models/employee.js');

const passport = require('passport');

const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const utils = require('../lib/utils')
const mongoose = require('mongoose');
const User = mongoose.model('User');




//get
router.get('/employees', passport.authenticate('jwt', { session: false }), (req, res) => {
    Employee.find((err, doc) => {
        if (err) {
            console.log('Error in get data' + err)
        } else {
            res.send(doc)
        }
    })
})


//get Single
router.get('/employees/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in Get employee by id' + err)
            } else {
                res.send(doc)
            }
        })
    } else {
        return res.status(400).send('No record found with id' + req.params.id)
    }
})


//post
router.post('/employees', passport.authenticate('jwt', { session: false }), (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    })

    emp.save((err, doc) => {
        if (err) {
            console.log('Error in post data' + err)
        } else {
            res.send(doc)
        }
    })
})


//Put
router.put('/employees/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {

        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        };


        Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
            if (err) {
                console.log('Error in Delete employee by id' + err)
            } else {
                res.send(doc)
            }
        })
    } else {
        return res.status(400).send('No record found with id' + req.params.id)
    }
})


//Delete Single
router.delete('/employees/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in Delete employee by id' + err)
            } else {
                res.send(doc)
            }
        })
    } else {
        return res.status(400).send('No record found with id' + req.params.id)
    }
})






const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;
const clientUrl = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

// router.post('/auth', (req, res) => {
//     console.log(req.body.email)

//     const token = jwt.sign(
//         {
//             expiresIn: '12h',
//             id: req.body.id,
//             provider: req.body.provider,
//             email: req.body.email,
//         },
//         PRIV_KEY, { algorithm: 'RS256' }
//     );
//     res.status(200).json({ success: true, token: token });
// })

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */

router.post('/auth', (req, res) => {

    User.findOne({ username: req.body.email })
        .then((user) => {
            if (user)
                res.send(utils.issueJWT(user));

            else {
                const saltHash = utils.genPassword(req.body.email);

                const salt = saltHash.salt;
                const hash = saltHash.hash;

                const newUser = new User({
                    username: req.body.email,
                    hash: hash,
                    salt: salt
                });
                try {

                    newUser.save()
                        .then((user) => {
                            // res.json({ success: true, user: user });
                            res.send(utils.issueJWT(user));
                        });

                } catch (err) {

                    res.json({ success: false, msg: err });

                }
            }
        })

    // const saltHash = utils.genPassword(req.body.email);

    // const salt = saltHash.salt;
    // const hash = saltHash.hash;

    // const newUser = new User({
    //     username: req.body.email,
    //     hash: hash,
    //     salt: salt
    // });
    // try {

    //     newUser.save()
    //         .then((user) => {
    //             res.json({ success: true, user: user });
    //         });

    // } catch (err) {

    //     res.json({ success: false, msg: err });

    // }
})


module.exports = router;