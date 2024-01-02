import { createRouter, createWebHistory } from 'vue-router';
import Books from '../views/books/IndexView.vue';
import Authors from '../views/authors/IndexView.vue';
import Subjects from '../views/subjects/IndexView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/livros',
      name: 'book',
      component: Books,
    },
    {
      path: '/autores',
      name: 'author',
      component: Authors,
    },
    {
      path: '/assuntos',
      name: 'subject',
      component: Subjects,
    },
  ]
})

export default router
