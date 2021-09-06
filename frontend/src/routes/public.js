//imports
import Home from "../components/pages/home/Home"
import Login from "../components/pages/login/Login";

const publicRoutes =  [
    {
        component:Home,
        path:'/home'
    },
    {
        component:Login,
        path:'/'
    }
];
export default publicRoutes;