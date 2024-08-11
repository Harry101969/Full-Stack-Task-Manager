// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export const dbConnection = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

//     console.log(
//       `DB connection established connection string ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("DB Error: " + error);
//   }
// };

// export const createJWT = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });

//   // Change sameSite from strict to none when you deploy your app
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "none", //prevent CSRF attack
//     maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
//   });
// };
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    if (connectionInstance) {
      console.log(
        `DB connection established ${connectionInstance.connection.host}`
      );
    }
  } catch (error) {
    console.log(`Error while connecting to the database`, error);
  }
};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  });
};
