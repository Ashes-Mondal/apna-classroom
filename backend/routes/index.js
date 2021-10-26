const user = require("./user").router;
const file = require("./file").router;
const classroom = require("./classroom").router;
const assignment = require("./assignment").router;
const annoucement = require("./annoucement").router;

module.exports = (app) => {
    app.use('/api',user, file, classroom, assignment,annoucement);
};
