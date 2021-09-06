const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

global.color = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    black: "\x1b[30m",
    reset: "\x1b[0m",
    blue: "\x1b[34m"
};

global.AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
global.RefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
global.mongoDbPassword = process.env.MONGO_PASSWORD;
global.cookieSecret = process.env.COOKIE_SECRET