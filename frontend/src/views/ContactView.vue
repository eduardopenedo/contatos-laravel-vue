<template>
  <div>
    <h1>Contacts</h1>
    <ContactList />
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
import ContactList from '../components/ContactList.vue';

export default {
  name: 'ContactView',
  components: {
    ContactList
  }
};
</script>
