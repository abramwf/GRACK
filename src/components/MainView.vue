<script setup>
import CardView from './CardView.vue';
import StatusVue from './StatusVue.vue';
// import { genres } from '@/data/genres';
// import { Icon } from '@iconify/vue'

</script>
<template>
  <div class="grid grid-cols-4 gap-5 px-3 py-6 font-lexenddeca text-white">
    <StatusVue />
    <CardView />
  </div>
  <!-- <ul>
    <li v-for="g in genres" :key="g.id" class="flex items-center gap-2">
      <Icon v-bind:class="g.color" v-bind:icon="g.icon" />
      <p v-bind:class="g.color">{{ g.value }}</p>
    </li>
  </ul> -->
</template>
<style scoped>
.section {
  width: 200px;
  height: 500px;
  position: relative;
  background: transparent;
  /* konten tetap biasa */
}

.section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: #3498db;
  clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
  z-index: -1;
}
</style>
