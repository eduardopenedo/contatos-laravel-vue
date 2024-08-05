
<template>
  <div class="contact-details">
    <h1>{{ isEdit ? 'Edit Contact' : 'Add Contact' }}</h1>
    <form class="form-contato" @submit.prevent="handleSubmit">
  
      <div v-if="form.image" class="contact-image">
        <img  :src="form.image" alt="Contact Image" class="contact-image">
      </div>
      <div class="campo-contato">
        <label>Name</label>
        <input v-model="form.name" required />
      </div>
      <div class="campo-contato">
        <label>Phone</label>
        <input v-model="form.phone" required />
      </div>
      <div class="campo-contato">
        <label>Email</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div class="campo-contato">
        <label>Image</label>
        <input type="file" @change="handleImageUpload" />
      </div>
      <button type="submit">{{ isEdit ? 'Update' : 'Add' }}</button>
    </form>
  <li v-for="error in errors" v-bind:key="error">
    {{ error }}
  </li>

  </div>
</template>

<script >
import { useContactStore } from '../stores/contactStore';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const form = ref({
      name: '',
      phone: '',
      email: '',
      image: '',
    });
    const errors = ref([])
    const isEdit = ref(false);
    
    const route = useRoute();
    const router = useRouter();
    const contactStore = useContactStore();

    const handleSubmit = async () => {
      let contact = {...form.value};
      contact.image = form.value.image.split(",")[1];
      
     
        if (isEdit.value) {
          await contactStore.updateContact({ ...contact, id: route.params.id }).then(
            function(){
              errors.value = contactStore.errors
            }
          );
        } else {

          await contactStore.addContact(contact).then(
          function(){
              errors.value = contactStore.errors;
              router.push('/')
              return
            });
        }
        
      
    };

    const handleImageUpload = event => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        form.value.image =  e.target.result; // Obter a string Base64 da imagem
      };
      reader.readAsDataURL(file);
    };

    onMounted(async () => {
      if (route.params.id) {
        await contactStore.fetchContact(route.params.id).then(
          function(){
            if (contactStore.contact) {
              form.value = { ...contactStore.contact };
              isEdit.value = true;
            }
          },
          function(error){
            console.error('Failed to fetch contact:', error);
          }
        );
      }
    });

    return {
      form,
      isEdit,
      errors,
      handleSubmit,
      handleImageUpload,
    };
  }
};
</script>
<style scoped>
.contact-details {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: black;
  font-size: large;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.contact-image img {
  max-width: 150px;
  border-radius: 50%;
  border: 4px solid #4CAF50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin: 1rem;
}

input,input[type="email"]{
  width: 400px;
  border: 1px solid;
  border-radius: 5px;
  height: 3rem;
  padding: 1rem
}

button:hover {
  background-color: #45a049;
  
}

.campo-contato{
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: .5rem;
}
.form-contato{
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}
</style>