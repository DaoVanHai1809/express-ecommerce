"use strict";

const AccessService = require("../services/access.service");
class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signUp: ${req.body}`);
      const result = await AccessService.signUp(req.body);
      return res
        .status(201)
        .json({ success: true, message: "Sign up successfully.", ...result });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
