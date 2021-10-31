<template>
  <main>
    <div class="container">
      <section class="mt-5 mb-4">
        <h4 class="text-center mt-4 mb-5">
          <strong>Cart</strong>
        </h4>
        <!--Grid row-->
        <div class="row">
          <div class="col-lg-8">
            <!-- Card -->
            <div class="card wish-list mb-4">
              <div class="card-body">
                <h5 class="mb-4">Cart (<span>2</span> items)</h5>

                <CartItem v-for="item in cart" :product="item" :key="item.id" />
                <hr class="mb-4" />
              </div>
            </div>
          </div>
          <CartTotal />
        </div>
        <!--Grid row-->
      </section>
    </div>
  </main>
</template>
<script>
import CartTotal from "../components/CartTotal";
import CartItem from "../components/CartItem";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Cart",
  components: {
    CartItem,
    CartTotal,
  },
  setup() {
    const store = useStore();

    let cart = computed(function () {
      return store.state.cart;
    });

    let totalPrice = computed(function () {
      return cart.value.reduce((total, next) => {
        return total + next.quantity * next.price;
      }, 0);
    });

    return {
      cart,
      totalPrice,
    };
  },
};
</script>
