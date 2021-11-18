import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudentAssignmentsGraphData, getStudentAverageGraphData } from "../../../axios/classroom";
import { setLoading, unsetLoading } from "../../../redux/actions/loading";
import LineGraph from "./graphs/LineGraph";
import LineGraph2 from "./graphs/LineGraph2";

const getThemeColor = { red: "#ff6969", purple: "#b68ceb", blue: "#72cdf5", yellow: "rgb(241, 194, 72)", green: "#7ae24a", orange: "rgb(255, 146, 82)", black: "black" };

const Graph = () => {
    const { classroomID } = useParams();
    const [dataGraph1, setDataGraph1] = useState([]);
    const [dataGraph2, setDataGraph2] = useState([]);
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading());
        getStudentAverageGraphData({ classroomID })
            .then((resp) => {
                // console.log("getStudentAverageGraphData_resp:", resp);
                const data = [
                    {
                        id: "Student Average",
                        color: "hsl(125, 70%, 50%)",
                        data: resp.data,
                    },
                ];
                setDataGraph1(data);
                dispatch(unsetLoading());
            })
            .catch((e) => {
                console.error(e);
                dispatch(unsetLoading());
            });

            dispatch(setLoading());
            getStudentAssignmentsGraphData({ classroomID }).then((resp) => {
                console.log("getStudentAssignmentsGraphData:", resp);
                setDataGraph2(resp.data);
                dispatch(unsetLoading());
            })
            .catch((e) => {
                console.error(e);
                dispatch(unsetLoading());
            });
    }, [classroomID,dispatch]);

    return (
        <div>
            <LineGraph data={dataGraph1} theme={getThemeColor[theme[classroomID]]} />
            <LineGraph2 data={dataGraph2} theme={getThemeColor[theme[classroomID]]} />
        </div>
    );
};

export default Graph;
