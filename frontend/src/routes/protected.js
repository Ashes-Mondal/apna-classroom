import Assignment from '../components/pages/Assignment/Assignment'
import Results from '../components/pages/results/Results'
import Upload from '../components/common/file-upload/Upload'
import Classroom from '../components/pages/classroom/Classroom'
import Home from '../components/pages/home/Home'

const protectedRoutes =  [
    {
        component: Home,
        path: '/',
    },
    {
        component: Assignment,
        path: '/class/:classroomID/asg/:assignmentID',
    },
    {
        component: Results,
        path: '/class/:classroomID/results/',
    },
    {
        component: Upload,
        path: '/upload',
    },
    {
        component: Classroom,
        path: '/class/:classroomID',
    },
];
export default protectedRoutes;