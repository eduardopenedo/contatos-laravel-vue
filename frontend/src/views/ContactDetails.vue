<template>
  <div class="contact-details">
    <div class="contact-image">
      <img :src="contactStore.contact.image" alt="Contact Image" />
    </div>
    <h1 class="contact-name">{{ contactStore.contact.name }}</h1>
    <div class="contact-info">
      <p><strong>Phone:</strong> {{ contactStore.contact.phone }}</p>
      <p><strong>Email:</strong> {{ contactStore.contact.email }}</p>
    </div>
    <div class="contact-actions">
      <router-link :to="'/edit/' + contactStore.contact.id" class="edit-link">Edit</router-link>
      <router-link to="/" class="back-link">Back to List</router-link>
    </div>
  </div>
</template>

<script setup>
import { useContactStore } from '../stores/contactStore';
import { useRoute } from 'vue-router';

const contactStore = useContactStore();
const route = useRoute();
const id = route.params.id;
contactStore.fetchContact(id);
</script>

<style scoped>
.contact-details {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
  color: black
}

.contact-name {
  font-size: 2em;
  margin-bottom: 10px;
}

.contact-info {
  margin-bottom: 20px;
}

.contact-info p {
  font-size: 1.2em;
  margin: 5px 0;
}

.contact-image img {
  max-width: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px dashed green;
}

.contact-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.edit-link, .back-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.edit-link:hover, .back-link:hover {
  text-decoration: underline;
}
</style>
