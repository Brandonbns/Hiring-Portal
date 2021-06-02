const express = require("express");
let router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const { getData } = require("../../Controllers/Dashboard/dashboardControllers");




router.use(express.static(path.join(__dirname, '../', 'public')))
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router
    .route("/getData")
    .get(async (req, res, next) => getData(req,res,next))
        
    





module.exports = router;
