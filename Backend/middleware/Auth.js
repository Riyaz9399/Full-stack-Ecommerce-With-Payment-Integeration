import jsonwebToken from "jsonwebtoken";

export const Auth = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const tokenFromCookie = req.cookies?.token;
    const tokenFromHeader = req.headers["authorization"];
    
    // Log token for debugging
    console.log("Cookie Token:", tokenFromCookie);
    console.log("Header Token:", tokenFromHeader);

    // If token is in Authorization header, split "Bearer <token>"
    let token;
    if (tokenFromHeader && tokenFromHeader.startsWith("Bearer ")) {
      token = tokenFromHeader.split(" ")[1];  // Extract token part
    } else if (tokenFromCookie) {
      token = tokenFromCookie;  // Use cookie token if available
    }

    // If no token found, return unauthorized
    if (!token) {
      return res.status(400).json({
        message: "You are not logged in",
        success: false,
        error: true,
      });
    }

    // Verify the token using the secret key
    jsonwebToken.verify(token, process.env.secreat_key, (err, decoded) => {
      if (err) {
        console.log("JWT Verification Error:", err);
        return res.status(401).json({
          message: "Invalid or expired token",
          success: false,
          error: true,
        });
      }

      // Assign decoded user ID to req.user for access in later routes
      req.user = decoded._id;
      
      // Proceed to the next middleware
      next();
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
