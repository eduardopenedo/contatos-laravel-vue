import home from '../components/home.vue'
import notFound from '../components/error/notFound.vue'
import {createRouter, createWebHistory} from 'vue-router'
const routes = [
  {
    path:'/home',
    component: home
  },
  {
    path:'/:pathMatch(.*)*',
    component:notFound
  }
]

const router = createRouter(
  {
    history: createWebHistory(),
    routes,
  }
)

export default router;