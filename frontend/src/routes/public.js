//imports
import Home from "../components/pages/home/Home"
import Results from "../components/pages/results/Results";

const publicRoutes =  [
    {
        component:Home,
        path:'/'
    },
    {
        component:Results,
        path:'/results/:subject',
    },
];
export default publicRoutes;