import { createRouter, createWebHistory } from "vue-router";
import ListContacts from "../views/ListContacts.vue";
import CreateContact from "../views/CreateContact.vue";
import UpdateContact from "../views/UpdateContact.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: ListContacts,
      meta: { requiresAuth: true },
    },
    {
      path: "/create-contact",
      name: "create",
      component: CreateContact,
      meta: { requiresAuth: true },
    },
    {
      path: "/update-contact/:id",
      name: "update",
      component: UpdateContact,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("api-token");

  if ((to.path === "/login" || to.path === "/register") && isAuthenticated) {
    next({ path: "/" });
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
