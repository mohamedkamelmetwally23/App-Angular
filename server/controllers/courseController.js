const Course = require('../models/Course');
const asyncHandler = require('../middleware/asyncHandler');
const Category = require('../models/Category');

const getCourses = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const search = req.query.search || '';

  const query = {
    title: { $regex: search, $options: 'i' },
  };

  const courses = await Course.find(query)
    .populate('catId', 'name')
    .skip((page - 1) * limit)
    .limit(limit);

  const count = await Course.countDocuments(query);

  res.json({
    success: true,
    data: courses,
    page,
    pages: Math.ceil(count / limit),
    total: count,
  });
});

const getCoursesByCategory = asyncHandler(async (req, res) => {
  const { catId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;

  // Check if category exists
  const category = await Category.findById(catId);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  const query = { catId };

  const courses = await Course.find(query)
    .populate('catId', 'name')
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const count = await Course.countDocuments(query);

  res.json({
    success: true,
    category: category.name,
    data: courses,
    pagination: {
      page,
      limit,
      pages: Math.ceil(count / limit),
      total: count,
    },
  });
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('catId', 'name');

  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: 'Course not found' });
  }

  res.json({ success: true, data: course });
});

const createCourse = asyncHandler(async (req, res) => {
  const { title, instructor, price, seats, image, catId } = req.body;

  // Check if category exists
  const categoryExists = await Category.findById(catId);
  if (!categoryExists) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid category ID' });
  }

  const course = await Course.create({
    title,
    instructor,
    price,
    seats,
    image,
    catId,
  });

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    data: course,
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  const { title, instructor, price, seats, image, catId } = req.body;

  let course = await Course.findById(req.params.id);

  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: 'Course not found' });
  }

  // If catId is being updated, check if new category exists
  if (catId) {
    const categoryExists = await Category.findById(catId);
    if (!categoryExists) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid category ID' });
    }
  }

  course = await Course.findByIdAndUpdate(
    req.params.id,
    { title, instructor, price, seats, image, catId },
    { new: true, runValidators: true },
  ).populate('catId', 'name');

  res.json({
    success: true,
    message: 'Course updated successfully',
    data: course,
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: 'Course not found' });
  }

  await course.deleteOne();

  res.json({
    success: true,
    message: 'Course deleted successfully',
  });
});

module.exports = {
  getCourses,
  getCoursesByCategory,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
