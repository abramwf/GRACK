<script setup>

</script>

<template>
  <div class="text-gray-200 py-3 px-4 gap-4 border-accent border-2 font-light flex flex-col h-max">
    <div>
      <div class="flex items-center w-full gap-2">
        <h2 class="mb-1 whitespace-nowrap text-green-100 italic"><span class="font-semibold">30</span>
          finished</h2>
        <div class="bg-green-200 h-[1px] w-full"></div>
      </div>
      <div class="grid-repeat-status">
        <div v-for="n in 13" :key="n" class="bg-green-600 h-[33px]"></div>
        <div class="flex gap-1 items-center w-max">
          <div class="flex gap-1">
            <div class="w-[3px] h-[3px] bg-green-600"></div>
            <div class="w-[3px] h-[3px] bg-green-600"></div>
            <div class="w-[3px] h-[3px] bg-green-600"></div>
          </div>
          <p class="leading-none p-0 text-green-100 text-xs">27</p>
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center w-full gap-2">
        <h2 class="mb-1 whitespace-nowrap text-blue-100 italic"><span class="font-semibold">30</span>
          played</h2>
        <div class="bg-blue-200 h-[1px] w-full"></div>
      </div>
      <div class="grid-repeat-status">
        <div v-for="n in 13" :key="n" class="bg-blue-600 h-[33px]"></div>
        <div class="flex gap-1 items-center w-max">
          <div class="flex gap-1">
            <div class="w-[3px] h-[3px] bg-blue-600"></div>
            <div class="w-[3px] h-[3px] bg-blue-600"></div>
            <div class="w-[3px] h-[3px] bg-blue-600"></div>
          </div>
          <p class="leading-none p-0 text-blue-100 text-xs">27</p>
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center w-full gap-2">
        <h2 class="mb-1 whitespace-nowrap text-gray-100 italic"><span class="font-semibold">30</span>
          unplayed</h2>
        <div class="bg-gray-200 h-[1px] w-full"></div>
      </div>
      <div class="grid-repeat-status">
        <div v-for="n in 13" :key="n" class="bg-gray-600 h-[33px]"></div>
        <div class="flex gap-1 items-center w-max">
          <div class="flex gap-1">
            <div class="w-[3px] h-[3px] bg-gray-600"></div>
            <div class="w-[3px] h-[3px] bg-gray-600"></div>
            <div class="w-[3px] h-[3px] bg-gray-600"></div>
          </div>
          <p class="leading-none p-0 text-gray-100 text-xs">27</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.grid-repeat-status {
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
}
</style>
