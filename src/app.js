const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");

require("dotenv").config();
const app = express();

// init middleware

// - add morgan middleware: ghi log HTTP requests : GET / 200 5.123 ms - 12
app.use(morgan("dev"));
// morgan("combined");

// - add helmet middleware: bảo vệ ứng dụng web bằng cách thiết lập các HTTP headers bảo mật, giảm thiểu nguy cơ tấn công như XSS (Cross-Site Scripting), Clickjacking, DNS Prefetching, Sniffing, v.v.
app.use(helmet());

// - add compression middleware: giúp nén HTTP response bằng Gzip hoặc Brotli, giúp giảm băng thông, dung lượng dữ liệu gửi về client và tăng tốc độ tải trang.
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
require("./database/init.mongodb");
// init router
app.use("/", require("./routers"));
//handling errors

module.exports = app;
