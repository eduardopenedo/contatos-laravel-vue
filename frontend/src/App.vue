<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const router = useRouter();

const logout = ()=>{
      authStore.logout()
      router.push('/login')
    }
</script>

<template>
  <div class="container">

    <nav>
      {{ authStore.token }}
      <template v-if="!authStore.auth">
        <RouterLink to="/login">login</RouterLink>
        <RouterLink to="/register">register</RouterLink>
      </template>
  
      <template v-if="authStore.auth">
        <h5>{{ authStore.user.name }}</h5>
        <button @click="logout">logout</button>
      </template>
    </nav>
    <RouterView />
  </div>
  
</template>


<style scoped>



.container{
display: flex;
flex-direction: column;
height: 100vh;
}


header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


</style>
