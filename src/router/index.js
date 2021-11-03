import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Shop from "../views/Shop";
import Cart from "../views/Cart";
import Register from "../views/Register";
import Login from "../views/Login";
import Checkout from "../views/Checkout";
import Orders from "../views/Orders";
import OrderSuccess from "../views/OrderSuccess";
import store from '../store';
// import { useToast } from "vue-toastification";
// const toast = useToast();
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
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/order-summary",
    name: "OrderSuccess",
    component: OrderSuccess,
    meta: {
      requiresAuth: true,
    }
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
router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.token) {
          next();
      } else {
          next('/login');
      }
  } else {
      next();
  }
});

export default router;
