import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import FeedView from "../views/FeedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "intranet",
      redirect: "signup"
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/feed",
      name: "feed",
      component: FeedView,
    }
    /*{
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    }*/,
  ],
});

export default router;
