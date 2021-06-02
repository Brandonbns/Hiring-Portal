const express = require("express");
let router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const { authenticateUser, getAuthInfo } = require("../../Models/Auth/authenticateUser");



router.use(express.static(path.join(__dirname, '../', 'public')))
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router
    .route("/login")
    .post(async (req, res, next) => {
        console.log(req.body,'body');
        let state = await authenticateUser(req.body)
        console.log(state);
        
        if (state) {
            let authData = await getAuthInfo(req.body)
            console.log(authData,'authdata');


            
            jwt.sign({ user: req.body.username , authData:authData }, 'secretkey', (err, token) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json({
                        user:req.body.username,
                        authData:JSON.stringify(authData),
                        token
                    })
                }
                res.end()

            })
        } else {
            try {
                throw new Error('not a user')
            } catch (e) {
                console.log(e);
                res.status(500).send('not a user')
            }
        }

    })

router
    .route("/user")
    .post(verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            }
            else {
                res.json({
                    message: 'post created',
                    authData
                })
            }
        })

    })

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }
    else {
        res.sendStatus(403)//forbidden
    }


}


module.exports = router;
