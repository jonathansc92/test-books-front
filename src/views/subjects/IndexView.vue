<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Descrição</th>
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
      </tr>
    </tbody>
  </table>
</template>
  
<script setup>
import { onMounted } from 'vue';
import { subjectStore } from '@/stores/Subject';

const store = subjectStore();

onMounted(async () => {
  await store.get();
})
</script>