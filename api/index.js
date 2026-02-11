import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import userRoute from "./src/routes/userRoute.js";
import authRoute from "./src/routes/authRoute.js";
import subjectRoute from "./src/routes/subjectRoute.js";
import packageRoute from "./src/routes/packageRoute.js";
import packageItemRoute from "./src/routes/packageItemRouter.js";
import registrationRoute from "./src/routes/registrationRoute.js";
import dashboardRoute from "./src/routes/dashboardRoute.js";
import studentRoute from "./src/routes/studentRoute.js";
import classRoute from "./src/routes/classRoute.js";
import teacherRoute from "./src/routes/teacherRoute.js";

import Package from "./src/models/packageModel.js";
import PackageItem from "./src/models/packageItemModel.js";
import Subject from "./src/models/subjectModel.js";
import Class from "./src/models/classModel.js";
import ClassSchedule from "./src/models/classScheduleModel.js";
import ClassMember from "./src/models/classMemberModel.js";
import User from "./src/models/userModel.js";
import Student from "./src/models/studentModel.js";
import StudentEnrollment from "./src/models/studentEnrollmentModel.js";
import Teacher from "./src/models/teacherModel.js";
import Registration from "./src/models/registrationModel.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//route
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/subject", subjectRoute);
app.use("/package", packageRoute);
app.use("/package-item", packageItemRoute);
app.use("/registration", registrationRoute);
app.use("/dashboard", dashboardRoute);
app.use("/students", studentRoute);
app.use("/classes", classRoute);
app.use("/teachers", teacherRoute);
// Inisialisasi asosiasi antar model

const models = {
  Package,
  PackageItem,
  Subject,
  Class,
  ClassSchedule,
  ClassMember,
  User,
  Student,
  StudentEnrollment,
  Teacher,
  Registration,
};

// Initialize associations for all models that have associate function
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
