const user = require("./user").router;
const file = require("./file").router;


module.exports = (app) => {
    app.use
        (
            user,
            file
        );
};
