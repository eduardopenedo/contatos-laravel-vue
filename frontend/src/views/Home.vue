<template>
  <div>
    <h2>Home</h2>
    <p>Welcome, {{ user.name }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser;
    }
  }
};
</script>
