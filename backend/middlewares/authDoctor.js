// import jwt from "jsonwebtoken";

// const authDoctor = async (req, res, next) => {
//   try {
//     const { dToken } = req.headers;

//     console.log("Received dToken:", dToken); // Debug: check token received

//     if (!dToken) {
//       return res.json({ success: false, message: "Not Authorized. Login Again" });
//     }

//     // Verify JWT token
//     const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);

//     // Attach decoded token info to request for downstream use
//     req.doctor = token_decode;

//     // Ensure req.body exists before adding docId (optional)
//     req.body = req.body || {};
//     req.body.docId = token_decode.id;

//     next();
//   } catch (error) {
//     console.log("JWT Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authDoctor;

import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.doctor = await doctorModel.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }
};

export default authDoctor;
