import { createRouter, createWebHistory } from 'vue-router';
import Books from '../views/books/IndexView.vue';

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
      component: () => import("@/views/authors/IndexView.vue"),
      meta: {
        title: 'Autores',
      }
    },
    {
      path: '/autores/cadastrar',
      name: 'author-register',
      component: () => import("@/views/authors/FormView.vue"),
      meta: {
        title: 'Autor - Cadastrar',
      }
    },
    {
      path: '/autores/editar/:id',
      name: 'author-edit',
      component: () => import("@/views/authors/FormView.vue"),
      meta: {
        title: 'Autor - Editar',
      }
    },
    {
      path: '/assuntos',
      name: 'subjects',
      component: () => import("@/views/subjects/IndexView.vue"),
      meta: {
        title: 'Assuntos',
      }
    },
    {
      path: '/assuntos/cadastrar',
      name: 'subject-register',
      component: () => import("@/views/subjects/FormView.vue"),
      meta: {
        title: 'Assunto - Cadastrar',
      }
    },
    {
      path: '/assuntos/editar/:id',
      name: 'subject-edit',
      component: () => import("@/views/subjects/FormView.vue"),
      meta: {
        title: 'Assunto - Editar',
      }
    },
  ]
})

export default router
