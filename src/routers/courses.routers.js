var express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken } = require('../middleware/token');
router.post('/create',authenticateToken, courseController.create);
router.post('/edit',authenticateToken, courseController.edit);
router.post('/delete',authenticateToken,courseController.delete);
router.post('/getAllCourses',authenticateToken,courseController.getAllCourses);
router.post('/getCourseByPageNumber',authenticateToken,courseController.getCourseByPageNumber);
module.exports = router;