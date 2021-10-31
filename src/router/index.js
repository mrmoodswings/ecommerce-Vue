import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Shop from "../views/Shop";
import Cart from "../views/Cart";
import Register from "../views/Register";
import Login from "../views/Login";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
