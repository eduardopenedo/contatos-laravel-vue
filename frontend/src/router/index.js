import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '@/views/ContactList.vue'
import ContactDetails from '@/views/ContactDetails.vue'
import ContactForm from '@/views/ContactForm.vue'
import { useAuthStore } from '@/stores/authStore'

import LoginView from '@/views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/', 
      name: 'ContactList', 
      component: ContactList, 
      meta: { requiresAuth: true } 
    },
    { 
      path: '/contact/:id', 
      name: 'ContactDetails', 
      component: ContactDetails , 
      meta: { requiresAuth: true }},
    { path: '/add', 
      name: 'AddContact', 
      component: ContactForm,
      meta: { requiresAuth: true } },
    { path: '/edit/:id',
      name: 'EditContact', 
      component: ContactForm, 
      meta: { requiresAuth: true } },
      {
        path: '/login',
        component:LoginView,
      }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.auth) {
    next('/login');
  } else {
    next();
  }
});

export default router
