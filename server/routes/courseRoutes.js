const router = require('express').Router();
const {
  getCourses,
  getCoursesByCategory,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

const auth = require('../middleware/authMiddleware');

router.get('/', getCourses);
router.get('/category/:catId', getCoursesByCategory);
router.get('/:id', getCourseById);

router.post('/', createCourse);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
