// // middlewares/authMiddleware.js
const clerk = require("@clerk/clerk-sdk-node");
// const dotenv = require("dotenv");
// dotenv.config();

// const verifyClerkToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     console.log("Token received:", token);
//     // Verify the token using Clerk
//     const { userId } = await clerk.verifyToken(token);

//     // Fetch the user using the userId obtained from token verification
//     const user = await clerk.users.getUser(userId);
//     console.log("User ID is:", userId);
//     console.log("User data:", user);

//     req.user = user; // Attach user to the request
//     next();
//   } catch (error) {
//     console.error("Token verification error:", error); // Log the actual error
//     return res
//       .status(403)
//       .json({ message: "Invalid token", error: error.message });
//   }
// };

// module.exports = { verifyClerkToken };
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT using public key from environment variable
const verifyJwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, "\n");

    // Add clockTolerance of 5 seconds to avoid small time discrepancies
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
      clockTolerance: 5,
    });

    req.user = decoded; // Attach decoded token to request
    next();
  } catch (error) {
    if (error.name === "NotBeforeError") {
      console.error("Token not active yet:", error.date);
      return res
        .status(403)
        .json({ message: "Token not active yet", notBefore: error.date });
    }

    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { verifyJwtToken };
