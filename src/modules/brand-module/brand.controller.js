import slugify from "slugify";
import BrandModel from "../../../db/models/brand-model/brand-model.js";

export const addBrand = async (req, res, next) => {
  const { name, subCategoryID } = req.body;
  const slug = slugify(name, { lower: true, replacement: "_" });

  try {
    const isBrandExist = await BrandModel.findOne({ name });

    if (isBrandExist) {
      const subCats = Array.isArray(subCategoryID)
        ? subCategoryID
        : [subCategoryID];

      let alreadyExists = true;

      subCats.forEach((catId) => {
        const exists = isBrandExist.subCategoryID.some(
          (existingId) => existingId.toString() === catId.toString()
        );

        if (!exists) {
          isBrandExist.subCategoryID.push(catId);
          alreadyExists = false;
        }
      });

      if (alreadyExists) {
        return next(new Error("brand already has these subCategories"));
      }

      await isBrandExist.save();
      return res.json({ message: "brand updated", brand: isBrandExist });
    }

    if (!req.file) {
      next(new Error("brand logo is required"));
    }
    const brandObject = {
      name,
      slug,
      logo: {
        secure_url: req.file.path,
        public_id: req.file.filename,
      },
      subCategoryID,
    };

    const brand = await BrandModel.create(brandObject);
    if (!brand) next(Error("brand not created"));
    return res.json({ message: "brand created", brand });
  } catch (error) {
    next(new Error("add brand Error: " + error.message));
  }
};

export const getBrands = async (req, res, next) => {
  try {
    const brands = await BrandModel.find().populate("subCategoryID");
    res.json({ message: "all brands", brands });
  } catch (error) {
    next(new Error("get brands Error: " + error.message));
  }
};
