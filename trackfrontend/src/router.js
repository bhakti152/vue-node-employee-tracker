import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/teams",
      name: "teams",
      component: () => import("./components/TeamsList")
    },
    {
      path: "/teams/:id",
      name: "team-details",
      component: () => import("./components/Team")
    },
     {
      path: "/employeeAdd/:id",
      name: "add-employee",
      component: () => import("./components/AddEmployee")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTeam")
    }
  ]
});
