<script setup>
import { inject, useTemplateRef, nextTick } from 'vue';

const games = inject("games")
const emits = defineEmits(['closeModalConfirm'])
const modalMask = useTemplateRef("modalMask")
const { gameId, gameTitle } = defineProps({ gameId: Number, gameTitle: String })

async function clickOutsideModal(e) {
  await nextTick()
  if (e.target == modalMask.value) {
    emits('closeModalConfirm')
  }
}

function deleteGame(game) {
  games.value = games.value.filter((g) => g.id != game)
  localStorage.setItem("games", JSON.stringify(games.value))
}

function acceptDelete() {
  deleteGame(gameId)
  emits('closeModalConfirm')
}
</script>

<template>
  <div ref="modalMask" v-on:click="clickOutsideModal"
    class="text-white fixed z-[1000] top-0 left-0 w-full h-full bg-black bg-opacity-25 flex items-center justify-center p-5">
    <div class="max-w-xl flex-1 bg-accent octagon pb-1" v-bind:style="{ boxShadow: '0px 1px 7px 0.2px #9290C3' }">
      <div class="w-full bg-accent p-3 flex flex-col">
        <button class="font-orbitron font-bold self-end" v-on:click="emits('closeModalConfirm')">x</button>

        <div class="w-full flex flex-col gap-2 justify-center items-center">
          <p>Are You Sure to Delete this {{ gameTitle }} Game? </p>
          <button v-on:click="acceptDelete" class="bg-red-500 w-full">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
