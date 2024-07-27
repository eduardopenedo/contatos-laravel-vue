<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        await this.login(credentials);
        // Redirecionar ou fazer algo após o login
        this.$router.push('/home');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
