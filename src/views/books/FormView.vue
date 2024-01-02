<template>
  <Form class="row g-3" @submit="onSubmit" :validation-schema="schema">
    <div class="col-md-6">
      <label class="form-label" for="title">
        Título
      </label>
      <Field class="form-control" v-model="title" name="title" type="text" placeholder="Digite o título" />
      <ErrorMessage name="title" class="errorMessage" />
    </div>
    <div class="col-md-6">
      <label class="form-label" for="price">
        Preço
      </label>
      <Field class="form-control" v-model="price" name="price" type="number" placeholder="Digite o valor" />
      <ErrorMessage name="price" class="errorMessage" />
    </div>
    <div class="col-md-4">
      <label class="form-label" for="publisher">
        Editora
      </label>
      <Field class="form-control" v-model="publisher" name="publisher" type="text" placeholder="Digite a editora" />
      <ErrorMessage name="publisher" class="errorMessage" />
    </div>
    <div class="col-md-4">
      <label class="form-label" for="edition">
        Edição
      </label>
      <Field class="form-control" v-model="edition" name="edition" type="number" placeholder="Digite a edição" />
      <ErrorMessage name="edition" class="errorMessage" />
    </div>
    <div class="col-md-4">
      <label class="form-label" for="publish_year">
        Ano Publicação
      </label>
      <Field class="form-control" v-model="publish_year" name="publish_year" as="select">
        <option v-for="(year, index) in years" :key="index" :value="year">
          {{ year }}
        </option>
      </Field>
      <ErrorMessage name="publish_year" class="errorMessage" />
    </div>
    <div class="col-md-12">
      <label class="form-label" for="authors">
        Autores
      </label>
      <Field v-model="selectedAuthors" class="form-select" name="authors" as="select" multiple>
        <option v-for="(author, index) in authorStore().getAuthors" :key="index" :value="author.id"
          :selected="selectedAuthors && selectedAuthors.includes(author.id)">
          {{ author.name }}
        </option>
      </Field>
    </div>
    <div class="col-md-12">
      <label class="form-label" for="authors">
        Assuntos
      </label>
      <Field v-model="selectedSubjects" class="form-select" name="subjects" as="select" multiple>
        <option v-for="(subject, index) in subjectStore().getSubjects" :key="index" :value="subject.id"
          :selected="selectedSubjects && selectedSubjects.includes(subject.id)">
          {{ subject.description }}
        </option>
      </Field>
    </div>
    <div class="mb-3 text-end">
      <router-link class="btn btn-secondary me-2" to="/livros">Voltar</router-link>
      <button type="submit" class="btn btn-primary">Salvar</button>
    </div>
  </Form>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { authorStore } from '@/stores/Author';
import { subjectStore } from '@/stores/Subject';
import { bookStore } from '@/stores/Book';
import validation from '@/utils/validation';
import { Form, Field, ErrorMessage, useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRoute } from 'vue-router';

const store = bookStore();
const route = useRoute();

const schema = yup.object({
  title: yup.string().required(validation.REQUIRED).max(40, validation.MAX),
  price: yup.string().required(validation.REQUIRED),
  edition: yup.string().required(validation.REQUIRED).max(10, validation.MAX),
  publisher: yup.string().required(validation.REQUIRED).max(40, validation.MAX),
  publish_year: yup.string().required(validation.REQUIRED).min(4, validation.MIN),
});

const { value: title } = useField("title");
const { value: price } = useField("price");
const { value: edition } = useField("edition");
const { value: publisher } = useField("publisher");
const { value: publish_year } = useField("publish_year");

const years = computed(() => {
  const year = new Date().getFullYear()
  return Array.from({ length: year - 1900 }, (value, index) => 1901 + index)
});

const selectedSubjects = ref([]);
const selectedAuthors = ref([]);

async function onSubmit(values) {
  values.authors = selectedAuthors.value;
  values.subjects = selectedSubjects.value;

  if (route.params.id) {
    await store.update(route.params.id, values);
  } else {
    await store.create(values);
  }
};

onMounted(async () => {
  await authorStore().get();
  await subjectStore().get();

  if (route.params.id) {
    await store.show(route.params.id);

    title.value = store.getBook.title;
    price.value = store.getBook.price;
    edition.value = store.getBook.edition;
    publisher.value = store.getBook.publisher;
    publish_year.value = store.getBook.publish_year;
    selectedSubjects.value = store.getBook.subjects.map(function (subject) { return subject["subject_id"]; });
    selectedAuthors.value = store.getBook.authors.map(function (author) { return author["author_id"]; });
  }
})
</script>