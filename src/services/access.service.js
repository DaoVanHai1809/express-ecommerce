"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/auth");
const { type } = require("os");
const { format } = require("path");
const { getInfoData } = require("../utils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step1: check email
      const hodelShop = await shopModel.findOne({ email }).lean();
      if (hodelShop) {
        return {
          code: "xxxx",
          message: "Shop already registered!",
          status: "error",
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        // created privateKey, publicKey
        // rsa: thuật toán bất đối xứng
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1", //pkcs8
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1", // pkcs8
            format: "pem",
          },
        });

        // created token pair
        const { accessToken, refreshToken, errorToken } = await createTokenPair(
          { userId: newShop._id, email },
          publicKey.toString(),
          privateKey
        );
        if (errorToken) {
          return {
            code: "xxxx",
            message: "Create token failed!",
            status: "error",
          };
        }
        // const publicKeyObject = crypto.createPublicKey({
        //   publicKey.toString(),
        // });
        // console.log(publicKeyObject);
        const newKeyToken = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          refreshToken,
        });
        if (!newKeyToken) {
          return {
            code: "xxxx",
            message: "newKeyToken is null!",
            status: "error",
          };
        }
        return {
          code: 201,
          message: "Sign up successfully.",
          status: "success",
          metadata: {
            accessToken,
            refreshToken,
            shop: getInfoData({
              fields: ["_id", "email", "name"],
              object: newShop,
            }),
          },
        };
      }
      return {
        code: 500,
        message: "Create shop failed!",
        status: "error",
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message || error,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
