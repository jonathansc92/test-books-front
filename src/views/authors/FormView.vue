<template>
  <Form @submit="onSubmit">
    <div class="mb-3">
      <label class="form-label" for="name">
        Nome
      </label>
      <Field class="form-control" v-model="name" name="name" type="text" placeholder="Digite o nome" :rules="validate" />
      <ErrorMessage name="name" class="errorMessage" />
    </div>
    <div class="mb-3 text-end">
      <router-link class="btn btn-secondary me-2" to="/autores">Voltar</router-link>
      <button type="submit" class="btn btn-primary">Salvar</button>
    </div>
  </Form>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { authorStore } from '@/stores/Author';
import validation from '@/utils/validation';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useRoute } from 'vue-router';

const store = authorStore();
const name = ref(null);
const route = useRoute();

const validate = yup.string().required(validation.REQUIRED).max(40, validation.MAX);

async function onSubmit(values) {
  if (route.params.id) {
    await store.update(route.params.id, values);
  } else {
    await store.create(values);
  }
};

onMounted(async () => {
  if (route.params.id) {
    await store.show(route.params.id);

    name.value = store.getAuthor.name;
  }
})
</script>