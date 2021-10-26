const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const accessTokenConfig = require("../config/accessTokenConfig.json");
const refreshTokenConfig = require("../config/refreshTokenConfig.json"),
    jwtUidLength = 20;

// function will create unqiue id for JWT token
module.exports.createJWTUniqueID = async () => {
    try {
        return crypto.randomBytes(jwtUidLength).toString("hex");
    } catch (e) {
        throw e;
    }
};

// function will create access token
module.exports.createAccessToken = async (params) => {
    try {
        return jwt.sign(
            {
                jwtUid: params.jwtUid,
                sessionID: params.sessionID,
                uuid: params.uuid,
                role: params.role,
            },
            global.AccessTokenSecret,
            accessTokenConfig
        );
    } catch (e) {
        throw e;
    }
};

module.exports.createRefreshToken = async (params) => {
    try {
        return jwt.sign(
            {
                uuid: params.uuid,
            },
            global.RefreshTokenSecret,
            refreshTokenConfig
        );
    } catch (e) {
        throw e;
    }
};

const Sessions = require("../model/session/sessionSchema");
//function will renew the access Token
module.exports.renewAccessToken = async (accessToken) => {
    try {
        //1.Get payload from expired access token
        const decoded = await jwt.verify(
            accessToken,
            global.AccessTokenSecret,
            { ignoreExpiration: true }
        );
        //2.verify refresh Token
        let result = await Sessions.findOne(
            { sessionID: decoded.sessionID, jwtUid: decoded.jwtUid },
            { refreshToken: true }
        ).exec();
        if (!result) {
            throw "Session expired";
        }

        try {
            //==>Verification successfull
            await jwt.verify(result.refreshToken, global.RefreshTokenSecret);
        } catch (error) {
            //==>Verification failed
            if (error.name === "TokenExpiredError") {
                //delete session from database
                await Sessions.deleteOne({ sessionID: decoded.sessionID });
                //throw 'Session Expired' error
                const err = "Session expired";
                throw err;
            } else {
                throw error;
            }
        }

        //3.Create new access token
        const UID = await module.exports.createJWTUniqueID();
        const newAccessToken = await jwt.sign(
            {
                sessionID: decoded.sessionID,
                uuid: decoded.uuid,
                role: decoded.role,
                jwtUid: UID,
            },
            global.AccessTokenSecret,
            accessTokenConfig
        );

        //4.update the database
        result = await Sessions.updateOne(
            { sessionID: decoded.sessionID, jwtUid: decoded.jwtUid },
            {
                $set: {
                    jwtUid: UID,
                },
            }
        ).exec();
        return { ...decoded, jwtUid: UID, newAccessToken: newAccessToken };
    } catch (error) {
        throw error;
    }
};

//function will verify access token
module.exports.accessTokenVerification = async (accessToken) => {
    try {
        //1.Verify incoming access token
        const decoded = await jwt.verify(accessToken, global.AccessTokenSecret);

        //2.Verify with database
        let result = await Sessions.find(
            { sessionID: decoded.sessionID, jwtUid: decoded.jwtUid },
            { status: true }
        ).exec();
        if (result.length ? result[0].status === "Inactive" : true) {
            throw "Unauthorized";
        }
        return decoded;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return await module.exports.renewAccessToken(accessToken);
        } else throw error;
    }
};

module.exports.createResetLink = async (params) => {
    try {
        const accessToken = jwt.sign(
            {
                email: params.email,
            },
            global.AccessTokenSecret,
            accessTokenConfig
        );
        const resetLink = `${process.env.BASE_URL}/reset/${accessToken}`;
        return resetLink;
    } catch (e) {
        throw e;
    }
};

module.exports.decodeResetLinkAccessToken = async (accessToken) => {
    try {
        //1.Verify incoming access token
        const decoded = await jwt.verify(accessToken, global.AccessTokenSecret);
        return decoded;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw "Reset link Expired";
        } else throw error;
    }
};
