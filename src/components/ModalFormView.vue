<script setup>
import { useTemplateRef, ref, inject, computed, watch, onMounted } from 'vue';
import { genres } from '@/data/genres';
import { platforms } from '@/data/platforms';

const { isModalOpen } = defineProps({
  isModalOpen: Boolean,
})
const emits = defineEmits(["closeModalForm"])
const modalMask = useTemplateRef("modalMask")

const games = inject("games")
const nextId = ref(1)

const game = ref({
  id: nextId.value,
  title: '',
  playedOn: {},
  gameGenres: [],
  imageLink: '',
  status: '',
  star: 0,
  feedback: ''
})

onMounted(() => {
  const stored = localStorage.getItem("games")
  games.value = stored ? JSON.parse(stored) : []
})

watch(games, (newValue) => {
  localStorage.setItem("games", JSON.stringify(newValue))
  nextId.value = games.value.length + 1
}, { deep: true })

async function addGame() {
  games.value.push({ ...game.value })
  nextId.value++
  game.value = { id: nextId.value, title: '', playedOn: {}, gameGenres: [], imageLink: '', status: '', star: 0, feedback: '' }
  // console.log(games.value)
}

const selectedGenres = computed(() =>
  game.value.gameGenres.map(g => g.value)
)

function disabledCheckbox(gr) {
  if (game.value.gameGenres.length >= 5 && !selectedGenres.value.includes(gr)) {
    return true
  } else {
    return false
  }
}
// function handleSubmit() {
//   addGame()
//   emits('closeModalForm')
// }

function clickOutsideModal(e) {
  if (modalMask.value == e.target) {
    emits('closeModalForm', isModalOpen)
  }
}


</script>

<template>
  <div ref="modalMask" v-on:click="clickOutsideModal"
    class="text-white fixed z-[5] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-5">
    <div class="max-w-xl h-full overflow-auto flex-1 bg-accent octagon pb-1"
      v-bind:style="{ boxShadow: '0px 1px 9px 0.9px #9290C3' }">
      <div class="flex justify-between bg-indigo-900 py-2 px-4">
        <h2 class="font-lexenddeca text-xl">Add Game</h2>
        <button @click="emits('closeModalForm')" class="font-orbitron">x</button>
      </div>
      <div class="w-full h-0.5 bg-neutral" v-bind:style="{ boxShadow: '0px 1px 9px 0.9px #9290C3' }">

      </div>
      <form @submit.prevent="addGame" action="" class="flex gap-3 py-2 flex-col px-4 font-lexenddeca">
        <div>
          <label for="game_title" class="block mb-1 text-sm font-normal">Title</label>
          <input v-model="game.title" type="text" id="game_title"
            class="border border-gray-300 placeholder-slate-300 text-sm rounded-lg block w-full p-2.5 bg-neutral"
            placeholder="Game Title" required />
        </div>
        <div>
          <label for="played_on" class="block mb-1 text-sm font-normal">Played On</label>
          <select v-model="game.playedOn" id="played_on"
            class="border border-gray-300 placeholder-slate-300 text-sm rounded-lg block w-full p-2.5 bg-neutral"
            placeholder="Played" required>
            <option v-for="platform in platforms" v-bind:key="platform.id" v-bind:value="platform">{{ platform.value }}
            </option>
          </select>
        </div>
        <div>
          <label class="block mb-1 text-sm font-normal">Genres <span class="text-xs font-light italic text-gray-300">|
              max
              5
              genre</span></label>
          <div class="grid-repeat h-max overflow-auto w-full p-1">
            <div v-for="genre in genres" v-bind:key="genre.id">
              <div class="flex items-center mb-4 w-max">
                <input v-bind:id="genre.value" type="checkbox" v-model="game.gameGenres"
                  v-bind:disabled="disabledCheckbox(genre.value)" v-bind:value="genre"
                  class="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-200  focus:ring-2">
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                  genre.value }}</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label for="image_link" class="block mb-1 text-sm font-normal">Image Link</label>
          <input v-model="game.imageLink" type="text" id="image_link"
            class="border border-gray-300 placeholder-slate-300 text-sm rounded-lg block w-full p-2.5 bg-neutral"
            placeholder="Image Link" required />
        </div>
        <div>
          <label class="block mb-1 text-sm font-normal">Status</label>
          <div class="grid-repeat h-max overflow-auto w-full p-1">
            <div v-for="status in (['Finished', 'Played', 'Unplayed'])" v-bind:key="status">
              <div class="flex items-center mb-4 w-max">
                <input id="status" type="radio" v-model="game.status" v-bind:value="status"
                  class="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-200  focus:ring-2">
                <label for="status" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                  status }}</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="game.status == ('Finished')">
          <label class="block mb-1 text-sm font-normal">Star</label>
          <div class="grid-repeat h-max overflow-auto w-full p-1">
            <div v-for="star in 5" v-bind:key="star">
              <div class="flex items-center mb-4 w-max">
                <input id="star" type="radio" v-model="game.star" v-bind:value="star"
                  class="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-200  focus:ring-2">
                <label for="star" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                  star }}</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="game.status == ('Finished')">
          <label for="feedback" class="block mb-1 text-sm font-normal">Feedback</label>
          <textarea v-model="game.feedback" type="text" id="feedback"
            class="border border-gray-300 placeholder-slate-300 text-sm rounded-lg block w-full p-2.5 bg-neutral"
            placeholder="Feedback" required></textarea>
        </div>
        <button type="submit" class="py-1 px-3 bg-indigo-900 border-2 border-neutral rounded-md"
          v-on:click="emits('closeModalForm')">Submit and close</button>
        <button type="submit" class="py-1 px-3 bg-indigo-800 border-2 border-neutral rounded-md">Submit
          and next</button>
      </form>
    </div>
  </div>
</template>
<!-- v-on:click.prevent="addGame" -->
<style scoped>
.grid-repeat {
  display: grid;
  grid-gap: 3px;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

.octagon {
  clip-path: polygon(5px 0,
      /* atas kiri masuk 5px dari kiri */
      calc(100% - 5px) 0,
      /* atas kanan mundur 5px dari kanan */
      100% 5px,
      /* kanan atas turun 5px */
      100% calc(100% - 5px),
      /* kanan bawah naik 5px dari bawah */
      calc(100% - 5px) 100%,
      /* bawah kanan mundur 5px dari kanan */
      5px 100%,
      /* bawah kiri maju 5px dari kiri */
      0 calc(100% - 5px),
      /* kiri bawah naik 5px */
      0 5px
      /* kiri atas turun 5px */
    );
}
</style>
