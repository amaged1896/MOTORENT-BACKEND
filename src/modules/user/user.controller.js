import User from "../../../DB/models/user.model.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";
import { sendData } from "../../utils/sendData.js";
import {
  getAll,
  getOne,
  deleteOne,
  updateOne,
} from "../controllers.factory.js";

export const addToWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id,
    { $addToSet: { wishlist: req.body.carId } },
    { new: true }
  );

  if (!user) {
    return next(new AppError(`user id is not exists`, 404));
  }
  sendData(200, "success", "Car added to wishlist successfully", null, res);
});

export const clearWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id,
    { $set: { wishlist: [] } },
    { new: true }
  );

  if (!user) {
    return next(new AppError(`user id is not exists`, 404));
  }
  sendData(200, "success", "Wishlist cleared successfully", null, res);
});

export const removeFromWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id,
    { $pull: { wishlist: req.body.carId } },
    { new: true }
  );

  if (!user) {
    return next(new AppError(`user id is not exists`, 404));
  }
  sendData(200, "success", "Car removed from wishlist successfully", null, res);
});

export const getAllUserCars = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('ownedCars').select('ownedCars rentedCars');

  if (!user) {
    return next(new AppError(`user id is not exists`, 404));
  }
  sendData(200, "success", "User cars fetched successfully", user, res);
});

const populateObj = [
  {
    path: "rentedCars",
    select: "-__v",
  },
  {
    path: "ownedCars",
    select: "-__v",
  },
];


export const getAllUsers = getAll(User, populateObj);

export const getUser = getOne(User, populateObj);

export const deleteUser = deleteOne(User);

export const updateUser = updateOne(User);
