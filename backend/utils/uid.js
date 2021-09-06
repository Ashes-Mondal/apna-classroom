const crypto = require("crypto");

module.exports.createUniqueID = async () => {
    try {
        return crypto.randomBytes(24).toString('hex');
    } catch (e) {
        throw e;
    }
}