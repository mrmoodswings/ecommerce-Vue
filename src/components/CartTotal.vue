<template>
  <div class="col-lg-4">
    <!-- Card -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="mb-3">The total amount of</h5>

        <ul class="list-group list-group-flush">
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
            Sub Total
            <span>${{ total }}</span>
          </li>
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
            Shipping Charge
            <span>${{ shipping }}</span>
          </li>

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
            </div>
            <span
              ><strong>${{ total + shipping }}</strong></span
            >
          </li>
        </ul>
        
        <router-link v-if="checkoutPage()" tag="button"  class="btn btn-primary btn-block waves-effect waves-light" to="/checkout" >{{title}}</router-link>
          <button v-else @click="$emit('place-order')" type="button" class="btn btn-primary btn-block waves-effect waves-light">Make purchase</button>
     
      </div>
    </div>
    <!-- Card -->

    <!-- Card -->

    <!-- Card -->
  </div>
</template>
<script>
export default {
  name: "CartTotal",
  props: {
    total: Number,
    shipping: Number,
    title:String,
    page:String
  },
  components: {},
  setup(props) {
    const prop = {...props};
    function checkoutPage() {
      if(prop.page==='cart'){
        return true
      }else{
        return false
      }
    }
    return {
      checkoutPage,
    };
  },
};
</script>
