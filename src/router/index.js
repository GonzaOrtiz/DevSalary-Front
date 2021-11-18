import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Technologies from "../views/Technologies.vue";
import Rates from "../views/Rates.vue";
import Calculator from "../views/Calculator.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/Technologies",
    name: "Technologies",
    component: Technologies,
  },
  {
    path: "/Rates",
    name: "Rates",
    component: Rates,
  },
  {
    path: "/Calculator",
    name: "Calculator",
    component: Calculator,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
