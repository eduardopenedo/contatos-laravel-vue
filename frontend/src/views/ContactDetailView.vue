<template>
  <div v-if="contact">
    <h2>{{ contact.name }}</h2>
    <p>Phone: {{ contact.phone }}</p>
    <p>Email: {{ contact.email }}</p>
    <img :src="contact.image" alt="Contact Image" v-if="contact.image"/>
    <router-link :to="'/contacts/' + contact.id + '/edit'">Edit Contact</router-link>
  </div>
</template>

<script>
export default {
  props: ['contactId'],
  computed: {
    contact() {
      return this.$store.state.contacts.find(contact => contact.id == this.contactId);
    }
  },
  created() {
    if (!this.contact) {
      this.$store.dispatch('fetchContact', this.contactId);
    }
  }
};
</script>
