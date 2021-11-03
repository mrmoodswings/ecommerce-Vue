import { createStore } from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";
const vuexPersist = new VuexPersist({
  key: "ecom-store",
  storage: window.localStorage,
});
export default createStore({
  state: {
    user: null,
    token: null,
    products: [],
    cart: [],
    orderdata: [],
    orders: [],
    shippingCharge: 25,
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    addCartItem(state, item) {
      item.quantity = 1;
      state.cart.push(item);
    },
    updateCartItem(state, updatedItem) {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.id == updatedItem.id) {
          return updatedItem;
        }
        return cartItem;
      });
    },
    removeCartItem(state, item) {
      state.cart = state.cart.filter((cartItem) => {
        return cartItem.id != item.id;
      });
    },
    setProducts(state, products) {
      state.products = products;
    },
    LogOut(state) {
      state.user = null;
      state.orderdata = [];
      state.token = null;
    },
    setOrderDetails(state, order) {
      state.orderdata = order;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {
    getProducts({ commit }) {
      axios.get("http://localhost:3000/api/products").then((response) => {
        commit("setProducts", response.data.data);
      });
    },
    getOrders({ commit }) {
      axios
        .get("http://localhost:3000/api/orders", {
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${this.state.token}`,
          },
        })
        .then((response) => {
          commit("setOrders", response.data.data);
        });
    },

    async LogOut({ commit }) {
      let user = null;
      commit("LogOut", user);
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.token
    },
  },
  plugins: [vuexPersist.plugin],
});
