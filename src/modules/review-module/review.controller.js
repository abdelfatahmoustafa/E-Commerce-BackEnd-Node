import ReviewModel from "../../../db/models/reviews-model/reviews-model.js";
export const addReview = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const { rating, comment } = req.body;

    if (!userId) {
      return next(new Error("User ID is required to add a review."));
    }
    if (!productId) {
      return next(new Error("Product ID is required to add a review."));
    }

    const reviewObject = {
      userId,
      productId,
      rating,
      comment,
    };

    const newReview = await ReviewModel.create(reviewObject);

    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    next(new Error("Error in addReview controller: " + error.message));
  }
};

export const getReviewsByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return next(new Error("Product ID is required to fetch reviews."));
    }

    const reviews = await ReviewModel.find({ productId })
      .populate("userId", "name email")
      .populate("productId", "name");

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    next(
      new Error("Error in getReviewsByProduct controller: " + error.message)
    );
  }
};
