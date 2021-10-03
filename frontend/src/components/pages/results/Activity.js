import React from 'react'

const Activity = ({ activity, ...props }) => {
    /*
        Test Cases:
    1)if marks==-1 and dueDate expired =>'Not submitted'
    2)if dueDate expired and marks>-1 =>'Turned in late'
    */

    const d = activity.AssignmentID.dueDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' }).split(',');
    const dueDate = d[0] + d[1].toUpperCase();
    const getActivityStatus = () => {
        const submissionDate = activity.createdAt;
        if (submissionDate >= activity.AssignmentID.dueDate) {
            if (activity.marks < 0) return 'Not submitted';
            return 'Turned in late'
        } else {
            return '';
        }
    }
    return (
        <div className={`activity-container border-${props.theme}`}>
            <div className='activity-details'>
                <div className='activity-details-head'>
                    <span className='activity-details-title'><strong>{activity.AssignmentID.title}</strong></span>
                    <span className='activity-details-status'><strong><span>{getActivityStatus()}</span></strong></span>
                </div>
                <div>{dueDate}</div>
            </div>
            <div className='activity-marks'>
                <strong>Marks:</strong>
                <strong><span className={`font-${props.theme}`}>{activity.marks < 0 ? '--' : activity.marks}</span> / {activity.AssignmentID.totalMarks}</strong>
            </div>
        </div>
    )
}

export default Activity
