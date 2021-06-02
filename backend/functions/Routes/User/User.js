const express = require("express");
let router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const { authenticateUser, getAuthInfo } = require("../../Models/Auth/authenticateUser");
const { createNewUser, checkUserAvailable } = require("../../Models/User/CreateNewUser");



router.use(express.static(path.join(__dirname, '../', 'public')))
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router
    .route("/register")
    .post(async (req, res) => {

        let { fName, userName, email, password } = req.body
        if (!fName || !userName || !email || !password) {
            res.status(401).send('Please Provide the required fields')
        }
        else {
            let available = await checkUserAvailable(userName)
            if (available) {
                let created = await createNewUser(req.body)
                if (created) {
                    res.status(250).send('user Created Successfully')
                }
            }
            else {
                res.status(401).send('Username already exists')
            }
        }



    })

module.exports = router;