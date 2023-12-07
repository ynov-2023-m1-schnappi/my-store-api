require('dotenv').config();

const config = {
    port: process.env.PORT,
    frontend_url: process.env.FRONTEND_URL,
    access_Key: process.env.ACCESS_KEY,
    secret_access_Key: process.env.SECRET_ACCESS_KEY,
};

module.exports = config;
