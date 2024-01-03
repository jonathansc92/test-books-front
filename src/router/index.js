import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/livros',
      name: 'book',
      component: () => import("@/views/books/IndexView.vue"),
    },
    {
      path: '/livros/cadastrar',
      name: 'book-register',
      component: () => import("@/views/books/FormView.vue"),
    },
    {
      path: '/livros/editar/:id',
      name: 'book-edit',
      component: () => import("@/views/books/FormView.vue"),
    },
    {
      path: '/autores',
      name: 'author',
      component: () => import("@/views/authors/IndexView.vue"),
    },
    {
      path: '/autores/cadastrar',
      name: 'author-register',
      component: () => import("@/views/authors/FormView.vue"),
    },
    {
      path: '/autores/editar/:id',
      name: 'author-edit',
      component: () => import("@/views/authors/FormView.vue"),
    },
    {
      path: '/assuntos',
      name: 'subjects',
      component: () => import("@/views/subjects/IndexView.vue"),
    },
    {
      path: '/assuntos/cadastrar',
      name: 'subject-register',
      component: () => import("@/views/subjects/FormView.vue"),
    },
    {
      path: '/assuntos/editar/:id',
      name: 'subject-edit',
      component: () => import("@/views/subjects/FormView.vue"),
    },
    {
      path: '/relatorios/livros',
      name: 'report-books',
      component: () => import("@/views/reports/books/IndexView.vue"),
    },
  ]
})

export default router
