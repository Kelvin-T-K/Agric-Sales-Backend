import Product from "../models/Products.js";

// Create product (Admin only)
export const createProduct = async (req, res) => {
  const { name, price, quantityInStock, unit } = req.body;

  const product = await Product.create({
    name,
    price,
    quantityInStock,
    unit,
    image: req.file ? req.file.path: null,
    createdBy: req.user.id,
  });

  res.status(201).json({message: "Product added successfully", product});
};

// Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// Update product
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.quantityInStock =
    req.body.quantityInStock || product.quantityInStock;
  product.unit = req.body.unit || product.unit;

  if (req.file) {
    product.image = req.file.path;
  }

  const updated = await product.save();
  res.json({message: "Product updated successfully", product: updated});
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  } 

  await product.deleteOne();
  res.json({ message: "Product deleted successfully", product});
};