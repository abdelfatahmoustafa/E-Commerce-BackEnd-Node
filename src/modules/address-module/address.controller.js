import AddressModel from "../../../db/models/address-model/address-model.js";

export const addAddress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { label, street, city, state, country, zipCode, phone } = req.body;

    // if (
    //   !label ||
    //   !street ||
    //   !city ||
    //   !state ||
    //   !country ||
    //   !zipCode ||
    //   !phone
    // ) {
    //   return next(new Error("All address fields are required."));
    // }

    if (!userId) {
      return next(new Error("User ID is required to add an address."));
    }

    const addressObject = {
      ...req.body,
      userId,
    };
    const newAddress = await AddressModel.create(addressObject);

    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    next(new Error("Error in addAddress controller: " + error.message));
  }
};

export const getUserAddresses = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return next(new Error("User ID is required to fetch addresses."));
    }

    const addresses = await AddressModel.find({ userId }).populate("userId", "name email");

    res.status(200).json({ addresses });
  } catch (error) {
    next(new Error("Error in getUserAddresses controller: " + error.message));
  }
}