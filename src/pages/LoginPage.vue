<template>
  <q-page
    class="flex flex-center"
    padding
  >
    <div
      class="full-width"
      style="max-width: 300px"
    >
      <h5 class="q-my-md text-center">IFS Companion</h5>
      <q-card>
        <q-card-section>
          <q-form>
            <q-input
              filled
              label="email"
              placeholder="email@example.com"
              class="q-mb-sm"
              v-model="usernameInput"
            ></q-input>
            <q-input
              filled
              label="password"
              type="password"
              class="q-mb-sm"
              v-model="passwordInput"
            ></q-input>
            <q-checkbox
              @click="toggleRememberMe"
              label="remember me"
              v-model="rememberMe"
            ></q-checkbox>
            <q-btn
              @click="toAppPage"
              label="login"
              class="full-width"
              color="primary"
            ></q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      usernameInput: "",
      passwordInput: "",
      rememberMe: false,
    };
  },
  methods: {
    toggleRememberMe() {
      this.rememberMe ? !this.rememberMe : this.rememberMe;
    },
    toAppPage() {
      this.$router.push({ path: "/" });
    },
  },
  // name: 'PageName',
};
</script>
