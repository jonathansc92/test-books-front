<template>
  <div class="row">
    <h1 class="fs-2">
      Relatório de Livros
    </h1>
  </div>
  <form @submit.prevent="filter">
    <div class="row mt-4">
      <div class="col-md-4">
        <label for="authorFilter" class="form-label">Autor</label>
        <select v-model="authorFilter" id="authorFilter" class="form-select">
          <option :value="null" selected>
            Todos
          </option>
          <option v-for="(author, index) in authorStore().getAuthors" :value="author.name" :key="index">
            {{ author.name }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="bookFilter" class="form-label">Livro</label>
        <select id="bookFilter" v-model="bookFilter" class="form-select">
          <option :value="null" selected>
            Todos
          </option>
          <option v-for="(book, index) in bookStore().getBooks" :value="book.title" :key="index">
            {{ book.title }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="subjectFilter" class="form-label">Assunto</label>
        <select v-model="subjectFilter" id="subjectFilter" class="form-select">
          <option :value="null" selected>
            Todos
          </option>
          <option v-for="(subject, index) in subjectStore().getSubjects" :value="subject.description" :key="index">
            {{ subject.description }}
          </option>
        </select>
      </div>
    </div>
    <div class="row text-end mt-3 mb-4">
      <div class="col">
        <button type="button" class="btn btn-success me-2" @click="store.report()">
          Exportar Excel
        </button>
        <button type="submit" class="btn btn-primary me-2">
          Filtrar
        </button>
      </div>
    </div>
  </form>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Autor</th>
          <th scope="col">Livros</th>
          <th scope="col">Assuntos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in store.getBooksReport" :key="index">
          <th scope="row">
            {{ report.author_name }}
          </th>
          <td>
            {{ report.books_by_author }}
          </td>
          <td>
            {{ report.subjects_by_author }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { bookReportStore } from '@/stores/BookReport';
import { bookStore } from '@/stores/Book';
import { subjectStore } from '@/stores/Subject';
import { authorStore } from '@/stores/Author';

const store = bookReportStore();
const authorFilter = ref(null);
const bookFilter = ref(null);
const subjectFilter = ref(null);

async function filter() {
  const params = new URLSearchParams();

  if (authorFilter.value) {
    params.append('author_name', authorFilter.value);
  }

  if (bookFilter.value) {
    params.append('books_by_author', bookFilter.value);
  }

  if (subjectFilter.value) {
    params.append('subjects_by_author', subjectFilter.value);
  }

  store.setFilter(params.toString());

  await store.get();
}

onMounted(async () => {
  await store.get();
  await bookStore().get();
  await subjectStore().get();
  await authorStore().get();
})
</script>