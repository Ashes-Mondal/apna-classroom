//Dependencies
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
require('./global');
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const mongoConnection = require('./mongoDBConnection')

try {
    const port = process.env.PORT || 8000;
    const app = express();

    //Middlewares
    app.use(cookieParser(global.cookieSecret));
    app.use(cors({ origin: ['http://localhost:3000', 'https://localhost:3000'], credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //mongoDB connection
    mongoConnection()
        .then(() => {
            console.log(global.color.green, 'Successfully connected to mongoDB server', global.color.reset)
        })
        .catch(() => {
            console.error(global.color.red, "Failed to connect mongoDB server", global.color.reset);
            console.log(global.color.yellow, "Stopping the server...", global.color.reset);
            process.exit(0);
        })

    //checkauthorization
    app.use(require("./routes/authorization.js").checkauthorization);

    //api endpoints
    require("./routes/index.js")(app);
    
    app.listen(port, () => {
        console.log(`Server is listening to port: ${port}`);
    });

} catch (error) {
    console.error(error);
    console.log(global.color.yellow, "Stopping the server...", global.color.reset);
    process.exit(0);
}

