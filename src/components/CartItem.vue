<template>
  <div class="row mb-4">
    <div class="col-md-5 col-lg-3 col-xl-3">
      <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
        <img class="img-fluid w-100" :src="product.url" alt="Sample" />
        <a href="#!">
          <div class="mask waves-effect waves-light">
            <img class="img-fluid w-100" :src="product.url" />
            <div class="mask rgba-black-slight waves-effect waves-light"></div>
          </div>
        </a>
      </div>
    </div>
    <div class="col-md-7 col-lg-9 col-xl-9">
      <div>
        <div class="d-flex justify-content-between">
          <div>
            <h5>{{ product.name }}</h5>
          </div>
          <div>
            <div class="def-number-input number-input safari_only mb-0 w-100">
              <button
                @click="changeQuantity('decrease')"
                class="minus"
              ></button>
              <input
                class="quantity"
                min="1"
                name="quantity"
                v-model="itemQuantity"
                type="number"
              />
              <button @click="changeQuantity()" class="plus"></button>
            </div>
            <small
              id="passwordHelpBlock"
              class="form-text text-muted text-center"
            >
            </small>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <a
              href="#!"
              type="button"
              class="card-link-secondary small text-uppercase mr-3"
              ><i class="fas fa-trash-alt mr-1"></i> Remove item
            </a>
          </div>
          <p class="mb-0">
            <span
              ><strong>${{ product.price }}</strong></span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "CartItem",
  props: ["product"],
  components: {},
  setup(props) {
    const store = useStore();
    let cart = computed(function () {
      return store.state.cart;
    });

    let itemQuantity = computed(function () {
      let get_product = cart.value.filter(
        (item) => item.id == props.product.id
      );

      return get_product[0].quantity;
    });

    function changeQuantity(action = "add") {
      if (action == "add") {
        if (props.product.quantity)
          props.product.quantity = props.product.quantity + 1;
        console.log(props.product);
        store.commit("updateCartItem", props.product);
      } else {
        if (props.product.quantity > 1) {
          // props.product.quantity = props.product.quantity - 1;
          store.commit("updateCartItem", props.product);
        } else {
          //Remove the item
          store.commit("removeCartItem", props.product);
        }
      }
    }

    function removeItem() {
      store.commit("removeCartItem", props.product);
    }

    return {
      cart,
      itemQuantity,
      changeQuantity,
      removeItem,
    };
  },
};
</script>