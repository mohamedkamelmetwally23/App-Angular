const Order = require('../models/Order');
const asyncHandler = require('../middleware/asyncHandler');

// CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
  const { courses, totalPrice } = req.body;

  const order = await Order.create({
    user: req.user.id,
    courses,
    totalPrice,
  });

  res.status(201).json(order);
});

// GET USER ORDERS
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    'courses.courseId',
  );

  res.json(orders);
});

module.exports = { createOrder, getOrders };
