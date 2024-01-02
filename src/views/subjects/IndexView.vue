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
        <th scope="col">Descrição</th>
        <th scope="col">Ações</th>
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
            <label class="form-label" for="description">
              Descrição
            </label>
            <Field class="form-control" v-model="description" name="description" type="text"
              placeholder="Digite a descrição" :rules="validate" />
            <ErrorMessage name="description" class="errorMessage" />
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
import { onMounted } from 'vue';
import { subjectStore } from '@/stores/Subject';

const store = subjectStore();

onMounted(async () => {
  await store.get();
})
</script>