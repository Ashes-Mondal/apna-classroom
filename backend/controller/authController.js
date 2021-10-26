const userModel = require("../model/user/userSchema"),
    jwt = require("../utils/jwt"),
    brcypt = require("../utils/userPassword"),
    Session = require("../model/session/sessionSchema"),
    UID = require("../utils/uid");

exports.loginController = async (req, res, next) => {
    try {
        //1.Checking wether email exits or not
        let userInfo = await userModel.findOne({
            email: req.body.email,
        });
        //==>User does not exists
        if (userInfo === null) {
            res.status(400).json({ data: null, error: "User not registered" });
            return;
        }

        //2.Checking number of failed attemps
        if (userInfo.failedattemps > 2) {
            res.status(400).json({
                data: null,
                error: "Failed login attemps " + userInfo.failedattemps,
            });
            return;
        }

        //3.checking whether User is active
        if (userInfo.status != "Active") {
            res.status(400).json({
                data: null,
                error: "Login disabled kindly contact admin",
            });
            return;
        }

        //4.verifying password
        var passwordVerified = await brcypt.verifyPasswordHash(
            req.body.password,
            userInfo.password
        );
        //==>Invalid password
        if (!passwordVerified) {
            await userModel.updateOne(
                { email: req.body.email },
                {
                    $set: {
                        failedattemps: userInfo.failedattemps + 1,
                    },
                }
            );
            res.status(400).json({ data: null, error: "Invalid password" });
            return;
        } else {
            await userModel.updateOne(
                { email: req.body.email },
                {
                    $set: {
                        failedattemps: 0,
                    },
                }
            );
        }

        //Creating refresh token
        const refreshToken = await jwt.createRefreshToken({
            uuid: userInfo.uuid,
        });

        //Creating unique id for JWT token
        const jwtUid = await jwt.createJWTUniqueID();

        //Creating sessionID
        const sessionID = await UID.createUniqueID();

        //Creating JWT token
        const accessToken = await jwt.createAccessToken({
            sessionID: sessionID,
            uuid: userInfo.uuid,
            jwtUid: jwtUid,
            role: userInfo.role,
        });

        await Session.insertMany([
            {
                sessionID: sessionID,
                uuid: userInfo.uuid,
                refreshToken: refreshToken,
                jwtUid: jwtUid,
                clientAgent: req.headers["user-agent"],
            },
        ]);

        res.clearCookie("login");
        res.cookie(
            "login",
            JSON.stringify({ accessToken: accessToken, sessionID: sessionID }),
            { httpOnly: true, secure: process.env.NODE_ENV === "production" }
        );
        res.status(200).json({
            data: { accessToken: accessToken },
            error: null,
        });
    } catch (e) {
        res.status(400).json({ data: null, error: e.message });
    }
};

exports.registerController = async (req, res, next) => {
    try {
        //0.Checking if user exists
        let userInfo = await userModel.findOne({ email: req.body.email });
        //==>User does exists
        if (userInfo) {
            res.status(400).json({
                data: null,
                error: "User already registered",
            });
            return;
        }

        //1.Creating hashed password
        let hashPassword = await brcypt.createPasswordHash(req.body.password);

        //2.unique user ID
        let uuid = await UID.createUniqueID();

        //3.Inserting user data in User's table
        await userModel.insertMany([
            {
                name: req.body.name,
                uuid: uuid,
                email: req.body.email,
                password: hashPassword,
            },
        ]);
        res.status(200).json({ data: "Success", error: null });
    } catch (e) {
        res.status(400).json({ data: null, error: e.message });
    }
};

exports.logoutController = async (req, res, next) => {
    try {
        //
        let result = await Session.deleteOne({
            sessionID: req.body.sessionID,
        });

        if (result.deletedCount > 0) {
            res.clearCookie("login");
            res.status(200).json({ data: result, error: null });
        } else {
            res.status(200).json({ data: null, error: "No data deleted" });
        }
    } catch (e) {
        res.status(400).json({ data: null, error: e.message });
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        //0.decode the jwt token
        const decoded = await jwt.decodeResetLinkAccessToken(
            req.body.accessToken
        );
        //1.Creating hashed password
        let hashPassword = await brcypt.createPasswordHash(
            req.body.newPassword
        );
        console.log(decoded,decoded.email,hashPassword)
        const userInfo = await userModel.updateOne(
            { email: decoded.email },
            { password: hashPassword }
        );
        //==>User does exists
        if (!userInfo.modifiedCount) {
            res.status(401).json({
                data: null,
                error: "Access Denied",
            });
            return;
        }
        res.status(200).json({ data: "Success", error: null });
    } catch (e) {
        res.status(400).json({ data: null, error: e.message || e });
    }
};

exports.sendResetPasswordEmail = async (req, res, next) => {
    try {
        //0.Checking if user exists
        let userInfo = await userModel.findOne({ email: req.body.email });
        //==>User does exists
        if (!userInfo) {
            res.status(400).json({
                data: null,
                error: "User not registered",
            });
            return;
        }
        //1.create reset link
        const resetlink = await jwt.createResetLink({email:req.body.email});
        res.status(200).json({ data: resetlink, error: null });
    } catch (e) {
        res.status(400).json({ data: null, error: e.message || e });
    }
};
