import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/main";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: true },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth" },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "auth" },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "categories" */ "../views/Categories.vue"),
  },
  {
    path: "/detail-record",
    name: "detail-record",
    meta: { layout: "main", auth: true },
    component: () =>
      import(
        /* webpackChunkName: "detail-record" */ "../views/DetailRecord.vue"
      ),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "history" */ "../views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "planning" */ "../views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "record" */ "../views/Record.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const isRequireAuth = to.matched.some((record) => record.meta.auth);
  if (isRequireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
