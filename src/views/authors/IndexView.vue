<template>
  <div class="row">
    <h1 class="fs-2">
      Gerenciar Autores
    </h1>
  </div>
  <div class="row text-end">
    <div class="col">
      <router-link class="btn btn-success me-2" to="/autores/cadastrar">
        Adicionar
      </router-link>
    </div>
  </div>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" colspan="2">Nome</th>
        </tr>
      </thead>
      <tbody v-if="store.getAuthors">
        <tr v-for="(author, index) in store.getAuthors" :key="index">
          <th scope="row">
            {{ author.id }}
          </th>
          <td>
            {{ author.name }}
          </td>
          <td>
            <router-link class="btn btn-primary btn-sm me-2" :to="`/autores/editar/${author.id}`">
              Editar
            </router-link>
            <button type="button" class="btn btn-danger btn-sm" @click="store.delete(author.id)">
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
import { authorStore } from '@/stores/Author';

const store = authorStore();

onMounted(async () => {
  await store.get();
})
</script>