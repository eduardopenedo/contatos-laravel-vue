<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Nome:</label>
        <input
          type="text"
          id="name"
          v-model="pessoa.name"
          placeholder="Nome"
          required
        />
        <ErrorComponent :error="errors['name']"></ErrorComponent>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="pessoa.email"
          placeholder="Digite seu email"
          required
        />
        <ErrorComponent :error="errors['email']"></ErrorComponent>
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="pessoa.password"
          placeholder="Digite sua senha"
          required
        />
        <ErrorComponent :error="errors['password']"></ErrorComponent>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore'; // Importar a store de autenticação
import { useRouter } from 'vue-router';
import ErrorComponent from '@/components/Forms/ErrorComponent.vue';

export default {
  components : {
    ErrorComponent
  },
  setup() {
    let pessoa = ref({});
    let errors = ref(
      {}
    );

    const authStore = useAuthStore();
    let rs = useRouter()

    const handleRegister = async () => {
      
      errors.value = {}
      try{
        authStore.register(pessoa.value).then(data => errors.value=data)
      } catch (e){
        this.errors.push(e.message)
        return;
      }
      try{
        await authStore.authenticate(pessoa.value.email, pessoa.value.password)
        rs.push('/')
      } catch(e){
        console.log(e)
      }
    };

    return {errors, pessoa, handleRegister };
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
