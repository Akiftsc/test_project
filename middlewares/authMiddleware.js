import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) =>
        err ? res.redirect("/login") : next()
      );
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(401).json({
      succeed: false,
      error: "Not authorized",
    });
  }
};

export { authenticateToken };
