<script setup>

</script>

<template>
  <main class="flex flex-col animateUp gap-5 justify-center items-center">
    <h1 class=" text-center lg:text-[88px] animateUp xl:text-8xl uppercase font-geforce text-5xl">
      ERROR 500
    </h1>
    <p class=" max-md:text-sm">
      Internal Server Error
    </p>
    <RouterLink to="/"
        class="flex max-md:text-sm  py-2 px-5 transition-all cursor-pointer hover:translate-y-0.5 active:translate-y-1 select-none gap-2 items-center border-primary">
      Return to home page
    </RouterLink>
  </main>
</template>

<style scoped>

</style>