<script setup>
import JumbotronView from './components/JumbotronView.vue';
import MainView from './components/MainView.vue';

import { provide, ref } from 'vue';
const games = ref([])

provide("games", games)

</script>

<template>
  <JumbotronView />
  <MainView />
</template>

<style scoped></style>
