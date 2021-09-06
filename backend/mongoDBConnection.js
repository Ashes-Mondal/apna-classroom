const mongoose = require("mongoose");
const config = require('./config/mongoDBConfig.json');

const mongoConnection = async () => {
    try {
        return await mongoose
            .connect
            (
                config.mongoURL.replace('<password>',global.mongoDbPassword),
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    connectTimeoutMS: 1000,
                }
            )
    } catch (error) {
        throw error;
    }

}

module.exports = mongoConnection;