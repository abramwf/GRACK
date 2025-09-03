<script setup>
import { inject, ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { ArrowsPointingOutIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'
import ModalDeleteView from './ModalDeleteView.vue';
import ModalEditView from './ModalEditView.vue';
const games = inject("games")

const isHoverCard = ref(null)
const selected = ref({
  edit: null,
  delete: null
})

const isModalOpen = ref({
  edit: false,
  delete: false
})

onMounted(() => {
  const stored = localStorage.getItem("games")
  games.value = stored ? JSON.parse(stored) : []
})

function enterCard(game) {
  isHoverCard.value = isHoverCard.value == game ? null : game
}

function leaveCard() {
  isHoverCard.value = ''
}

function openDelete(game) {
  selected.value.delete = game
  isModalOpen.value.delete = true
}

function openEdit(game) {
  selected.value.edit = game
  isModalOpen.value.edit = true
}

</script>

<template>
  <div class="col-span-3 py-3 px-4 grid-repeat-card border-accent border-2">
    <div v-for="game in games" v-bind:key="game.id"
      class="relative z-[1] h-80 octagon flex flex-col justify-between text-white">
      <div class="w-full flex relative">
        <div class="bg-accent h-7 py-0.5 gap-1 px-2 w-full flex items-center border-b-secondary border-b-2">
          <Icon v-bind:icon="game.playedOn.icon" class="h-full w-6 font-bold" />
          <h3 class="font-orbitron font-medium text-sm">
            {{ game.title }}
          </h3>
        </div>
        <div class="bg-secondary h-10 w-10 flex items-center justify-center absolute right-0 octagon">
          <div class="h-9 w-9 octagon"
            v-bind:class="game.status == 'Finished' ? 'bg-green-300' : game.status == 'Played' ? 'bg-blue-300' : 'bg-gray-300'">
          </div>
        </div>
      </div>
      <div class="bg-secondary h-28 w-6 absolute flex items-center justify-start left-0 top-[25%] left-trapezoid">
        <div class="bg-neutral h-[108px] w-[22px] left-trapezoid flex flex-col items-center py-1 gap-1">
          <Icon class="text-lg" v-for="genre in game.gameGenres" v-bind:key="genre.id" v-bind:icon="genre.icon"
            v-bind:class="genre.color" />
        </div>
      </div>
      <div class="bg-secondary h-[126px] w-6 absolute flex items-center justify-end right-0 top-[25%]">
        <div class="bg-neutral gap-2 py-3 flex flex-col items-center h-[122px] w-[22px]">
          <button class="bg-green-300 h-4 w-4 octagon"></button>
          <button class="bg-blue-900 hover:bg-blue-400 h-4 w-4 octagon"></button>
          <button class="bg-gray-900 hover:bg-gray-400 h-4 w-4 octagon"></button>
          <div class="border-t-gray-400 border-t-2 w-4"></div>
          <div class="relative z-[1]" v-on:mouseleave="leaveCard">
            <ArrowsPointingOutIcon class="size-5 cursor-pointer font-bold text-gray-200"
              v-on:mouseenter="enterCard(game.id)" />
            <Transition name="slide-fade">
              <div v-if="game.id == isHoverCard"
                class="flex items-start absolute top-[-10px] bg-neutral border-[2px] border-accent border-r-0  right-[21px] z-[-1] justify-center px-1 py-[10px] w-16 gap-2">
                <PencilIcon v-on:click="openEdit(game)" class="size-5 cursor-pointer font-bold text-orange-300" />
                <TrashIcon v-on:click="openDelete(game)" class="size-5 cursor-pointer font-bold text-red-300" />
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <div class="bg-slate-600 relative z-[-1] h-full w-full bg-no-repeat bg-cover"
        v-bind:style="{ backgroundImage: `url(${game.imageLink})` }">
        <div class="bg-neutral h-6 w-20 flex items-end absolute left-0 bottom-0 elbow-trapezoid">
          <div class="bg-viol h-[22px] w-[78px] flex items-center justify-around elbow-trapezoid">
            <div v-for="value in 5" v-bind:key="value" class="star h-3 w-3 "
              v-bind:class="value <= game.star ? 'bg-yellow-200' : 'bg-slate-200'"></div>
          </div>
        </div>
      </div>
      <div class="bg-accent px-2 py-1 h-16 w-full border-t-secondary border-t-2">
        <p class="text-xs font-light text-justify">{{ game.feedback }}</p>
      </div>
    </div>
  </div>

  <ModalDeleteView v-if="isModalOpen.delete" v-bind:game-title="selected.delete.title"
    v-bind:game-id="selected.delete?.id" v-on:close-modal-confirm="() => isModalOpen.delete = false" />
  <ModalEditView v-if="isModalOpen.edit" v-bind:game-object="selected.edit"
    v-on:close-modal-confirm="() => isModalOpen.edit = false" />
</template>

<style scoped>
.grid-repeat-card {
  display: grid;
  grid-gap: 10px;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  width: 0;
  padding-left: 0px;
  padding-right: 0px;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  width: 64px;
  padding-left: 4px;
  padding-right: 4px;
}

.star {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
</style>
