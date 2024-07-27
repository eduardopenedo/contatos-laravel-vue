<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label>Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['register']),
    async register() {
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        await this.register(userData);
        // Redirecionar ou fazer algo após o registro
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
