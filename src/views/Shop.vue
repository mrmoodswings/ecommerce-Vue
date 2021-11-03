<template>
  <main>
    <div class="container">
      <section>
        <h4 class="text-center mt-4 mb-5">
          <strong>All Products</strong>
        </h4>

        <div class="row">
          <Product
            v-for="product in products"
            :product="product"
            :key="product.id"
          />
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import Product from "../components/Product";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  props: {
    title: String,
  },
  components: {
    Product,
  },
  setup() {
    const store = useStore();
    let products = computed(() => {
      return store.state.products;
    });
    return {
      products,
    };
  },
   mounted() {
    this.$store.dispatch("getProducts");
  }
};
</script>