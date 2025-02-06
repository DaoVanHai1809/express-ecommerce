"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
    try {
      const newKeyToken = await keyTokenModel.create({
        user: userId,
        publicKey: publicKey.toString(),
        refreshToken,
      });
      return newKeyToken ? newKeyToken.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
