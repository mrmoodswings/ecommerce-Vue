<template>
  <main>
    <div class="container">
      <section class="mt-5 mb-4">
        <div class="row">
          <div class="col-lg-8 mb-4">
            <div class="card wish-list pb-1">
              <div class="card-body">
                <h5 class="mb-2">Billing details</h5>

                <div class="row">
                  <div class="col-lg-6">
                    <div class="md-form md-outline mb-0 mb-lg-4">
                      <input
                        type="text"
                        id="firstName"
                        class="form-control mb-0 mb-lg-2"
                        v-model="state.firstName"
                      />
                      <span v-if="v$.firstName.$error" style="color: red">{{
                        v$.firstName.$errors[0].$message
                      }}</span>
                      <label for="firstName">First name</label>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <!-- Last name -->
                    <div class="md-form md-outline">
                      <input
                        type="text"
                        id="lastName"
                        class="form-control"
                        v-model="state.lastName"
                      />
                      <span v-if="v$.lastName.$error" style="color: red">{{
                        v$.lastName.$errors[0].$message
                      }}</span>

                      <label for="lastName">Last name</label>
                    </div>
                  </div>
                </div>

                <div class="md-form md-outline mt-0">
                  <input
                    type="text"
                    id="form14"
                    placeholder="House number and street name"
                    class="form-control"
                    v-model="state.address"
                  />
                  <span v-if="v$.address.$error" style="color: red">{{
                    v$.address.$errors[0].$message
                  }}</span>
                  <label for="form14" class="active">Address</label>
                </div>

                <!-- Postcode / ZIP -->
                <div class="md-form md-outline">
                  <input
                    type="text"
                    id="form16"
                    class="form-control"
                    v-model="state.postalCode"
                  />
                  <span v-if="v$.postalCode.$error" style="color: red">{{
                    v$.postalCode.$errors[0].$message
                  }}</span>
                  <label for="form16">Postcode / ZIP</label>
                </div>

                <!-- Town / City -->
                <div class="md-form md-outline">
                  <input
                    type="text"
                    id="form17"
                    class="form-control"
                    v-model="state.town"
                  />
                  <span v-if="v$.town.$error" style="color: red">{{
                    v$.town.$errors[0].$message
                  }}</span>
                  <label for="form17">Town / City</label>
                </div>

                <!-- Phone -->
                <div class="md-form md-outline">
                  <input
                    type="number"
                    id="form18"
                    class="form-control"
                    v-model="state.phone"
                  />
                  <span v-if="v$.phone.$error" style="color: red">{{
                    v$.phone.$errors[0].$message
                  }}</span>
                  <label for="form18">Phone</label>
                </div>

                <!-- Email address -->
                <div class="md-form md-outline">
                  <input
                    type="email"
                    id="form19"
                    class="form-control"
                    v-model="state.email"
                  />
                  <span v-if="v$.email.$error" style="color: red">{{
                    v$.email.$errors[0].$message
                  }}</span>
                  <label for="form19">Email address</label>
                </div>
              </div>
            </div>
          </div>

          <CartTotal
            :total="totalPrice"
            :shipping="shippingCharge"
            title="Place Order"
            page="checkout"
            @place-order="placeOrder"
          />
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import CartTotal from "../components/CartTotal";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "Checkout",
  components: {
    CartTotal,
  },
  setup() {
    const state = reactive({
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      town: "",
      phone: "",
      email: "",
    });
    const rules = computed(() => {
      return {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        address: {
          required,
        },
        postalCode: {
          required,
        },
        town: {
          required,
        },
        phone: {
          required,
        },
        email: {
          required,
          email,
        },
      };
    });
    const v$ = useVuelidate(rules, state);
    const store = useStore();

    let cart = computed(function () {
      return store.state.cart;
    });

    let shippingCharge = computed(function () {
      return store.state.shippingCharge;
    });

    let totalPrice = computed(function () {
      return cart.value.reduce((total, next) => {
        return total + next.quantity * next.price;
      }, 0);
    });

    return {
      state,
      v$,
      shippingCharge,
      totalPrice,
    };
  },
  methods: {
    async placeOrder() {
      this.v$.$validate();

      if (!this.v$.$error) {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
          body: JSON.stringify({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            town: this.state.town,
            phone: this.state.phone,
            postalCode: this.state.postalCode,
            email: this.state.email,
            customer_id: this.$store.state.user.id,
            order_details: this.$store.state.cart,
            grand_total: this.totalPrice + this.shippingCharge,
            shipping_rate: this.shippingCharge,
          }),
        });

        const data = await res.json();

        if (data.status) {
          alert("Order Placed Successfully");
          this.firstName = "";
          this.lastName = "";
          this.town = "";
          this.phone = "";
          this.postalCode = "";
          this.email = "";
          this.address = "";
          this.$store.commit("setOrderDetails", data.data);
          this.$store.commit("clearCart");
          this.$router.push("/order-summary");
        } else {
          alert("user registration failed");
        }
      }
    },
  },
};
</script>