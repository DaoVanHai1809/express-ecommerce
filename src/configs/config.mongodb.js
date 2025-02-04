const dev = {
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.MONGO_PORT || 27017,
    name: process.env.MONGO_DATABASE || "ecommerce",
    username: process.env.MONGO_INITDB_ROOT_USERNAME || "admin",
    password: process.env.MONGO_INITDB_ROOT_PASSWORD || "password",
  },
};

const product = {
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "ecommerce",
    username: process.env.PRO_DB_USERNAME || "admin",
    password: process.env.PRO_DB_PASSWORD || "password",
  },
};

const config = { dev, product };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
