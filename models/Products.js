import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantityInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      default: "kg",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
        type: "String"
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;