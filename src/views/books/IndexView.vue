<template>
  <div class="row text-end">
    <div class="col">
      <router-link class="btn btn-success me-2" to="/livros/cadastrar">
        Adicionar
      </router-link>
    </div>
  </div>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Título</th>
          <th scope="col">Editora</th>
          <th scope="col">Edição</th>
          <th scope="col">Valor</th>
          <th scope="col" colspan="2">Ano Publicação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in store.getBooks" :key="index">
          <th scope="row">
            {{ book.id }}
          </th>
          <td>
            {{ book.title }}
          </td>
          <td>
            {{ book.publisher }}
          </td>
          <td>
            {{ book.edition }}
          </td>
          <td>
            {{ book.price }}
          </td>
          <td>
            {{ book.publish_year }}
          </td>
          <td>
            <router-link class="btn btn-primary btn-sm me-2" :to="`/livros/editar/${book.id}`">
              Editar
            </router-link>
            <button type=" button" class="btn btn-danger btn-sm" @click="store.delete(book.id)">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import { onMounted } from 'vue';
import { bookStore } from '@/stores/Book';

const store = bookStore();

onMounted(async () => {
  await store.get();
})
</script>