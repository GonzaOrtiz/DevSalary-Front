import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Technologies from "../views/Technologies.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
