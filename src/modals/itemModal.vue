<script setup>
import {onMounted, ref, watch} from "vue";
import {defineProps, defineEmits} from "vue";

import user from "@/app/api/User/user.js";
import apiAuthClient from "@/app/api/Clients/apiAuthClient.js";
import {useRouter} from "vue-router";

const image_url = import.meta.env.VITE_IMG_URL;
const props = defineProps({
  modelValue: Object
});
const domain = import.meta.env.VITE_DOMAIN;
const router = useRouter();
const emit = defineEmits(["update:modelValue"]);
const product = ref({...props.modelValue});
const error = ref(null);

const loading = ref(false);
const dropbox = ref(null);
const isDragging = ref(false);
const procent = ref(0);
const step = ref(0);
const files = ref(null)
const output_file = ref(null);

function toStep(value){

  step.value = value;
}
function handleDragOver(event) {
  event.preventDefault();
  isDragging.value = true;
}
function handleFileChange(event) {
  files.value = event.target.files;
}
function handleDragLeave() {
  isDragging.value = false;
}

function handleDrop(event) {
  event.preventDefault();
  isDragging.value = false;
  files.value = event.dataTransfer.files;
}
watch(step ,  async (newValue) => {
  await getProduct();
  error.value = null;
  if(newValue === 0){
    files.value = null;
  }
  if(newValue === 1){
    procent.value = 0;
    loading.value = true;
    const interval = setInterval(async ()=>{
      procent.value += 0.2;
      if(procent.value >= 100){
        clearInterval(interval);
      }
    }, 2);
  }
}, {deep: true})
watch(files,async (newValue) => {

  if(dropbox.value.length === 0){
    return;
  }
  const response = await use();
  if(response.status === 422){
    const responseErrors = response.data.errors;
    error.value = responseErrors[Object.keys(responseErrors)[0]][0];
    return
  }
  step.value = 1;
  loading.value = true;
  const interval = setInterval(async ()=>{
    procent.value += 0.2;
    if(procent.value >= 100){
      clearInterval(interval);
    }
  }, 2)
}, {deep: true})
watch(procent, (newValue) => {
  if(newValue >= 100){
    loading.value = false;
    setTimeout(()=>{
      step.value = 2;
      procent.value = 0;
    }, 500)
  }
}, {deep: true})
watch(() => props.modelValue, (newValue) => {
  product.value = {...newValue};
  console.log(product.value);
}, {deep: true});

function hexToRgb(hex, opacity = 0.2) {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}

async function buy(){
  if(!user.isAuth) {
    router.push('/login')
    return;
  }
  const response = await user.buyProduct(product.value.id)
  if (response.status === 422) {
    const responseErrors = response.data.errors;
    error.value = responseErrors[Object.keys(responseErrors)[0]][0];
  }
  if (response.status === 400) {
    error.value = response.data.message;
  }
  if(response.status === 200){
    getProduct()
  }
}

async function getProduct(){
  const response = await user.getProduct(product.value.id)
  if(response.status === 200){
    product.value = response.data;
  }
}
async function use(){
  const response = await user.useProduct(product.value.id, files.value[0])
  if (response.status === 422) {
    const responseErrors = response.data.errors;
    error.value = responseErrors[Object.keys(responseErrors)[0]];
  }
  if (response.status === 400) {
    error.value = response.data.message;
  }
  if(response.status === 200){
    output_file.value = response.data.output_file_path;
    step.value = 1;
  }
}
</script>

<template>
  <div id="itemModal" style="padding: 0; !important;" class="modal   border-0 max-w-[770px]">
    <div class="flex flex-col relative gap-5 ">
      <div class="flex flex-col gap-2.5">
        <div :style="{backgroundImage: `url(${(image_url + product.image)})` }"
             class="flex bg-center bg-cover bg-no-repeat justify-center items-center h-[130px]">
          <div class="h-32 image-container relative">
            <div class="card-icon">
              <img :src="image_url + product?.category?.svg" class="max-h-3 max-w-3">
            </div>
          </div>
        </div>
        <div class="flex flex-col px-12 gap-2.5 ">
          <div class="flex w-full justify-between">
            <div class="flex items-center gap-1 ">
              <img :src="image_url + product?.category?.svg" class="max-h-3 max-w-3">
              <div class="flex gap-5 items-center">
                <p class="ibm-plex-mono-medium text-sm ">
                  <span class="opacity-20">{{product?.category?.name}}/</span>{{ product?.name }}
                </p>
                <p class="text-black/50 text-sm">
                  {{ product.description }}
                </p>
              </div>

            </div>
            <div class="flex opacity-50 items-center gap-1 ">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                   fill="none">
                <path
                    d="M4.9299 2.16798C5.26667 1.13151 6.733 1.13151 7.06977 2.16798L7.43111 3.28007C7.58172 3.74359 8.01367 4.05742 8.50105 4.05742H9.67037C10.7602 4.05742 11.2133 5.45199 10.3316 6.09257L9.38563 6.77987C8.99133 7.06635 8.82634 7.57413 8.97695 8.03766L9.33829 9.14974C9.67506 10.1862 8.48877 11.0481 7.60709 10.4075L6.66109 9.72023C6.2668 9.43375 5.73288 9.43375 5.33858 9.72023L4.39258 10.4075C3.5109 11.0481 2.32461 10.1862 2.66138 9.14974L3.02272 8.03766C3.17333 7.57413 3.00834 7.06635 2.61404 6.77987L1.66805 6.09257C0.786369 5.45199 1.23949 4.05742 2.3293 4.05742H3.49862C3.986 4.05742 4.41795 3.74359 4.56856 3.28007L4.9299 2.16798Z"
                    fill="#2A2A2A"/>
              </svg>
              <p class=" text-sm ">
                {{ product.stars }}/5
              </p>

            </div>
          </div>
          <div class="flex gap-3 items-center flex-wrap">
            <div v-for="tag in product?.tags" :style="{backgroundColor: hexToRgb(tag.color), color: tag.color}"
                 class="w-fit rounded-full flex text-xs font-medium  px-2 py-1 gap-1 items-center bg-opacity-20">
              <img :src="image_url + tag.img" class="max-h-3 max-w-3">
              {{ tag.name }}
            </div>
          </div>
          <div class="flex gap-3 items-center flex-wrap">
            <a download :href="image_url + file" v-for="file in product?.files" class="border-primary btn-border py-2.5 px-3.5 flex items-center gap-2">
              {{ file }}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" >
                <path d="M5.62508 8.15632C5.00376 7.69033 4.87784 6.80889 5.34383 6.18757C5.41406 6.09393 5.49373 5.99876 5.58053 5.90625H4.78125C2.91729 5.90625 1.40625 7.41729 1.40625 9.28125V12.6562C1.40625 14.5202 2.91729 16.0312 4.78125 16.0312H12.6562C14.5202 16.0312 16.0312 14.5202 16.0312 12.6562V9.28125C16.0312 7.41729 14.5202 5.90625 12.6562 5.90625H11.8571C11.9439 5.99876 12.0236 6.09393 12.0938 6.18757C12.5598 6.80889 12.4339 7.69033 11.8126 8.15632L9.56258 9.84382C9.06258 10.2188 8.37508 10.2188 7.87508 9.84382L5.62508 8.15632Z"   />
                <path d="M9.28125 1.96875C9.28125 1.65809 9.02941 1.40625 8.71875 1.40625C8.40809 1.40625 8.15625 1.65809 8.15625 1.96875V7.59372L6.80628 6.58125C6.55775 6.39485 6.20518 6.44522 6.01878 6.69375C5.83239 6.94228 5.88275 7.29485 6.13128 7.48125L8.38128 9.16875C8.58128 9.31875 8.85628 9.31875 9.05628 9.16875L11.3063 7.48125C11.5548 7.29485 11.6052 6.94228 11.4188 6.69375C11.2324 6.44522 10.8798 6.39485 10.6313 6.58125L9.28125 7.59377V1.96875Z" />
              </svg>
            </a>
          </div>
          <div v-if="error !== ''" class="error text-sm text-red_1">
            {{ error }}
          </div>
          <div class="flex  gap-[10px]">
            <button class="flex items-center justify-between flex-1 p-[10px] rounded-md border-primary">
              <p class="opacity-50 text-sm">
                Buy out
              </p>
              <p>${{product.buyout_price}}</p>
            </button>
            <button v-if="price === 0"
                    class="bg-green bg-opacity-20 flex items-center justify-between flex-1 p-[10px] rounded-md border-primary">
              <p class="opacity-50 text-green  text-sm">
                Use
              </p>
              <p class="text-green">Try for free</p>
            </button>
            <button v-else class="flex items-center justify-between flex-1 p-[10px] rounded-md border-primary">
              <p class="opacity-50 text-sm">
                Use
              </p>
              <p>${{ product.price }}</p>
            </button>
          </div>
        </div>
      </div>
      <div class="px-12 pb-5">

        <div v-if="step !== 2"  class="flex  h-[270px] border-primary justify-center items-center w-full bg-bg_card/5">
          <div v-if="step === 0"  class="relative w-full h-full">
            <label   for="upload_file"
                ref="dropbox"
                @dragover="handleDragOver"
                @dragleave="handleDragLeave"
                @drop="handleDrop"
                :class="{'bg-bg_card': isDragging ,'blur': product.quality === 0}"
                class="dropbox hover:bg-bg_card h-full w-full transition-all cursor-pointer flex justify-center items-center">
              <div class="flex  flex-col  gap-2.5 items-center">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M15.1875 12.375H10.125C6.39708 12.375 3.375 15.3971 3.375 19.125V25.875C3.375 29.6029 6.39708 32.625 10.125 32.625H25.875C29.6029 32.625 32.625 29.6029 32.625 25.875V19.125C32.625 15.3971 29.6029 12.375 25.875 12.375H20.8125V18C20.8125 19.5533 19.5533 20.8125 18 20.8125C16.4467 20.8125 15.1875 19.5533 15.1875 18V12.375Z"
                      fill="#2A2A2A"/>
                  <path
                      d="M12.8251 6.975C12.328 7.34779 12.2273 8.05294 12.6001 8.55C12.9729 9.04706 13.678 9.14779 14.1751 8.775L16.875 6.75005V18C16.875 18.6213 17.3787 19.125 18 19.125C18.6213 19.125 19.125 18.6213 19.125 18V6.74995L21.8251 8.775C22.3221 9.14779 23.0273 9.04706 23.4001 8.55C23.7729 8.05294 23.6721 7.34779 23.1751 6.975L18.6751 3.6C18.2751 3.3 17.7251 3.3 17.3251 3.6L12.8251 6.975Z"
                      fill="#2A2A2A"/>
                </svg>
                Upload or drop a file right here
                <p class="text-sm text-black/50"></p>
                <input :disabled="product.quality === 0" @change="handleFileChange" id="upload_file" type="file" class="hidden">
              </div>
            </label>
            <button @click="buy" v-if="product.quality === 0"
                    class="absolute text-nowrap left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex text-white text-sm py-[10px] active:opacity-100 gap-[5px] px-[10px] bg-black items-center rounded-md transition-all hover:opacity-75">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                <path d="M3.375 3.875C2.13236 3.875 1.125 4.88236 1.125 6.125L16.875 6.125C16.875 4.88236 15.8676 3.875 14.625 3.875H3.375Z" fill="white"/>
                <path d="M16.875 7.25H1.125V12.875C1.125 14.1176 2.13236 15.125 3.375 15.125H14.625C15.8676 15.125 16.875 14.1176 16.875 12.875V7.25Z" fill="white"/>
              </svg>
              Buy 1 use <span class="text-white/20">$0.1</span>
            </button>
          </div>
          <div v-if="step === 1" class="">
            <div class="flex w-full  flex-col  gap-2.5  items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="33" viewBox="0 0 28 33" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 0.75C3.52208 0.75 0.5 3.77208 0.5 7.5V25.5C0.5 29.2279 3.52208 32.25 7.25 32.25H20.75C24.4779 32.25 27.5 29.2279 27.5 25.5V10.4693C27.5 8.57727 26.7059 6.77206 25.3111 5.49355L22.0719 2.52421C20.827 1.38305 19.1995 0.75 17.5107 0.75H7.25ZM18.5 4.125C18.5 3.50368 17.9963 3 17.375 3C16.7537 3 16.25 3.50368 16.25 4.125V8.625C16.25 10.489 17.761 12 19.625 12H24.125C24.7463 12 25.25 11.4963 25.25 10.875C25.25 10.2537 24.7463 9.75 24.125 9.75H19.625C19.0037 9.75 18.5 9.24632 18.5 8.625V4.125Z" fill="#2A2A2A"/>
              </svg>
              {{files[0].name}}
              <p class="text-sm text-black/50"></p>
              <input id="upload_file" type="file" class="hidden">
              <div class="max-w-[230px] w-full bg-black/5 rounded-full h-1.5">
                <div :style="{width: procent + '%'}" class="bg-black rounded-full h-1.5">

                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step === 2" class="flex w-full gap-5 h-[270px] items-center">
          <div class="border-primary w-full rounded-lg flex-1 h-full flex justify-center items-center">
            <div class="flex  flex-col  gap-1 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="33" viewBox="0 0 27 33" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 0.75C3.02208 0.75 0 3.77208 0 7.5V25.5C0 29.2279 3.02208 32.25 6.75 32.25H20.25C23.9779 32.25 27 29.2279 27 25.5V10.4693C27 8.57727 26.2059 6.77206 24.8111 5.49355L21.5719 2.52421C20.327 1.38305 18.6995 0.75 17.0107 0.75H6.75ZM18 4.125C18 3.50368 17.4963 3 16.875 3C16.2537 3 15.75 3.50368 15.75 4.125V8.625C15.75 10.489 17.261 12 19.125 12H23.625C24.2463 12 24.75 11.4963 24.75 10.875C24.75 10.2537 24.2463 9.75 23.625 9.75H19.125C18.5037 9.75 18 9.24632 18 8.625V4.125Z" fill="#2A2A2A"/>
              </svg>
              {{files[0].name}}
              <p class="text-sm text-black/50">Input data</p>
              <input  @change="handleFileChange" id="upload_file" type="file" class="hidden" accept=".json,.csv">
            </div>
          </div>
          <div class="border-primary w-full rounded-lg flex-1 h-full flex justify-center items-center ">
            <div class="flex  flex-col  gap-2.5 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
                <path d="M10.8953 23.6312C10.8953 23.0099 11.399 22.5062 12.0203 22.5062H14.8173C15.4386 22.5062 15.9423 22.0025 15.9423 21.3812C15.9423 20.7599 15.4386 20.2562 14.8173 20.2562H12.0203C10.6641 20.2562 9.49478 21.0561 8.95831 22.2098C8.55522 21.8997 7.97796 21.8937 7.56524 22.2276C7.08222 22.6184 7.00747 23.3268 7.39828 23.8098L8.87614 25.6364C9.07547 25.897 9.38616 26.0679 9.73715 26.0781C9.99687 26.086 10.2606 26.0044 10.4784 25.8281C10.7629 25.598 10.9057 25.2577 10.8953 24.9181V23.6312Z" fill="#2A2A2A"/>
                <path d="M12.607 25.8689C12.607 26.4902 12.1033 26.9939 11.482 26.9939H8.68497C8.06365 26.9939 7.55997 27.4976 7.55997 28.1189C7.55997 28.7402 8.06365 29.2439 8.68497 29.2439H11.482C12.8381 29.2439 14.0075 28.444 14.544 27.2903C14.947 27.6004 15.5243 27.6064 15.937 27.2725C16.42 26.8816 16.4948 26.1733 16.104 25.6903L14.6261 23.8637C14.4268 23.6031 14.1161 23.4322 13.7651 23.422C13.5054 23.4141 13.2417 23.4957 13.0239 23.6719C12.7394 23.9021 12.5965 24.2424 12.607 24.5819V25.8689Z" fill="#2A2A2A"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9C5 5.27208 8.02208 2.25 11.75 2.25H22.0107C23.6995 2.25 25.327 2.88305 26.5719 4.02421L29.8111 6.99355C31.2059 8.27206 32 10.0773 32 11.9693V27C32 30.7279 28.9779 33.75 25.25 33.75H9.5C5.77208 33.75 2.75 30.7279 2.75 27V22.5C2.75 20.5009 3.61906 18.7047 5 17.4688V9ZM21.875 4.5C22.4963 4.5 23 5.00368 23 5.625V10.125C23 10.7463 23.5037 11.25 24.125 11.25H28.625C29.2463 11.25 29.75 11.7537 29.75 12.375C29.75 12.9963 29.2463 13.5 28.625 13.5H24.125C22.261 13.5 20.75 11.989 20.75 10.125V5.625C20.75 5.00368 21.2537 4.5 21.875 4.5ZM9.5 18C7.01472 18 5 20.0147 5 22.5V27C5 29.4853 7.01472 31.5 9.5 31.5H14C16.4853 31.5 18.5 29.4853 18.5 27V22.5C18.5 20.0147 16.4853 18 14 18H9.5Z" fill="#2A2A2A"/>
              </svg>
              {{files[0].name + ' - output'}}
              <p class="text-sm text-black/50">Output data</p>
              <a :href="domain + output_file" download class="btn-primary flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                  <path d="M6.12508 8.15632C5.50376 7.69033 5.37784 6.80889 5.84383 6.18757C5.91406 6.09393 5.99373 5.99876 6.08053 5.90625H5.28125C3.41729 5.90625 1.90625 7.41729 1.90625 9.28125V12.6562C1.90625 14.5202 3.41729 16.0312 5.28125 16.0312H13.1562C15.0202 16.0312 16.5312 14.5202 16.5312 12.6562V9.28125C16.5312 7.41729 15.0202 5.90625 13.1562 5.90625H12.3571C12.4439 5.99876 12.5236 6.09393 12.5938 6.18757C13.0598 6.80889 12.9339 7.69033 12.3126 8.15632L10.0626 9.84382C9.56258 10.2188 8.87508 10.2188 8.37508 9.84382L6.12508 8.15632Z" fill="white"/>
                  <path d="M9.78125 1.96875C9.78125 1.65809 9.52941 1.40625 9.21875 1.40625C8.90809 1.40625 8.65625 1.65809 8.65625 1.96875V7.59372L7.30628 6.58125C7.05775 6.39485 6.70518 6.44522 6.51878 6.69375C6.33239 6.94228 6.38275 7.29485 6.63128 7.48125L8.88128 9.16875C9.08128 9.31875 9.35628 9.31875 9.55628 9.16875L11.8063 7.48125C12.0548 7.29485 12.1052 6.94228 11.9188 6.69375C11.7324 6.44522 11.3798 6.39485 11.1313 6.58125L9.78125 7.59377V1.96875Z" fill="white"/>
                </svg>
                Download
              </a>
              <p class="text-sm text-black/50">or upload <a @click="toStep(0)" class="underline">
                a new file
              </a></p>
              <input @change="handleFileChange" id="upload_file" type="file" class="hidden">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>