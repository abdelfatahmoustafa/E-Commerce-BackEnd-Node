import { nanoid } from "nanoid";
import couponModel from "../../../db/models/coupon-model/coupon-model.js";
import UserModel from "../../../db/models/user-model/user-model.js";

export const generateCouponCode = async (req, res, next) => {
  const {
    couponCode, // كود الكوبون (مثال: WELCOME10)
    discountType, // نوع الخصم (نسبة مئوية أو مبلغ ثابت)
    discountAmount, // قيمة الخصم (مثال: 10% أو 50 جنيه)
    minimumOrderAmount, // الحد الأدنى لقيمة الطلب (اختياري)
    maximumDiscountAmount, // الحد الأقصى للخصم (اختياري لو النوع نسبة مئوية)
    totalUsageLimit, // أقصى عدد مرات استخدام للكوبون لكل العملاء
    userUsageLimit, // أقصى عدد مرات استخدام للكوبون لكل مستخدم
    validFrom, // تاريخ بداية صلاحية الكوبون
    validUntil, // تاريخ انتهاء صلاحية الكوبون
    isActive, // حالة الكوبون (شغال true / متوقف false)
    applicableTo, // الكوبون بيتطبق على إيه (منتجات، تصنيفات، مستخدمين)
    createdByAdmin, // رقم/ID الأدمن اللي أنشأ الكوبون
  } = req.body;

  try {
    let code = couponCode;
    if (!code) {
      do {
        code = nanoid(8).toUpperCase();
      } while (
        await couponModel.findOne({
          couponCode: code,
        })
      );
    }
    if (discountType === "percentage" && discountAmount > 100) {
      return next(new Error("Percentage discount cannot exceed 100%."));
    }
    if (!discountAmount || discountAmount <= 0) {
      return next(new Error("Discount amount must be greater than 0."));
    }

    if (
      discountType === "percentage" &&
      (!maximumDiscountAmount || maximumDiscountAmount <= 0)
    ) {
      return next(
        new Error(
          "Maximum discount amount must be provided for percentage-based coupons."
        )
      );
    }
    if (!validFrom || !validUntil) {
      return next(new Error("Both start and expiry dates are required."));
    }

    const now = new Date();

    if (validFrom && new Date(validFrom) < now) {
      return next(new Error("Coupon start date cannot be in the past."));
    }

    if (validUntil && new Date(validUntil) < now) {
      return next(new Error("Coupon expiry date cannot be in the past."));
    }
    if (
      validFrom &&
      validUntil &&
      new Date(validUntil) <= new Date(validFrom)
    ) {
      return next(
        new Error("Coupon expiry date must be after the start date.")
      );
    }
    const couponObject = {
      ...req.body,
      couponCode: code,
    };

    const Coupon = await couponModel.create(couponObject);
    res.status(201).json({
      status: "success",
      message: "Coupon code generated successfully",
      data: Coupon,
    });
  } catch (error) {
    next(new Error("Error generating coupon code: " + error.message));
  }
};

export const applyCoupon = async (req, res, next) => {
  const { couponCode, userId, totalPrice } = req.body;

  try {
    // 1. البحث عن الكوبون
    const coupon = await couponModel.findOne({ couponCode });
    if (!coupon) {
      return next(new Error("Coupon not found"));
    }

    // 2. البحث عن المستخدم
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new Error("User not found"));
    }

    const userIdIsExist = coupon.applicableTo.users
      .map((id) => id.toString())
      .includes(userId);

    if (!userIdIsExist && coupon.applicableTo.users.length > 0) {
      return next(new Error("This coupon is not applicable to this user."));
    }

    // 3. التحقق من أن المستخدم لم يتجاوز الحد الأقصى لاستخدام الكوبون
    const couponUsage = user.usedCoupons.find(
      (coupon) => coupon.couponCode === couponCode
    );

    if (couponUsage && couponUsage.usageCount >= coupon.userUsageLimit) {
      return next(
        new Error("You have exceeded your usage limit for this coupon.")
      );
    }

    // 4. إضافة أو تحديث سجل الكوبون في usedCoupons للمستخدم
    if (couponUsage) {
      couponUsage.usageCount += 1; // زيادة عدد الاستخدام
    } else {
      user.usedCoupons.push({ couponCode, usageCount: 1 }); // إضافة الكوبون مع عدد الاستخدامات الأول
    }

    // 5. حفظ التحديثات
    await user.save();

    // 6. حساب الخصم
    let discountAmount = coupon.discountAmount;
    if (coupon.discountType === "percentage") {
      discountAmount = (totalPrice * coupon.discountAmount) / 100;
      if (coupon.maximumDiscountAmount) {
        discountAmount = Math.min(discountAmount, coupon.maximumDiscountAmount);
      }
    }

    res.status(200).json({
      status: "success",
      message: "Coupon applied successfully.",
      discountAmount,
      finalPrice: totalPrice - discountAmount,
    });
  } catch (error) {
    next(new Error("Error applying coupon: " + error.message));
  }
};

export const couponEdit = async (req, res, next) => {
  try {
    const { couponCode } = req.params;
    const { product, category, user, isActive } = req.body;
    const coupon = await couponModel.findOneAndUpdate(
      { couponCode },
      {
        $set: {
          "applicableTo.products": product,
          "applicableTo.categories": category,
          "applicableTo.users": user,
          isActive: isActive,
        },
      },
      { new: true }
    );

    if (!coupon) {
      return next(new Error("Coupon not found"));
    }

    res.status(200).json({
      status: "success",
      message: "Coupon updated successfully",
      Coupon_data: coupon,
    });
  } catch (error) {
    next(new Error("Error editing coupon: " + error.message));
  }
};
