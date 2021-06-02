const app = require('express');
const router = app.Router();
const Types = require('../../common/Types') // Model types
const routeConstant = require('../../common/route-constant');

// CRUD Service
const CRUD = require('../../common/CRUD');

// Create
/**
 * @swagger
 * /api/jobs:
 *   post:
 *     description: create a job details
 *     tags:
 *      - Job
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.JOB, res));

//get all
/**
 * @swagger
 * /api/jobs:
 *   get:
 *     description: get all job details
 *     tags:
 *      - Job
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of jobs list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.JOB, res));

// Get by id
/**
 * @swagger
 * /api/jobs/job/:id:
 *   get:
 *     description: get job details by id
 *     tags:
 *      - Job
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A job
 */
router.get(routeConstant.JOB.HANDLE_SINGLE, (req, res) => CRUD.getById(req.params.id, Types.JOB, res));

// Delete by id
/**
 * @swagger
 * /api/jobs/job/:id:
 *   delete:
 *     description: delete a job by ID
 *     tags:
 *      - Job
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.delete(routeConstant.JOB.HANDLE_SINGLE, (req, res) => CRUD.deleteById(req.params.id, Types.JOB, res));

// update by id
/**
 * @swagger
 * /api/jobs/job/:id:
 *   put:
 *     description: update a job by ID
 *     tags:
 *      - Job
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.put(routeConstant.JOB.HANDLE_SINGLE, (req, res) => CRUD.updateById(req.body, req.params.id, Types.JOB, res));

 // Search
/**
 * @swagger
 * /api/jobs/search:
 *   post:
 *     description: search
 *     tags:
 *      - Job
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
 router.post(routeConstant.JOB.SEARCH, (req, res) => CRUD.searchByQuery(req.body, Types.JOB, res));

module.exports = router;