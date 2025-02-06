"use strict";

const _ = require("lodash");
// sử dụng lodash để chọn ra các trường thông tin cần lấy

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

module.exports = {
  getInfoData,
};
