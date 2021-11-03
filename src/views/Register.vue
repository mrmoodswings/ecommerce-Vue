<template>
  <div class="container">
    <!--Grid row-->
    <div class="row d-flex justify-content-center">
      <!--Grid column-->
      <div class="col-md-6">
        <!--Section: Content-->
        <section class="mt-4 mb-5">
          <div v-if="success" class="alert alert-success" role="alert">
            User Register Successfully
          </div>
          <form @submit="register">
            <div class="md-form md-outline mt-0">
              <input
                type="text"
                id="defaultForm-email2"
                v-model="state.username"
                class="form-control"
              />
              <span v-if="v$.username.$error" style="color: red">{{
                v$.username.$errors[0].$message
              }}</span>
              <label
                data-error="wrong"
                data-success="right"
                for="defaultForm-email2"
                >Username</label
              >
            </div>
            <div class="md-form md-outline mt-0">
              <input
                type="email"
                id="defaultForm-email2"
                class="form-control"
                v-model="state.email"
              />
              <span v-if="v$.email.$error" style="color: red">{{
                v$.email.$errors[0].$message
              }}</span>
              <label
                data-error="wrong"
                data-success="right"
                for="defaultForm-email2"
                >Your email</label
              >
            </div>
            <div class="md-form md-outline mt-0">
              <input
                type="password"
                id="defaultForm-pass2"
                v-model="state.password"
                class="form-control"
              />
              <span v-if="v$.password.$error" style="color: red">{{
                v$.password.$errors[0].$message
              }}</span>
             
              <label
                data-error="wrong"
                data-success="right"
                for="defaultForm-pass2"
                >Your password</label
              >
            </div>

            <div class="md-form md-outline">
              <input
                type="number"
                id="materialRegisterFormPhone"
                class="form-control"
                v-model="state.phone"
                aria-describedby="materialRegisterFormPhoneHelpBlock"
              />
              <span v-if="v$.phone.$error" style="color: red">{{
                v$.phone.$errors[0].$message
              }}</span>
              <label for="materialRegisterFormPhone">Phone number</label>
              <small
                id="materialRegisterFormPhoneHelpBlock"
                class="form-text text-muted mb-3"
              >
              </small>
            </div>

            <div class="text-center mb-2">
              <button
                type="submit"
                class="btn btn-primary mb-4 waves-effect waves-light"
              >
                Sign Up
              </button>
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
import { computed, reactive } from "vue";
import { required } from "@vuelidate/validators";
export default {
  name: "Register",
  components: {},
  setup() {
    const errors = [];
    const state = reactive({
      username: "",
      email: "",
      phone: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        username: {
          required,
        },
        email: {
          required,
        },
        phone: {
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
      errors,
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();
      this.v$.$validate();
      if (!this.v$.$error) {
        const res = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            mobile: this.state.phone,
          }),
        });

        const data = await res.json();
      
        if (data.status) {
          alert('register succesfull')
          this.username = '';
          this.password='';
          this.phone='';
          this.email='';
          this.$router.push("/login");
        }else{
          alert('user registration failed')
    
        }
      }
    },
  },
};
</script>