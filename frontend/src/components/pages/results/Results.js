import React from 'react'
import './result.scss'
import Activity from './Activity'
import Head from './Head'
import { useParams } from "react-router-dom";
import AverageSection from './AverageSection';

/* DUMMY DATA STARTS HERE*/
const marks = {
    yourMarks: 70,
    totalMarks: 100,
    yourAverage: 70,
    classAverage: 50
}
const theme = ['purple','orange','red','yellow','green'][Math.floor(Math.random()*5)%5];
const list = [
    {
        name: 'Software Engineering',
        href: '/results/Software Engineering'
    },
    {
        name: 'Computer Graphics',
        href: '/results/Computer Graphics'
    },
    {
        name: 'System and Signals',
        href: '/results/System and Signals'
    },
    {
        name: 'Cyber Security and Laws',
        href: '/results/Cyber Security and Laws'
    },
]
const randomDate = new Date()
randomDate.setDate(new Date().getDate() + Math.floor((Math.random() * 4) - 2))
const activities = [
    {
        AssignmentID: {
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
    {
        AssignmentID: {
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
    {
        AssignmentID: {
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
    {
        AssignmentID: {
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
    {
        AssignmentID: {
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
    {
        AssignmentID: {
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
]
/* DUMMY DATA ENDS HERE*/

const Results = () => {
    const { subject } = useParams();
    return (
        <div className='result-page'>
            <Head theme={theme} active={subject} list={list} />
            <div className='result-page-main'>
                <AverageSection marks={marks} theme={theme} />
                {
                    activities.map((activity, idx) => <Activity key={idx} activity={activity} theme={theme} />)
                }
                {/* <Activity activity={activities[0]} />
                <Activity activity={activities[0]} theme='red' />
                <Activity activity={activities[0]} theme='green' />
                <Activity activity={activities[0]} theme='blue' />
                <Activity activity={activities[0]} theme='purple' />
                <Activity activity={activities[0]} theme='yellow' />
                <Activity activity={activities[0]} theme='orange' /> */}

            </div>

        </div>
    )
}

export default Results
