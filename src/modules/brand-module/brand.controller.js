import slugify from "slugify";
import BrandModel from "../../../db/models/brand-model/brand-model.js";

export const getBrands = async (req, res, next) => {
  try {
    const brands = await BrandModel.find().populate("subCategoryID");
    res.json({ message: "all brands", brands });
  } catch (error) {
    next(new Error("get brands Error: " + error.message));
  }
};

export const getBrandById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new Error("brand id is required"));

  try {
    const brand = await BrandModel.findById(id).populate("subCategoryID");
    if (!brand) return next(new Error("brand not found"));
    res.json({ message: "brand found", brand });
  } catch (error) {
    next(new Error("get brand by id Error: " + error.message));
  }
};

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

export const updateBrand = async (req, res, next) => {
  const { id } = req.params;
  const { name, subCategoryID } = req.body;

  if (!id) return next(new Error("brand id is required"));

  try {
    const brand = await BrandModel.findById(id);
    if (!brand) return next(new Error("brand not found"));

    const updatedBrand = {
      name: name || brand.name,
      slug: slugify(name || brand.name, { lower: true, replacement: "_" }),
      subCategoryID: subCategoryID || brand.subCategoryID,
    };

    if (req.file) {
      updatedBrand.logo = {
        secure_url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const result = await BrandModel.findByIdAndUpdate(id, updatedBrand, {
      new: true,
    });

    res.json({ message: "brand updated", brand: result });
  } catch (error) {
    next(new Error("update brand Error: " + error.message));
  }
};

export const deleteBrand = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new Error("brand id is required"));

  try {
    const brand = await BrandModel.findByIdAndDelete(id);
    if (!brand) return next(new Error("brand not found"));

    res.json({ message: "brand deleted", brand });
  } catch (error) {
    next(new Error("delete brand Error: " + error.message));
  }
};