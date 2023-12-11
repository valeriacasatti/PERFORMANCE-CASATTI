import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

//check user autehenticated
export const isAuth = (req, res, next) => {
  jwt.verify(req.cookies.cookieToken, config.token.privateKey, (err, user) => {
    if (err) {
      console.log(err);
      res.json({
        status: "error",
        message: "you must be authenticated to access",
      });
    } else {
      next();
    }
  });
};

//check role user
export const checkRole = (roles) => {
  return (req, res, next) => {
    jwt.verify(
      req.cookies.cookieToken,
      config.token.privateKey,
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/profile?error=access_denied");
        } else {
          if (roles.includes(user.role)) {
            next();
          } else {
            res.redirect(
              `/profile?error=access_denied&message=Access_denied_for_${user.role}`
            );
          }
        }
      }
    );
  };
};

//, 200, {err: `only ${user.role} has access`, style: "profile.css",}
