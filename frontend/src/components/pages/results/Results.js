import React, { useEffect, useMemo, useState } from "react";
import "./result.scss";
import Activity from "./Activity";
import Head from "./Head";
import { useParams } from "react-router-dom";
import AverageSection from "./AverageSection";
import Error from "../error/Error";
import { useSelector } from "react-redux";
import { all_activities } from "../../../Dummy-data/activities";
import NoData from "../../common/no-data/NoData";

const calcMarks = (activities) => {
    let totalMarks = 0,
        yourMarks = 0,
        ct = 0;
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].marks > -1) {
            ct++;
            totalMarks += activities[i].AssignmentID.totalMarks;
            yourMarks += activities[i].marks;
        } else {
            const submissionDate = activities[i].createdAt;
            if (submissionDate > activities[i].AssignmentID.dueDate) {
                ct++;
                totalMarks += activities[i].AssignmentID.totalMarks;
            }
        }
    }
    const marks = {
        yourMarks,
        totalMarks,
        yourAverage: Math.ceil((yourMarks / totalMarks) * 100),
        classAverage: 50,
    };
    return marks;
};

const getSubjectName = (enrolledClassrooms, classroonID) => {
    for (let i = 0; i < enrolledClassrooms.length; i++) {
        if (enrolledClassrooms[i]._id === classroonID)
            return enrolledClassrooms[i].subjectName;
    }
};

const Results = () => {
    const { classroomID } = useParams();
    const theme = useSelector((state) => state.theme);
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const [activities, setActivities] = useState([]);

    const dropdownList = useMemo(() => {
        let result = [];
        for (let i = 0; i < enrolledClassrooms.length; i++) {
            result.push({
                name: enrolledClassrooms[i].subjectName,
                href: `/class/${enrolledClassrooms[i]._id}/results`,
            });
        }
        return result;
    }, [enrolledClassrooms]);

    /******************   useEffect()   **************/
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [classroomID]);

    //fetch all subject activities
    useEffect(() => {
        //fetch from backend logic
    }, [classroomID]);
    /******************   useEffect()   **************/
    if (!theme[classroomID]) {
        return <Error />;
    }
    return (
        <div className="result-page">
            <Head
                theme={theme[classroomID]}
                active={getSubjectName(enrolledClassrooms,classroomID)}
                list={dropdownList}
            />
            <div className="result-page-main">
                {!activities.length ? (
                    <NoData />
                ) : (
                    <>
                        <AverageSection
                            marks={calcMarks(activities)}
                            theme={theme[classroomID]}
                        />
                        {activities.map((activity, idx) => (
                            <Activity
                                key={idx}
                                activity={activity}
                                theme={theme[classroomID]}
                                link={`class/${classroomID}/asg/${activity.AssignmentID._id}`}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Results;
