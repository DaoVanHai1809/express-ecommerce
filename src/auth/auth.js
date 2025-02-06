"use strict";

const jwt = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1d",
    });
    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7d",
    });
    jwt.verify(accessToken, publicKey, (err, result) => {
      if (err) {
        console.error("error verifying access token", err);
      } else {
        console.log("decoded access token", result);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return { errorToken: error.message || error };
  }
};

module.exports = {
  createTokenPair,
};
