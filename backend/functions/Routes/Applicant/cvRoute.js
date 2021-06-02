const app = require('express');
const router = app.Router();
const Types = require('../../common/Types') // Model types
const routeConstant = require('../../common/route-constant');

// CRUD Service
const CRUD = require('../../common/CRUD');

const CvController = require('../../Controllers/Applicant/cvController');

const multer = require("multer"); // Image uploader package
const DIR = "./CVs";

//---- set the multer storage directory ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, "cv-"  + Date.now() +"-"+ fileName);
    },
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .pdf format allowed!"));
        }
    },
});
// --------------------------------------------------------------------

// Create
/**
 * @swagger
 * /api/cvs:
 *   post:
 *     description: create a cvs details
 *     tags:
 *      - Cv
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.CV, res));

//get all
/**
 * @swagger
 * /api/cvs:
 *   get:
 *     description: get all cv details
 *     tags:
 *      - Cv
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of cvs list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.CV, res));

// Get by id
/**
 * @swagger
 * /api/cvs/cv/:id:
 *   get:
 *     description: get cv details by id
 *     tags:
 *      - Cv
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A cv
 */
router.get(routeConstant.CV.HANDLE_SINGLE, (req, res) => CRUD.getById(req.params.id, Types.CV, res));

// Delete by id
/**
 * @swagger
 * /api/cvs/cv/:id:
 *   delete:
 *     description: delete a cv by ID
 *     tags:
 *      - Cv
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.delete(routeConstant.CV.HANDLE_SINGLE, (req, res) => CRUD.deleteById(req.params.id, Types.CV, res));

// update by id
/**
 * @swagger
 * /api/cvs/user/:id:
 *   put:
 *     description: update a cv by ID
 *     tags:
 *      - Cv
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.put(routeConstant.CV.HANDLE_SINGLE, (req, res) => CRUD.updateById(req.body, req.params.id, Types.CV, res));

// upload CV
/**
 * @swagger
 * /api/cvs/upload-cv:
 *   put:
 *     description: upload CV
 *     tags:
 *      - Cv
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post(
    routeConstant.CV.UPLOAD_CV,
    upload.single("cv"),
    (req, res) => {
        CvController.uploadCv(req, res);
    }
);

// Search
/**
 * @swagger
 * /api/cvs/search:
 *   post:
 *     description: search
 *     tags:
 *      - Cv
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
 router.post(routeConstant.CV.SEARCH, (req, res) => CRUD.searchByQuery(req.body, Types.CV, res));

// update CV
/**
 * @swagger
 * /api/cvs/update-cv/:id:
 *   put:
 *     description: update CV
 *     tags:
 *      - Cv
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.put(
    routeConstant.CV.UPDATE_CV,
    upload.single("cv"),
    (req, res) => {
        CvController.updateCv(req, res);
    }
);

module.exports = router;