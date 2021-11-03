//store/modules/auth.js

import axios from 'axios';
const state = {
    products: [
        {
          id: 1,
          name: "Chelsea Shoes",
          price: 200,
          shortdesc: "Best Drip in the Market",
          url: "images/chelsea-shoes.png",
        },
        {
          id: 2,
          name: "Kimono",
          price: 50,
          shortdesc: "Classy, Stylish, Dope",
          url: "images/kimono.png",
        },
        {
          id: 3,
          name: "Watch",
          price: 2500,
          shortdesc: "Elegance built in",
          url: "images/rolex.png",
        },
        {
          id: 4,
          name: "Wallet",
          price: 80,
          shortdesc: "Sleek, Trendy, Clean",
          url: "images/wallet.png",
        },
        {
          id: 5,
          name: "Lady Handbags",
          price: 230,
          shortdesc: "Fabulous, Exotic, Classy",
          url: "images/handbag.png",
        },
        {
          id: 6,
          name: "Casual Shirts",
          price: 30,
          shortdesc: "Neat, Sleek, Smart",
          url: "images/shirt.png",
        },
      ],
      cart: [],
      shippingCharge: 25,
};
const getters = {
    isAuthenticated: state => !!state.user, 
    StateUser: state => state.user,
};
const actions = {
    async Register({dispatch}, form) {
        await axios.post('register', form)
        let UserForm = new FormData()
        UserForm.append('username', form.username)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
      },
      async LogIn({commit}, User) {
        await axios.post('login', User)
        await commit('setUser', User.get('username'))
      },
      async LogOut({commit}){
        let user = null
        commit('logout', user)
      }
      
};
const mutations = {
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
};
export default {
  state,
  getters,
  actions,
  mutations
};
