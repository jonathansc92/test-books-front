import { createRouter, createWebHistory } from 'vue-router'
import RegistrationView from '../views/RegistrationView.vue'
import Books from '../views/books/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/livros',
      name: 'book',
      component: Books,
    },
  ]
})

export default router
