//imports
import Home from "../components/pages/home/Home";
import Assignment from "../components/pages/Assignment/Assignment";

const publicRoutes = [
  {
    component: Home,
    path: "/",
  },
  {
    component: Assignment,
    path: "/Assignment",
  },
];
export default publicRoutes;
