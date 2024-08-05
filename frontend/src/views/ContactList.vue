<script setup>
import { useContactStore } from '../stores/contactStore';
import { onMounted } from 'vue';
import { ref } from 'vue';

const contactStore = useContactStore();
let contacts = ref(null);

onMounted(async () => {
  await contactStore.fetchContacts().then(resolve => contacts.value=contactStore.contacts);
});
</script>

<template>
  <div class="contact-list-container">
    <h1>Contact List</h1>
    <router-link class="add-contact" to="/add">Add Contact</router-link>
    <ul class="contact-list">
      <li v-if="contacts==null" >
        <center>
          Carregando...
        </center>
      </li>
      <li v-if="contacts!=null && contacts.length==0" >
        <center>
          Nenhum Contato...
        </center>
      </li>
        <li v-for="contact in contactStore.contacts" :key="contact.id" class="contact-item">
        <template v-if="contact.image!=null" >
              <img :src="contact.image" 
              alt="Contact Photo" 
              class="contact-photo" />
        </template>

        <div class="contact-info">
          <router-link :to="'/contact/' + contact.id" class="contact-name">{{ contact.name }}</router-link>
          <button @click="contactStore.deleteContact(contact.id)" class="delete-button">Delete</button>
        
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.contact-list-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: black;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.add-contact {
  display: block;
  margin: 10px auto;
  padding: 10px 15px;
  text-align: center;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-contact:hover {
  background-color: #0056b3;
}

.contact-list {
  list-style-type: none;
  padding: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.contact-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.contact-info {
  flex-grow: 1;
}

.contact-name {
  font-size: 18px;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-name:hover {
  color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>