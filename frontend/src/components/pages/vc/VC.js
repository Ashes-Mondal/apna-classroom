import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Jitsi from "react-jitsi";
import { config } from "./jitsiConfig";

import "./VC.scss";
import { useSelector } from "react-redux";

function VC() {
    const { meetingID, classroomID } = useParams();
    const user = useSelector((state) => state.user);
    const history = useHistory();

    const loadApi = () => {
        const container = document.createElement("div");
        document.querySelector("#jitsi").appendChild(container);
        container.id = "meet";
        container.style.height = "100vh";
        var domain = "meet.jit.si";
        var options = {
            roomName: "meetingID",
            parentNode: container,
            // userDetails: {
            //     avatarUrl: localStorage.getItem("photoUrl"),
            // },
            ...config,
            userInfo: {
                email: user.email,
                displayName: user.name,
            },
        };
        let api = new window.JitsiMeetExternalAPI(domain, options);
        api.addListener("videoConferenceLeft", (e) => {
            console.log("/!\\ USER LEFT", e);
            api.dispose();
            history.replace(`/class/${classroomID}`);
        });
    };
    useEffect(() => {
        loadApi();
    }, []);
    return <div id="jitsi"></div>;
}

export default VC;
