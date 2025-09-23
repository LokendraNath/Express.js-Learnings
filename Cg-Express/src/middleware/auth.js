import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    //ye frontent se aata hai token jo login karne ke time me generate hua tha vo
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
      next();
      return;
    } catch (error) {
      next(error);
      return;
    }
  }
  const error = new Error("Not Authenticated");
  error.statusCode = 401;
  next(error);
};

export default auth;
