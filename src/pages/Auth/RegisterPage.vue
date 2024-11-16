<script setup>

import user from "@/app/api/User/user.js";
import {ref, watch} from "vue";
import {email, fullName, phone, password, username} from "@/app/validate/index.js";
import router from "@/router/router.js";

const RegisterModel = ref({
  email: "",
  password: "",
  phone: "",
  username: ""
});

watch(RegisterModel, () => {
  errors.value = {
    email: "",
    password: "",
    phone: "",
    username: ""
  }
}, { deep: true })


const errors = ref({
  email: "",
  password: "",
  phone: "",
  username: ""
})


const showPass = ref(false);
function validate(){
  errors.value = {
    email: email(RegisterModel.value.email) !== true ? email(RegisterModel.value.email) : '',
    password: password(RegisterModel.value.password) !== true ? password(RegisterModel.value.password) : '',
    phone: phone(RegisterModel.value.phone) !== true ? phone(RegisterModel.value.phone) : '',
    username: username(RegisterModel.value.username) !== true ? username(RegisterModel.value.username) : ''
  }
}

async function register(){
  validate();
  if(errors.value.email !== '' || errors.value.password !== '' || errors.value.phone !== '' || errors.value.username !== ''){
    return;
  }
  const response = await user.register(RegisterModel.value);
  if (response.status === 422) {
    const responseErrors = response.data.errors;
    for (const key in responseErrors) {
      errors.value[key] = responseErrors[key][0];
    }
  }
  if(response.status === 200){
    await router.push("/login")
  }
}

function showPassword(){
  showPass.value = !showPass.value;
}

</script>

<template>
  <main class="flex text-sm w-full  max-w-[380px] flex-col  gap-5 justify-center items-center">
    <div class="flex flex-col w-full gap-3 p-5 rounded-md border-primary">
      <h1 class="text-xl text-center">
        Create your account
      </h1>
      <div class="flex flex-col gap-[5px]">
        <label for="email">Username</label>
        <input v-model="RegisterModel.username" :class="{'error': errors.username !== ''}" class="px-3 py-[10px] border-primary  rounded-md" placeholder="Enter your username">
        <transition name="fade">
          <p v-if="errors.username !== ''" class="text-sm text-red_1">* {{errors.username}}</p>
        </transition>
      </div>
      <div class="flex flex-col gap-[5px]">
        <label for="email">Email</label>
        <input v-model="RegisterModel.email" :class="{'error': errors.email !== ''}" id="email" class="px-3 py-[10px] border-primary  rounded-md" placeholder="Enter your email">
        <transition name="fade">
          <p v-if="errors.email !== ''" class="text-sm text-red_1">* {{errors.email}}</p>
        </transition>
      </div>
      <div class="flex flex-col gap-[5px]">
        <label for="email">Phone number</label>
        <input v-model="RegisterModel.phone" :class="{'error': errors.phone !== ''}" class="px-3 py-[10px] border-primary  rounded-md" placeholder="Enter your phone number">
        <transition name="fade">
        <p v-if="errors.phone !== ''" class="text-sm text-red_1">* {{errors.phone}}</p>
        </transition>
      </div>
      <div class="flex flex-col gap-[5px]">
        <label for="Password">Password</label>
        <div :class="{'input-error': errors.password !== ''}" class="flex  justify-between border-primary px-3 py-[10px] items-center">
          <input :type="showPass ? 'text' : 'password'" v-model="RegisterModel.password"   class="flex-1" placeholder="Enter your password">
          <svg @click="showPassword" class="cursor-pointer" v-if="showPass" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
               fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3.41459 2.15328C3.19492 1.93361 2.83877 1.93361 2.6191 2.15328C2.39943 2.37295 2.39943 2.7291 2.6191 2.94877L14.9493 15.2789C15.1689 15.4986 15.5251 15.4986 15.7448 15.2789C15.9644 15.0593 15.9644 14.7031 15.7448 14.4835L13.806 12.5447C14.1472 12.3035 14.4726 12.0335 14.7784 11.7347C14.9403 11.5766 15.1217 11.4129 15.3083 11.2444C16.2395 10.4039 17.3019 9.44487 16.7254 8.47446C16.5687 8.21058 16.3318 7.97567 16.0969 7.7427C15.9172 7.56441 15.7386 7.38725 15.5979 7.19914C13.2611 4.07421 9.15486 3.19475 5.82204 4.56072L3.41459 2.15328ZM8.10101 6.83969L9.27675 8.01543C9.4614 8.11781 9.61422 8.27063 9.7166 8.45529L10.8923 9.63103C10.9507 9.43082 10.982 9.21906 10.982 9C10.982 7.75736 9.97467 6.75 8.73203 6.75C8.51297 6.75 8.30122 6.78131 8.10101 6.83969Z"
                  fill="#2A2A2A" fill-opacity="0.5"/>
            <path
                d="M2.82577 6.69268C3.13456 6.34187 3.46761 6.02455 3.8203 5.74074L6.54574 8.46618C6.5041 8.6373 6.48203 8.81607 6.48203 9C6.48203 10.2426 7.48939 11.25 8.73203 11.25C8.91596 11.25 9.09473 11.2279 9.26585 11.1863L11.6951 13.6155C8.58717 14.6645 4.92923 13.8672 2.65751 11.2238C2.50445 11.0457 2.32797 10.8735 2.15044 10.7004C1.6482 10.2104 1.13756 9.71235 1.12522 9.04811C1.11198 8.33502 1.6935 7.78903 2.25652 7.26041C2.458 7.07123 2.65713 6.88427 2.82577 6.69268Z"
                fill="#2A2A2A" fill-opacity="0.5"/>
          </svg>
          <svg @click="showPassword" class="cursor-pointer" v-else fill="#2A2A2A80" width="18" height="18"  viewBox="0 0 32 32" version="1.1"
               xmlns="http://www.w3.org/2000/svg" stroke="#2A2A2A80">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"><title>eye</title>
              <path
                  d="M30.941 15.177c-9.787-11.183-20.096-11.187-29.882 0-0.192 0.219-0.31 0.507-0.31 0.823s0.117 0.605 0.311 0.825l-0.001-0.001c4.893 5.591 9.919 8.427 14.939 8.427h0.001c5.021 0 10.047-2.836 14.941-8.427 0.192-0.219 0.309-0.507 0.309-0.823s-0.117-0.604-0.31-0.825l0.001 0.001zM3.682 16c8.299-8.961 16.336-8.961 24.637 0-8.301 8.961-16.34 8.961-24.637 0zM16 10.75c-2.899 0-5.25 2.351-5.25 5.25s2.351 5.25 5.25 5.25c2.899 0 5.25-2.351 5.25-5.25v0c-0.004-2.898-2.352-5.246-5.25-5.25h-0zM16 18.75c-1.519 0-2.75-1.231-2.75-2.75s1.231-2.75 2.75-2.75c1.519 0 2.75 1.231 2.75 2.75v0c-0.002 1.518-1.232 2.748-2.75 2.75h-0z"></path>
            </g>
          </svg>
        </div>
        <transition name="fade">
        <p v-if="errors.password !== ''" class="text-sm text-red_1">* {{errors.password}}</p>
        </transition>
      </div>
      <div class="flex flex-col gap-[10px]">
        <button @click="register"
            class="btn-primary">
          Continue
        </button>
        <div class="m-auto">
          <p class="text-black/50">Already have an account? <RouterLink to="/login" class="text-black transition-all  hover:text-black/70" >Log in</RouterLink></p>
        </div>

      </div>
    </div>

  </main>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.1s;
  transform: scale(1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.99);
}
</style>