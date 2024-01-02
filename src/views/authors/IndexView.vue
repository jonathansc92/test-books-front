<template>
  <div class="row">
    <div class="col-3 offset-9 align-self-end">
      <button type="button" class="btn btn-success me-2" @click="openModal">
        Adicionar
      </button>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Ações</th>
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
          <button type="button" class="btn btn-primary btn-sm me-2" data-bs-toggle="modal"
            data-bs-target="#formModalAuthor" @click="edt(author)">
            Editar
          </button>
          <button type=" button" class="btn btn-danger btn-sm" @click="store.delete(author.id)">
            Remover
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cadastrar Autor</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <Form @submit="onSubmit">
          <div class="modal-body">
            <label class="form-label" for="name">
              Nome
            </label>
            <Field class="form-control" v-model="name" name="name" type="text" placeholder="Digite o nome"
              :rules="validate" />
            <ErrorMessage name="name" class="errorMessage" />
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
import { authorStore } from '@/stores/Author';
import validation from '@/utils/validation';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { Modal } from 'bootstrap'

const store = authorStore();
const id = ref(null);
const name = ref(null);
const modalId = ref('formModalAuthor');

const validate = yup.string().required(validation.REQUIRED).max(40, validation.MAX);

async function onSubmit(values) {
  if (id.value) {
    await store.update(id, values);
  } else {
    await store.create(values);
  }

  closeModal;
};

function edt(author) {
  id.value = author.id;
  name.value = author.name;
}

function openModal() {
  const myModal = new Modal(document.getElementById('formModalAuthor'));
  myModal.show();
}

function closeModal() {
  const myModal = new Modal(document.getElementById('#formModalAuthor'));
  myModal.hide();
}

function resetFields() {
  id.value = null;
  name.value = null;
}

onMounted(async () => {
  await store.get();

  // const myModalEl = document.getElementById('formModalAuthor');
  // myModalEl.addEventListener('hidden.bs.modal', function () {
  //   resetFields();
  // });

  // myModalEl.addEventListener('hidden.bs.modal', event => {
  //   resetFields()
  // })

})
</script>