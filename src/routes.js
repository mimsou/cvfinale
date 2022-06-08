import AdminIndex from "views/admin-pages/Index.js"; 
import Login from "views/auth-pages/Login.js";
import Register from "views/auth-pages/Register";
import Landing from "./views/public-pages/Landing";
import UserInformaion from "views/front-pages/UserInformaion.js";
import Publishing from "views/front-pages/Publishing";
import Templating from "views/front-pages/Templating";

var routes = [
  {
    path: "/dashboard",
    name: "Administration",
    icon: "ni ni-tv-2 text-primary",
    component: AdminIndex,
    layout: "/admin",
  },
  {
    path: "/template",
    name: "Template et theme",
    icon: "ni ni-tv-2 text-primary",
    component: Templating,
    layout: "/app",
  }, 
  {
    path: "/publication",
    name: "Publication",
    icon: "ni ni-tv-2 text-primary",
    component: Publishing,
    layout: "/app",
  }, 
  {
    path: "/user-information",
    name: "Information",
    icon: "ni ni-tv-2 text-primary",
    component: UserInformaion,
    layout: "/app",
  },  {
    path: "/index",
    name: "Accueil",
    icon: "ni ni-tv-2 text-primary",
    component: AdminIndex,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/registration",
    name: "registration",
    icon: "ni ni-key-25 text-info",
    component: Register,
    layout: "/auth",
  },

  {
    path: "/landing",
    name: "landing",
    icon: "ni ni-key-25 text-info",
    component: Landing,
    layout: "/cv",
  },
  
];
export default routes;
