import AppError from "./src/utils/appError.js";
import carRouter from "./src/modules/car/car.routes.js";
import userRouter from "./src/modules/user/user.routes.js";

export function appRouter(app, express) {
  app.use(express.json());
  // home page
  app.get("/", (req, res) => res.send("Hello World!"));

  // user
  app.use("/api/v1/users", userRouter);
  // cars
  app.use("/api/v1/cars", carRouter);

  //Not Found
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find the requested page ${req.originalUrl}`, 404));
  });
}
