<template>
  <form @submit.prevent="saveContact">
    <input v-model="contact.name" placeholder="Name" />
    <input v-model="contact.phone" placeholder="Phone" />
    <input v-model="contact.email" placeholder="Email" />
    <input type="file" @change="onFileChange" />
    <button type="submit">Save</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        name: '',
        phone: '',
        email: '',
        image: ''
      }
    };
  },
  methods: {
    saveContact() {
      // Dispatch action to save contact
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.contact.image = URL.createObjectURL(file);
    }
  }
};
</script>
