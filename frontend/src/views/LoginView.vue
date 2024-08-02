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

  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore'; // Importar a store de autenticação
import { useRouter } from 'vue-router';

export default {
  setup() {
    let email = ref('');
    let password = ref('');
    const authStore = useAuthStore();
    let rs = useRouter()

    const handleLogin = () => {
      // Aqui você deve adicionar a lógica para autenticar o usuário.
      // Este é um exemplo fictício; substitua com sua lógica real de autenticação.
      
      authStore.authenticate(email.value, password.value).then(
        function(){
          if (authStore.auth) {
            rs.push('/'); // Redirecionar para uma página protegida após login
          } else {
            alert('Credenciais inválidas');
          }
        }

      );
  
    };

    return { email, password, handleLogin };
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
