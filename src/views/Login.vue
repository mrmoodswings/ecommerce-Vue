<template>
  <div class="container">
    <!--Grid row-->
    <div class="row d-flex justify-content-center">
      <!--Grid column-->
      <div class="col-md-6">
        <!--Section: Content-->
        <section class="mb-5">
          <form @submit="login">
            <div class="md-form md-outline">
              <input
                type="text"
                id="defaultForm-email1"
                class="form-control"
                v-model="state.username"
              />
              <span v-if="v$.username.$error" style="color: red">{{
                v$.username.$errors[0].$message
              }}</span>
              <label
                data-error="wrong"
                data-success="right"
                for="defaultForm-email1"
                >Username</label
              >
            </div>
            <div class="md-form md-outline">
              <input
                type="password"
                id="defaultForm-pass1"
                class="form-control"
                v-model="state.password"
              />
              <span v-if="v$.password.$error" style="color: red">{{
                v$.password.$errors[0].$message
              }}</span>
              <label
                data-error="wrong"
                data-success="right"
                for="defaultForm-pass1"
                >Your password</label
              >
            </div>

            <div class="text-center pb-2">
              <button
                type="submit"
                class="btn btn-primary mb-4 waves-effect waves-light"
              >
                Sign in
              </button>

              <p>
                Not a member? <router-link to="/register">Register</router-link>
              </p>
            </div>
          </form>
        </section>
        <!--Section: Content-->
      </div>
      <!--Grid column-->
    </div>
    <!--Grid row-->
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { mapMutations } from "vuex";
import { computed, reactive } from "vue";
import { required } from "@vuelidate/validators";
export default {
  name: "Login",
  components: {},
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        username: {
          required,
        },
        password: {
          required,
        },
      };
    });
    const v$ = useVuelidate(rules, state);
    return {
      state,
      v$,
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login(e) {
      e.preventDefault();
      this.v$.$validate();
      if (!this.v$.$error) {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
        });
        const { user, token } = await res.json();
        this.setUser(user);
        this.setToken(token);
        this.$router.push("/");
      }
    },
  },
};
</script>