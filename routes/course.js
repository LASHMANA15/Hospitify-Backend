const express = require('express');
const router = express.Router();
const { createCourse, getCourses, getAllCourses, enrollCourse, updateCourse, deleteCourse, getEnrollments } = require('../controllers/courseController');

router.post('/create', createCourse);
router.get('/all', getCourses);
router.get('/admin/all', getAllCourses);
router.post('/enroll', enrollCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/enrollments', getEnrollments);

module.exports = router;