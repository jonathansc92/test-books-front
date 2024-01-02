<template>
  <div class="row">
    <div class="col-3 offset-9 align-self-end">
      <button type="button" class="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#formModalAuthor">
        Adicionar
      </button>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Título</th>
        <th scope="col">Editora</th>
        <th scope="col">Edição</th>
        <th scope="col">Valor</th>
        <th scope="col">Ano Publicação</th>
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
          <button type="button" class="btn btn-primary btn-sm me-2" data-bs-toggle="modal"
            data-bs-target="#formModalAuthor" @click="edt(book)">
            Editar
          </button>
          <button type=" button" class="btn btn-danger btn-sm" @click="store.delete(book.id)">
            Remover
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="modal fade" id="formModalAuthor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cadastrar Autor</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <Form @submit="onSubmit">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label" for="name">
                Título
              </label>
              <Field class="form-control" v-model="title" name="title" type="text" placeholder="Digite o título" />
              <ErrorMessage name="title" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="price">
                Preço
              </label>
              <Field class="form-control" v-model="price" name="price" type="text" placeholder="Digite o valor" />
              <ErrorMessage name="price" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="name">
                Editora
              </label>
              <Field class="form-control" v-model="publisher" name="publisher" type="text"
                placeholder="Digite a editora" />
              <ErrorMessage name="publisher" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="name">
                Edição
              </label>
              <Field class="form-control" v-model="edition" name="edition" type="number" placeholder="Digite a edição" />
              <ErrorMessage name="edition" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="name">
                Ano Publicação
              </label>
              <Field class="form-control" v-model="publish_year" name="publish_year" type="number"
                placeholder="Digite o ano da publicação" />
              <ErrorMessage name="edition" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="authors">
                Autores
              </label>
              <select v-model="selectedAuthors" class="form-select" multiple aria-label="multiple select example">
                <option selected>Open this select menu</option>
                <option v-for="(author, index) in authorStore().getAuthors" :key="index" :value="author.id">
                  {{ author.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label" for="name">
                Assuntos
              </label>
              <select v-model="selectedSubjects" class="form-select" multiple aria-label="multiple select example">
                <option selected>Open this select menu</option>
                <option v-for="(subject, index) in subjectStore().getSubjects" :key="index" :value="subject.id">
                  {{ subject.description }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { bookStore } from '@/stores/Book';
import { subjectStore } from '@/stores/Subject';
import { authorStore } from '@/stores/Author';
import { Form, Field, useField, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import validation from '@/utils/validation';

const store = bookStore();
const selectedSubjects = ref([]);
const selectedAuthors = ref([]);

const { value: title } = useField('title', yup.string().required(validation.REQUIRED));
const { value: price } = useField('price', yup.string().required(validation.REQUIRED));
const { value: edition } = useField('edition', yup.string().required(validation.REQUIRED));
const { value: publisher } = useField('publisher', yup.string().required(validation.REQUIRED));
const { value: publish_year } = useField('publish_year', yup.string().required(validation.REQUIRED));

function edt(subject) {
  title.value = subject.title;
  price.value = subject.price;
  edition.value = subject.edition;
  publisher.value = subject.publisher;
  publish_year.value = subject.publish_year;
  selectedSubjects.value = subject.subjects.map(function (subject) { return subject["subject_id"]; });
  selectedAuthors.value = subject.authors.map(function (author) { return author["author_id"]; });
}

onMounted(async () => {
  await store.get();
  await subjectStore().get();
  await authorStore().get();
})
</script>