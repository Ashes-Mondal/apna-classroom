import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { config } from "./jitsiConfig";
import "./VC.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, unsetLoading } from "../../../redux/actions/loading";

function VC() {
    const { meetingID, classroomID } = useParams();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading());
        const container = document.createElement("div");
        document.querySelector("#jitsi").innerHTML = "";
        document.querySelector("#jitsi").appendChild(container);

        container.id = "meet";
        container.style.width = "100vw";
        container.style.height = "100vh";
        var domain = "meet.jit.si";
        var options = {
            roomName: meetingID,
            parentNode: container,
            ...config,
            userInfo: {
                email: user.email,
                displayName: user.name,
            },
        };
        let api = new window.JitsiMeetExternalAPI(domain, options);
        api.on("videoConferenceLeft", (e) => {
            if (e) console.error(e);
            api.dispose();
            window.location.replace(`/class/${classroomID}`);
        });
        dispatch(unsetLoading());
        return () => {
            api.dispose();
        };
    }, [classroomID, meetingID, user, dispatch]);
    return <div id="jitsi"></div>;
}

export default VC;
