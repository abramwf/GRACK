<script setup>
import { inject, useTemplateRef, nextTick, ref, computed } from 'vue';
import { platforms } from '@/data/platforms';
import { genres } from '@/data/genres';

const games = inject("games")
const emits = defineEmits(['closeModalConfirm'])
const modalMask = useTemplateRef("modalMask")
const { gameObject } = defineProps({ gameObject: Object })
const edit = ref({
  title: gameObject.title,
  playedOn: { ...gameObject.playedOn },
  gameGenres: [...gameObject.gameGenres],
  imageLink: gameObject.imageLink,
  status: gameObject.status,
  star: gameObject.star,
  feedback: gameObject.feedback
})


function editGame(game) {
  games.value = games.value.map((g) => g.id == game ? { ...g, title: edit.value.title, playedOn: edit.value.playedOn, gameGenres: edit.value.gameGenres, imageLink: edit.value.imageLink, status: edit.value.status, star: edit.value.star, feedback: edit.value.feedback } : g)
  localStorage.setItem("games", JSON.stringify(games.value))
}

const selectedGenres = computed(() =>
  edit.value.gameGenres.map(g => g.value)
)

function disabledCheckbox(gr) {
  if (edit.value.gameGenres.length >= 5 && !selectedGenres.value.includes(gr)) {
    return true
  } else {
    return false
  }
}

function updateGame() {
  emits('closeModalConfirm')
  editGame(gameObject.id)
}

async function clickOutsideModal(e) {
  await nextTick()
  if (e.target == modalMask.value) {
    emits('closeModalConfirm')
  }
}

</script>

<template>
  <div ref="modalMask" v-on:click="clickOutsideModal"
    class="text-white fixed z-[5] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-5">
    <div class="max-w-xl h-full overflow-auto flex-1 bg-accent octagon pb-1"
      v-bind:style="{ boxShadow: '0px 1px 9px 0.9px #9290C3' }">
      <div class="flex justify-between bg-indigo-900 py-2 px-4">
        <h2 class="font-lexenddeca text-xl">Update {{ gameObject.title }} Game</h2>
        <button @click="emits('closeModalConfirm')" class="font-orbitron">x</button>
      </div>
      <div class="w-full h-0.5 bg-neutral" v-bind:style="{ boxShadow: '0px 1px 9px 0.9px #9290C3' }">

      </div>
      <form action="" class="flex gap-3 py-2 flex-col px-4 font-lexenddeca">
        <div>
          <label for="game_title" class="block mb-1 text-sm font-normal">Title</label>
          <input v-model="edit.title" type="text" id="game_title"
            class="border border-gray-300 placeholder-slate-300 text-sm rounded-lg block w-full p-2.5 bg-neutral"
            placeholder="Game Title" required />
        </div>
        <div>
          <label for="played_on" class="block mb-1 text-sm font-normal">Played On</label>
          <select ref="playedOn" v-model="edit.playedOn" id="played_on"
            class="border border-gray-300 placeholder-slate-300 text-sm rounded-lg block w-full p-2.5 bg-neutral"
            placeholder="Played" required>
            <option v-for="platform in platforms" v-bind:key="platform.id" v-bind:value="platform">{{
              platform.value }}</option>
          </select>
        </div>
        <div>
          <label class="block mb-1 text-sm font-normal">Genres <span class="text-xs font-light italic text-gray-300">|
              max
              5
              genre</span></label>
          <div class="grid-repeat h-max overflow-auto w-full p-1">
            <div ref="genreCheckbox" v-for="genre in genres" v-bind:key="genre.id">
              <div class="flex items-center mb-4 w-max">
                <input v-bind:id="genre.value" type="checkbox" v-model="edit.gameGenres"
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
          <input v-model="edit.imageLink" type="text" id="image_link"
            class="border border-gray-300 placeholder-slate-300 text-sm rounded-lg block w-full p-2.5 bg-neutral"
            placeholder="Image Link" required />
        </div>
        <div>
          <label class="block mb-1 text-sm font-normal">Status</label>
          <div class="grid-repeat h-max overflow-auto w-full p-1">
            <div v-for="status in (['Finished', 'Played', 'Unplayed'])" v-bind:key="status">
              <div class="flex items-center mb-4 w-max">
                <input id="status" type="radio" v-model="edit.status" v-bind:value="status"
                  class="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-200  focus:ring-2">
                <label for="status" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                  status }}</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="edit.status == ('Finished')">
          <label class="block mb-1 text-sm font-normal">Star</label>
          <div class="grid-repeat h-max overflow-auto w-full p-1">
            <div v-for="star in 5" v-bind:key="star">
              <div class="flex items-center mb-4 w-max">
                <input id="star" type="radio" v-model="edit.star" v-bind:value="star"
                  class="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-200  focus:ring-2">
                <label for="star" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                  star }}</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="edit.status == ('Finished')">
          <label for="feedback" class="block mb-1 text-sm font-normal">Feedback</label>
          <textarea v-model="edit.feedback" type="text" id="feedback"
            class="border border-gray-300 placeholder-slate-300 text-sm rounded-lg block w-full p-2.5 bg-neutral"
            placeholder="Feedback" required></textarea>
        </div>
        <button class="py-1 px-3 bg-indigo-800 border-2 border-neutral rounded-md"
          v-on:click.prevent="updateGame()">Update</button>
      </form>
    </div>
  </div>
</template>

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
