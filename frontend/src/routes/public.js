//imports
import Home from "../components/pages/home/Home";
import Assignment from "../components/pages/Assignment/Assignment";
import Results from "../components/pages/results/Results";
import Upload from "../components/common/file-upload/Upload";

const publicRoutes = [
  {
    component: Home,
    path: "/",
  },
  {
    component: Assignment,
    path: "/Assignment",
  },
  {
    component: Results,
    path: '/results/:subject',
  },
  {
    component: Upload,
    path: '/upload',
  },
];
export default publicRoutes;
