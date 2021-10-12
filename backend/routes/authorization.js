const validRoutes = require("../config/validRoutes.json");
let publicRoutes = validRoutes.publicRoutes;
let studentRoutes = validRoutes.studentRoutes;
let teacherRoutes = studentRoutes.concat(validRoutes.teacherRoutes);
let adminRoutes = teacherRoutes.concat(validRoutes.adminRoutes);
const { accessTokenVerification } = require('../utils/jwt');

//checkauthorization is a middleware function , checkauthorization is called before every route
async function checkauthorization(req, res, next) {
    try {
        if (publicRoutes.includes(req.url)) {
            next();
        }
        else {
            const accessToken = req.cookies.login ? JSON.parse(req.cookies.login).accessToken : undefined;
            if (!accessToken) {
                res.status(401).json({ data: null, error: "Unauthorized" });
                return;
            }
            //1.Verify and decode incoming access token,also renews access token when expired:function returns decoded token else throws error
            let jwtdata = await accessTokenVerification(accessToken);
            //==>if token was renewed
            if (jwtdata.newAccessToken) {
                res.clearCookie("login");
                res.cookie
                    (
                        "login",
                        JSON.stringify({ accessToken: jwtdata.newAccessToken, sessionID: jwtdata.newAccessToken.sessionID }),
                        { httpOnly: true, secure: process.env.NODE_ENV === "production" }
                    );
            }

            //2.Check whether the following request is valid
            if (
                (jwtdata.role === 'student' && studentRoutes.includes(req.url)) ||
                (jwtdata.role === 'teacher' && teacherRoutes.includes(req.url)) ||
                (jwtdata.role === 'admin' && adminRoutes.includes(req.url))
            ) {
                //3.Adding uuid and sessionID to req.body
                req.body.uuid = jwtdata.uuid
                req.body.sessionID = jwtdata.sessionID
                next();
            }
            else {
                res.status(400).json({ data: null, error: "Invalid request URL" });
                return;
            }
        }
    } catch (e) {
        if (typeof e.message === 'undefined') {
            if (e === 'Session expired') {
                res.clearCookie("login");
            }
            res.status(401).json({ data: null, error: e });
        } else {
            res.status(400).json({ data: null, error: e.message });
        }
        return;
    }
}

module.exports.checkauthorization = checkauthorization;