import OrderModel from "../../../db/models/order-model/order-model.js";
import ProductModel from "../../../db/models/product-model/product-model.js";

export const makeOrder = async (req, res, next) => {
  try {
    const { userId, products, addressId } = req.body;
    let total_Price = 0;
    for (let item of products) {
      const product = await ProductModel.findById(item.productId);
      if (!product) {
        throw new Error(
          "Product maybe deleted or not found, please refresh the page"
        );
      }
      if (item.quantity > product.quantity) {
        throw new Error(
          ` ${product.name} has only ${product.quantity} items available in stock`
        );
      }
      product.quantity -= item.quantity;
      await product.save();
      total_Price += product.price * (item.quantity || 1);
    }

    const orderObject = {
      ...req.body,
      total_Price,
    };
    const newOrder = await OrderModel.create(orderObject);
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    next(new Error("Error in making order: " + error.message));
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price")
      .populate("addressId", "street city state zipCode country");
    res.status(200).json({ massage: "Orders fetched successfully", orders });
  } catch (error) {
    throw new Error("Error in getting orders: " + error.message);
  }
};

export const getOrderByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ userId })
      .populate("userId", "name email")
      .populate("products.productId", "name price")
      .populate("addressId", "street city state zipCode country");

    res
      .status(200)
      .json({ message: "Orders fetched successfully For You", orders });
  } catch (error) {
    throw new Error("Error in getting order by user id: " + error.message);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
  } catch (error) {
    throw new Error("Error in updating order status: " + error.message);
  }
};

