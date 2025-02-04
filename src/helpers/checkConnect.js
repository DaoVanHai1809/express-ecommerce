"user strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 10000; // Kiểm tra mỗi 5 giây
//count connect
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
};

//check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length; // Lấy số lượng CPU của máy chủ
    const memoryUsage = process.memoryUsage().rss; // Lấy dung lượng bộ nhớ RAM đang sử dụng (byte)
    const maxConnections = numCores * 5; // số kết nối tối đa có thể chịu được ( ví dụ quy tắc là mỗi CPU chịu được tối đa 5 kết nối)
    const maxMemoryUsage = 512; // Memory usage tối đa cho phép
    console.log(`Active connections: ${numConnections}`);
    console.log(`Memory usage: ${(memoryUsage / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Max memory usage: ${maxMemoryUsage} MB`);

    if (numConnections >= maxConnections) {
      console.error(
        "❌ Overload detected! Too many connections. Please close some connections."
      );
    } else if (memoryUsage > maxMemoryUsage * 1024 * 1024) {
      console.error("❌ Memory usage is high. Please close some connections.");
    }
  }, _SECONDS); // Monitor every 10 seconds
};

module.exports = {
  countConnect,
  checkOverload,
};
