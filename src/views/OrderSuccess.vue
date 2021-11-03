<template>
  <main>
    <div class="container">
      <section class="mt-5 mb-4">
        <!--Grid row-->
        <div class="row">
          <!--Grid column-->
          <div class="col-lg-12">
            <!-- Card -->
            <div class="card mb-4">
              <div class="card-body">
           
                <h5>Order Summary</h5>
                <ul v-for="order in orderinfo.order_details" :key="order.id" class="list-group list-group-flush">
                  <li
                    class="
                      list-group-item
                      d-flex
                      justify-content-between
                      align-items-center
                      border-0
                      px-0
                      pb-0
                    "
                  >
                    {{order.name}} * {{order.quantity}}
                    <span>${{order.price * order.quantity}}</span>
                  </li>
                
                </ul>
                <ul class="list-group list-group-flush">
                  <li
                    class="
                      list-group-item
                      d-flex
                      justify-content-between
                      align-items-center
                      border-0
                      px-0
                      mb-3
                    "
                  >
                    <div>
                      <strong>Total</strong>
                      <strong>
                        <p class="mb-0">(including Shipping)</p>
                      </strong>
                    </div>
                    <span><strong>${{orderinfo.grand_total}}</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--Grid column-->
          <div class="col=4"></div>
          <div class="col-4">
            <router-link
              class="btn btn-primary btn-block waves-effect waves-light"
              to="/shop"
              tag="button"
              >Go to Shop</router-link
            >
          </div>
        </div>
        <!--Grid row-->
      </section>
    </div>
  </main>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "OrderSuccess",
  components: {},
  setup() {
    const store = useStore();
    let orderinfo = computed(() => {
      return store.state.orderdata;
    });

    return {
      orderinfo,
    };
  },
};
</script>
