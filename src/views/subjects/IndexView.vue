<template>
  <div class="row text-end">
    <div class="col">
      <router-link class="btn btn-success me-2" to="/assuntos/cadastrar">
        Adicionar
      </router-link>
    </div>
  </div>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" colspan="2">Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subject, index) in store.getSubjects" :key="index">
          <th scope="row">
            {{ subject.id }}
          </th>
          <td>
            {{ subject.description }}
          </td>
          <td>
            <router-link class="btn btn-primary btn-sm me-2" :to="`/assuntos/editar/${subject.id}`">
              Editar
            </router-link>
            <button type=" button" class="btn btn-danger btn-sm" @click="store.delete(subject.id)">
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
import { subjectStore } from '@/stores/Subject';

const store = subjectStore();

onMounted(async () => {
  await store.get();
})
</script>