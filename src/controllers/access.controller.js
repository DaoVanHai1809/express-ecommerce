"use strict";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signUp: ${req.body}`);
      return res
        .status(201)
        .json({ success: true, message: "Sign up successfully." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
