<script setup>

</script>

<template>
  <main class="flex text-sm w-full  max-w-[380px] flex-col  gap-8 justify-center items-center">
    <div class="flex flex-col w-full gap-5 p-5 rounded-md border-primary">
      <div class="flex flex-col gap-[10px/]">
        <h1 class="text-xl text-center">
          Reset password
        </h1>
        <p class="text-black/80 text-center">
          Enter your email address and we will send you
          instructions to reset your password.
        </p>
      </div>
      <div class="flex flex-col gap-[5px]">
        <label for="email">Email</label>
        <input type="email" id="email" class="px-3 py-[10px] border-primary  rounded-md"
               placeholder="your@email.com">
      </div>

      <div class="flex flex-col gap-[10px]">
        <button disabled class="btn-primary">
          Continue
        </button>


      </div>
    </div>
    <div class="flex transition-all  hover:gap-2  select-none cursor-pointer justify-center gap-[5px] items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
            d="M9.03412 4.53412C9.36363 4.20462 9.36363 3.67038 9.03412 3.34088C8.70462 3.01137 8.17038 3.01137 7.84088 3.34088L2.77838 8.40338C2.44887 8.73288 2.44887 9.26712 2.77838 9.59662L7.84088 14.6591C8.17038 14.9886 8.70462 14.9886 9.03412 14.6591C9.36363 14.3296 9.36363 13.7954 9.03412 13.4659L5.41199 9.84375L14.625 9.84375C15.091 9.84375 15.4688 9.46599 15.4688 9C15.4688 8.53401 15.091 8.15625 14.625 8.15625L5.41199 8.15625L9.03412 4.53412Z"
            fill="#2A2A2A" />
      </svg>
      Back
    </div>
  </main>
</template>

<style scoped>

</style>