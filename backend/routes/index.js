const user = require("./user").router;


module.exports = (app) => {
    app.use
        (
            user,
        );
};
