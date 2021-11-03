<template>
  <header>
    <!-- Navbar -->
    <nav
      class="
        navbar navbar-expand-md navbar-light
        fixed-top
        scrolling-navbar
        navbar-transparent
      "
    >
      <div class="container-fluid">
        <!-- Collapse button -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="basicExampleNav">
          <!-- Right -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link waves-effect" to="/">
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link waves-effect" to="/shop">
                Shop
              </router-link>
            </li>
            <li class="nav-item" v-show="isLoggedIn">
              <router-link class="nav-link waves-effect" to="/orders">
                Orders
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link navbar-link-2 waves-effect"
                to="/cart"
              >
                <span class="badge badge-pill red">{{ cart.length }}</span>
                <i class="fas fa-shopping-cart pl-0"></i>
              </router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink-55"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                  class="rounded-circle"
                  style="height: 34px"
                  alt="avatar image"
                />
              </a>
              <div
                class="dropdown-menu dropdown-menu-lg-right"
                aria-labelledby="navbarDropdownMenuLink-55"
              >
                <a class="dropdown-item" @click="logout" href="#!">Logout</a>
              </div>
            </li>

            <li v-else class="nav-item">
              <router-link class="nav-link waves-effect" to="/login">
                Login
              </router-link>
            </li>
          </ul>
        </div>
        <!-- Links -->
      </div>
    </nav>
    <!-- Navbar -->

    <div
      class="jumbotron jumbotron-image color-grey-light"
      style="
        background-image: url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80');
        height: 200px;
      "
    >
      <div class="mask rgba-black-strong d-flex align-items-center h-100">
        <div class="container text-center white-text py-5">
          <h1 class="mb-0"></h1>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Header",
  setup() {
    const store = useStore();
    let cart = computed(() => {
      return store.state.cart;
    });
    function isLoginPage() {
      if (this.$route.path === "/login") {
        return true;
      } else {
        return false;
      }
    }
    return {
      cart,
      isLoggedIn: computed(() => store.getters.isLoggedIn),
      isLoginPage,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
};
</script>