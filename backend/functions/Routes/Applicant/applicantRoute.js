const app = require('express');
const router = app.Router();
const Types = require('../../common/Types') // Model types
const routeConstant = require('../../common/route-constant');

// CRUD Service
const CRUD = require('../../common/CRUD');

const UserController = require('../../Controllers/Applicant/userController');

// Sign Up
/**
 * @swagger
 * /api/applicants/register:
 *   post:
 *     description: register a Applicant 
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
 router.post(routeConstant.APPLICANT.REGISTER, (req, res) => UserController.signUp(req, res));

 // Log In
/**
 * @swagger
 * /api/applicants/login:
 *   post:
 *     description: log in Applicant 
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post(routeConstant.APPLICANT.LOGIN, (req, res) => UserController.logIn(req, res));

// Create
/**
 * @swagger
 * /api/applicants:
 *   post:
 *     description: create a job details
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.APPLICANT, res));

//get all
/**
 * @swagger
 * /api/applicants:
 *   get:
 *     description: get all applicant details
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of applicants list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.APPLICANT, res));

// Get by id
/**
 * @swagger
 * /api/applicants/applicant/:id:
 *   get:
 *     description: get applicant details by id
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A applicantjobs
 */
router.get(routeConstant.APPLICANT.HANDLE_SINGLE, (req, res) => CRUD.getById(req.params.id, Types.APPLICANT, res));

// Delete by id
/**
 * @swagger
 * /api/applicants/applicant/:id:
 *   delete:
 *     description: delete a applicant by ID
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.delete(routeConstant.APPLICANT.HANDLE_SINGLE, (req, res) => CRUD.deleteById(req.params.id, Types.APPLICANT, res));

// update by id
/**
 * @swagger
 * /api/applicants/applicant/:id:
 *   put:
 *     description: update a applicant by ID
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.put(routeConstant.APPLICANT.HANDLE_SINGLE, (req, res) => UserController.updateApplicatDetails(req.body, req.params.id, res));

// Reset Password
/**
 * @swagger
 * /api/applicants/pw-reset/:id:
 *   put:
 *     description: Reset Password
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A applicantjobs
 */
 router.put(routeConstant.APPLICANT.PW_RESET, (req, res) => UserController.resetPassword(req, res));

 // Search
/**
 * @swagger
 * /api/applicants/search:
 *   post:
 *     description: search
 *     tags:
 *      - Applicant
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post(routeConstant.APPLICANT.SEARCH, (req, res) => CRUD.searchByQuery(req.body, Types.APPLICANT, res));

module.exports = router;