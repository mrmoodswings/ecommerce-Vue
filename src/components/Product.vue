<template>
  <!-- Grid column -->
  <div class="col-md-4 mb-5">
    <!-- Card -->
    <div class="card">
      <div class="view zoom overlay">
        <img class="img-fluid w-100" :src="BASE_URL + product.image" alt="Sample" />
        <a href="#!">
          <div class="mask waves-effect waves-light">
            <img class="img-fluid w-100" :src="BASE_URL +product.image" />
            <div class="mask rgba-black-slight waves-effect waves-light"></div>
          </div>
        </a>
      </div>

      <div class="card-body text-center pt-4">
        <h5>{{ product.name }}</h5>
        <p class="mb-2 text-muted text-uppercase small">
          {{ product.shortdesc }}
        </p>

        <hr />
        <p>
          <span class="mr-1"
            ><strong>${{ product.price }}</strong></span
          >
        </p>

        <button
          type="button"
          @click="addToCart()"
          class="btn btn-primary btn-sm mr-1 mb-2 waves-effect waves-light"
        >
          <i class="fas fa-shopping-cart pr-2"></i
          >{{ itemAlreadyInCart ? "Added" : "Add to Cart" }}
        </button>
      </div>
    </div>
    <!-- Card -->
  </div>

  <!-- Grid column -->
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Product",
  props: ["product"],
  setup(props) {
    const store = useStore();
     const BASE_URL = `${store.state.api_url}api/uploads/`;
    let cart = computed(() => {
      return store.state.cart;
    });

    let itemAlreadyInCart = computed(() => {
      let inCart = false;
      cart.value.forEach((item) => {
        if (item.id === props.product.id) {
          inCart = true;
        }
      });
      return inCart;
    });
    function addToCart() {
      if (!itemAlreadyInCart.value) {
        store.commit("addCartItem", props.product);
      } else {
        alert("Item already added to Cart");
      }
    }

    return {
      cart,
      itemAlreadyInCart,
      addToCart,
      BASE_URL
    };
  },
};
</script>
