<script setup>
import jumbotron from '@/assets/images/jumbotron.gif'
import ModalFormView from './ModalFormView.vue';
import { nextTick, ref } from 'vue';

const isModalOpen = ref(false)

async function openedModal() {
  await nextTick()
  isModalOpen.value = true
}

</script>

<template>
  <div class="text-white w-full h-fit flex">
    <div class="flex">
      <div
        class="font-orbitron flex flex-col text-2xl font-semibold py-5 px-4 bg-gradient-to-b from-secondary via-primary to-secondary ">
        <h1>G</h1>
        <h1>R</h1>
        <h1>A</h1>
        <h1>C</h1>
        <h1>K</h1>
      </div>
      <div class="w-[1.7px] bg-neutral" v-bind:style="{ boxShadow: '-1px 0px 9px 0.9px #9290C3' }"></div>
    </div>
    <div v-bind:style="{ backgroundImage: `url(${jumbotron})` }" class="w-full bg-[bottom_40%_right_45%] bg-cover ">

    </div>
  </div>
  <div class="w-full h-0.5 bg-neutral" v-bind:style="{ boxShadow: '0px 1px 9px 0.9px #9290C3' }">

  </div>
  <div class="font-orbitron w-fit flex items-center">
    <div>
      <div class="text-gray-200 py-2 px-4">
        Track Your Game Progress
      </div>
      <div class="w-full h-[0.9px] bg-accent" v-bind:style="{ boxShadow: '0px 1px 7px 0px #9290C3' }">

      </div>
    </div>
    <button class="text-gray-200 bg-secondary py-2 px-4 border-accent border-2 hover:bg-accent"
      v-on:click="openedModal">
      Add
    </button>
  </div>
  <Transition name="slide-fade">
    <ModalFormView v-if="isModalOpen" v-bind:is-modal-open="isModalOpen"
      v-on:close-modal-form="() => isModalOpen = false" />
  </Transition>

</template>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
<!--  primary: '#070F2B',
        secondary: '#1B1A55',
        accent: '#535C91',
        neutral: '#9290C3', -->
