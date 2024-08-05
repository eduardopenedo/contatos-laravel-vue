<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Digite seu email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Entrar</button>
    </form>
    <span style="color:red">
      {{errors['message']}}
    </span>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore'; // Importar a store de autenticação
import { useRouter } from 'vue-router';
import ErrorComponent from '@/components/Forms/ErrorComponent.vue';

export default {
  components:{
    ErrorComponent
  },
  setup() {
    let email = ref('');
    let password = ref('');
    let errors = ref({});

    const authStore = useAuthStore();
    let rs = useRouter()

    const handleLogin = async () => {
      let response;
      try{
        response = await authStore.authenticate(email.value, password.value)
        rs.push('/'); // Redirecionar para uma página protegida após login
      } catch(e){
        alert('Credenciais inválidas');
      }
      errors.value = response.response.data
      
      
    }

    return { email, password, handleLogin, errors };
  },
};
</script>

<style scoped>
.login-container {
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
