const app = require('express');
const router = app.Router();
const Types = require('../../common/Types') // Model types
const routeConstant = require('../../common/route-constant');

// CRUD Service
const CRUD = require('../../common/CRUD');

const ApplicatjobController = require('../../Controllers/Applicant/applicatjobController');

// Create
/**
 * @swagger
 * /api/applicantjobs:
 *   post:
 *     description: create a job details
 *     tags:
 *      - Applicantjob
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.APPLICANTJOB, res));

//get all
/**
 * @swagger
 * /api/applicantjobs:
 *   get:
 *     description: get all applicantjobs details
 *     tags:
 *      - Applicantjob
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of applicantjobs list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.APPLICANTJOB, res));

// Get by id
/**
 * @swagger
 * /api/applicantjobs/applicantjobs/:id:
 *   get:
 *     description: get applicantjobs details by id
 *     tags:
 *      - Applicantjob
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A applicantjobs
 */
router.get(routeConstant.APPLICANTJOB.HANDLE_SINGLE, (req, res) => CRUD.getById(req.params.id, Types.APPLICANTJOB, res));

// Delete by id
/**
 * @swagger
 * /api/applicantjobs/applicantjobs/:id:
 *   delete:
 *     description: delete a applicantjobs by ID
 *     tags:
 *      - Applicantjob
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.delete(routeConstant.APPLICANTJOB.HANDLE_SINGLE, (req, res) => CRUD.deleteById(req.params.id, Types.APPLICANTJOB, res));

// update by id
/**
 * @swagger
 * /api/applicantjobs/applicantjobs/:id:
 *   put:
 *     description: update a applicantjobs by ID
 *     tags:
 *      - Applicantjob
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.put(routeConstant.APPLICANTJOB.HANDLE_SINGLE, (req, res) => CRUD.updateById(req.body, req.params.id, Types.APPLICANTJOB, res));

 // Search
/**
 * @swagger
 * /api/applicantjobs/search:
 *   post:
 *     description: search
 *     tags:
 *      - Applicantjob
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
 router.post(routeConstant.APPLICANTJOB.SEARCH, (req, res) => CRUD.searchByQuery(req.body, Types.APPLICANTJOB, res));

 // Get by id
/**
 * @swagger
 * /api/applicantjobs/get-applied-jobs/:appId:
 *   get:
 *     description: get applicantjobs details by appId
 *     tags:
 *      - Applicantjob
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A applicantjobs
 */
router.get(routeConstant.APPLICANTJOB.GET_JOBS, 
    (req, res) => ApplicatjobController.getApplicatJobsFromAppID(req.params.appId, res));

module.exports = router;