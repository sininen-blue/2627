<template>
  <div
    class="slidev-layout cover"
  >
  <div class="absolute top-0 left-0 right-0 h-2 bg-[#52247a]"></div>
      <div class="header flex flex-row justify-end">
        <div class="flex flex-col items-end">
          <p>College of Information Technology, Entertainment, and Computing</p>
          <p>Father Saturnino Urios University   |   San Francisco St, Butuan City, 8600 Agusan Del Norte</p>
        </div>
        <div class="flex flex-row bg-[#52247a]">
          <p>logo 1</p>
          <p>logo 2</p>
        </div>
      </div>

      <div class="body flex flex-row justify-between">
        <div id="right">
        <slot />
        <div class="flex gap-2 mt-8 items-center">
          <span 
            v-for="n in 11" 
            :key="n" 
            :class="[
              'w-7 h-2 rounded-full transform skew-x-[-10deg]', 
              n % 3 === 1 ? 'bg-[#9d1c5c]' : n % 3 === 2 ? 'bg-[#211a46]' : 'bg-[#7a6a9b]'
            ]"
          ></span>
        </div>
        </div>
        <div>
          Photo of faculty
        </div>
      </div>
    </div>
</template>
