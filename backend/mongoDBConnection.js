const mongoose = require("mongoose");
const config = require('./config/mongoDBConfig.json');
const Grid = require('gridfs-stream');

const mongoConnection = async () => {
    try {
        let conn = await mongoose
            .createConnection
            (
                config.mongoURL.replace('<password>', global.mongoDbPassword),
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    connectTimeoutMS: 1000,
                }
            )
        conn.once('open', () => {
            global.gfs = Grid(conn.db, mongoose.mongo);
            global.gfs.collection('Uploads')
        });
    } catch (error) {
        throw error;
    }

}

module.exports = mongoConnection;