//imports
import Home from '../components/pages/home/Home'
import Classroom from '../components/pages/classroom/Classroom'

const publicRoutes = [
    {
        component: Home,
        path: '/',
    },
    {
        component: Classroom,
        path: '/testcls',
    },
]
export default publicRoutes
