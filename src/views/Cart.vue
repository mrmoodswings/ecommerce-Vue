<template>
  <main>
    <div class="container">
      <section class="mt-5 mb-4">
        <h4 class="text-center mt-4 mb-5">
          <strong>Cart</strong>
        </h4>
        <!--Grid row-->
        <div class="row">
          <div :class="[cart.length>0?'col-lg-8':'col-lg-12']">
            <!-- Card -->
            <div class="card wish-list mb-4">
              <div class="card-body">
                <h4 class="text-center" v-show="isCartEmpty()">
                  Cart is empty!!
                </h4>
                <h5 v-if="cart.length >0" class="mb-4">
                  Cart (<span>{{ cart.length }}</span> items)
                </h5>

                <CartItem v-for="item in cart" :product="item" :key="item.id" />
                <hr class="mb-4" />
              </div>
            </div>
          </div>
          <CartTotal v-if="cart.length > 0" :total="totalPrice" :shipping="shippingCharge" title="Checkout" page="cart" />
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
    function isCartEmpty() {
      if (cart.value.length > 0) {
        return false;
      } else {
        return true;
      }
    }
    function isCartNotEmpty() {
      if (cart.value.length > 0) {
        return false;
      } else {
        return true;
      }
    }
    let shippingCharge = computed(function () {
      return store.state.shippingCharge;
    });

    let totalPrice = computed(function () {
      return cart.value.reduce((total, next) => {
        return total + next.quantity * next.price;
      }, 0);
    });

    return {
      cart,
      totalPrice,
      shippingCharge,
      isCartEmpty,
      isCartNotEmpty,
    };
  },
};
</script>
