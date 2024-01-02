<template>
  <NavbarView />
  <div class="container">
    <div class="row mt-5">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavbarView from '@/components/NavbarView.vue';
</script>