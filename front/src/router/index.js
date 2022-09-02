import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import FeedView from "../views/FeedView.vue";
import ProfilView from "../views/ProfilView.vue";
import ErrorView from "../views/ErrorView.vue"

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
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: ErrorView,
    },
    {
      path: "/profil",
      name: "profil",
      component: ProfilView,
    },
    {
      path: "/profil/:id",
      name: "IdProfil",
      component: ProfilView,
    }
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('userId');
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
