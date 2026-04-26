import Sale from "../models/Sales.js";
import Product from "../models/Products.js";

export const createSale = async (req, res) => {
  const { productName, bags, customerName, contact, paymentMethod } = req.body;

  // Find product by name instead of ID
  const product = await Product.findOne({ name: productName });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.quantityInStock < bags) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const unitPrice = product.price;

  product.quantityInStock -= bags;
  await product.save();

  const sale = await Sale.create({
    product: product._id,        // still store ObjectId internally
    bags,
    unitPrice,
    totalAmount: unitPrice * bags,
    customerName,
    contact,
    paymentMethod,
    soldBy: req.user.id,
  });

  res.status(201).json({ message: "New sale added successfully", sale });
};

export const getSales = async (req, res) => {
  const sales = await Sale.find()
    .populate("product", "name price")
    .populate("soldBy", "username");

  res.json(sales);
};

export const getMySales = async (req, res) => {
  const sales = await Sale.find({ soldBy: req.user.id })
    .populate("product", "name price");

  res.json(sales);
};

export const getSalesByDate = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "startDate and endDate are required" });
  }

  const sales = await Sale.find({
    createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  })
    .populate("product", "name price")
    .populate("soldBy", "username");

  res.json(sales);
};
