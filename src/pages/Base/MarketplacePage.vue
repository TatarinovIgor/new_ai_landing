<script setup>
import {onMounted, ref, watch} from "vue";
import apiClient from "@/app/api/Clients/apiClient.js";
import ItemModal from "@/modals/itemModal.vue";
import Modal from "@/app/modal/index.js";
import user from "@/app/api/User/user.js";
import apiAuthClient from "@/app/api/Clients/apiAuthClient.js";

const showFilter = ref(false);
const categories = ref([]);
const languages = ref([]);
const tags = ref([]);
const activeTab = ref('category');
const activeCategories = ref([]);
const activeTags = ref([]);
const activeLanguages = ref([]);
const products = ref([]);
const search = ref('');
let searchTimeout = null;
const showError = ref(false);
const image_url = import.meta.env.VITE_IMG_URL;
const product = ref(null);

function openModal(productData) {
  product.value = {...productData};
  modalItem.openModal()

}

const modalItem = new Modal("itemModal");


setTimeout(() => {
  showError.value = true;
}, 200);

function showFilterFunc() {
  showFilter.value = !showFilter.value;
}

function changeTab(tab) {
  activeTab.value = tab;
}

function addActiveCategory(category) {
  if (activeCategories.value.includes(category)) {
    activeCategories.value = activeCategories.value.filter((item) => item !== category);
  } else {
    activeCategories.value.push(category);
  }
}

function addActiveLanguage(language) {
  if (activeLanguages.value.includes(language)) {
    activeLanguages.value = activeLanguages.value.filter((item) => item !== language);
  } else {
    activeLanguages.value.push(language);
  }
}
function addActiveTag(tag) {
  if (activeTags.value.includes(tag)) {
    activeTags.value = activeTags.value.filter((item) => item !== tag);
  } else {
    activeTags.value.push(tag);
  }
}

onMounted(() => {
  getCategories();
  getLanguages();
  getTags();
  getProducts();

});

function getCategories() {
  apiClient.get('/categories/get').then((response) => {
    categories.value = response.data;
  }).catch((error) => {
    console.log(error);
  });
}

function getLanguages() {
  apiClient.get('/languages/get').then((response) => {
    languages.value = response.data;
  }).catch((error) => {
    console.log(error);
  });
}
function getTags() {
  apiClient.get('/tags/get').then((response) => {
    tags.value = response.data;
  }).catch((error) => {
    console.log(error);
  });
}

function getProducts() {
  const params = {
    search: search.value,
    categories: JSON.stringify(activeCategories.value),
    languages: JSON.stringify(activeLanguages.value),
    tags: JSON.stringify(activeTags.value)
  };
  apiAuthClient.get('/products/get', {params}).then((response) => {
    products.value = response.data;

  }).catch((error) => {
    console.log(error);
  });
}


watch(activeCategories, () => {
  getProducts();
}, {deep: true});
watch(activeTags, () => {
  getProducts();
}, {deep: true});


watch(activeLanguages, () => {
  getProducts();
}, {deep: true});

watch(search, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    getProducts();
  }, 300);
});

</script>

<template >
  <main class="flex  marketplace flex-col gap-10 w-full justify-start items-start h-full">
    <div class="flex h-full  w-full justify-center items-center relative flex-col ">
      <div class="flex max-w-[350px] w-full justify-center items-center gap-[10px]">
        <div class="border-primary text-sm max-w-[327px] w-full flex gap-1 items-center px-5 py-[10px]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M16.3125 8.4375C16.3125 12.1654 13.2904 15.1875 9.5625 15.1875C8.04285 15.1875 6.64049 14.6853 5.51232 13.8379C5.4966 13.8587 5.47925 13.8787 5.46025 13.8977L3.77275 15.5852C3.55308 15.8049 3.19692 15.8049 2.97725 15.5852C2.75758 15.3656 2.75758 15.0094 2.97725 14.7898L4.66475 13.1023C4.66799 13.099 4.67126 13.0958 4.67456 13.0927C3.52079 11.8816 2.8125 10.2423 2.8125 8.4375C2.8125 4.70958 5.83458 1.6875 9.5625 1.6875C13.2904 1.6875 16.3125 4.70958 16.3125 8.4375ZM15.1875 8.4375C15.1875 11.5441 12.6691 14.0625 9.5625 14.0625C6.4559 14.0625 3.9375 11.5441 3.9375 8.4375C3.9375 5.3309 6.4559 2.8125 9.5625 2.8125C12.6691 2.8125 15.1875 5.3309 15.1875 8.4375Z"
                  fill="#2A2A2A" fill-opacity="0.5"/>
          </svg>
          <input v-model="search" type="text" placeholder="Filter Tasks by name">
        </div>
        <div @click="showFilterFunc" :class="{'active': showFilter}"
             class="h-full p-3 btn-border cursor-pointer border-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
                d="M5.64845 2.25H12.3508C13.8003 2.25 14.8716 3.60048 14.5418 5.01193L14.2296 6.34818C14.1208 6.8138 13.8665 7.23265 13.5036 7.54398L12.1928 8.66842C11.4454 9.3096 11.0153 10.2453 11.0153 11.23V13.735C11.0153 14.1741 10.7598 14.573 10.361 14.7568L8.57973 15.5774C7.83435 15.9208 6.98401 15.3763 6.98401 14.5556V11.23C6.98401 10.2453 6.5539 9.3096 5.80647 8.66842L4.4957 7.54398C4.13278 7.23265 3.87848 6.8138 3.76969 6.34818L3.45747 5.01193C3.12767 3.60048 4.19898 2.25 5.64845 2.25Z"
            />
          </svg>

        </div>
      </div>
      <transition name="fade">
        <div v-if="showFilter" class="relative z-50  max-w-[350px] flex w-full justify-center items-start gap-[10px]">
          <div class="absolute pt-2  z-50 w-full">
            <div class="rounded-lg border-primary bg-background flex p-5 flex-col gap-5 w-full">
              <div class="flex gap-2.5 items-center flex-wrap">
                <button @click="changeTab('category')" class="btn-light-small flex items-center">Category
                  <div v-if="activeCategories.length > 0"
                       class="h-1 w-1 p-2 text-xs rounded-full flex items-center justify-center bg-white text-black">
                    {{ activeCategories.length }}
                  </div>
                </button>
                <button @click="changeTab('tags')" class="btn-light-small flex items-center">Tags
                  <div v-if="activeTags.length > 0"
                       class="h-1 w-1 p-2 text-xs rounded-full flex items-center justify-center bg-white text-black">
                    {{ activeTags.length }}
                  </div>
                </button>
                <button @click="changeTab('language')" class="btn-light-small flex items-center">Language
                  <div v-if="activeLanguages.length > 0"
                       class="h-1 w-1 p-2 text-xs rounded-full flex items-center justify-center bg-white text-black">
                    {{ activeLanguages.length }}
                  </div>
                </button>
              </div>
              <div class="flex gap-2.5 w-full items-center flex-wrap">
                <div :class="{'active': activeCategories.includes(category.id)}" @click="addActiveCategory(category.id)"
                     v-if="activeTab === 'category'" v-for="category in categories" class="tag select-none">
                  <img :src="category.svg" alt="" srcset="">
                  {{ category.name }}
                  <transition name="fade">
                    <div v-if="activeCategories.includes(category.id)">
                      <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M0.875 6.0625C0.875 2.92138 3.42138 0.375 6.5625 0.375H7.4375C10.5786 0.375 13.125 2.92138 13.125 6.0625V6.9375C13.125 10.0786 10.5786 12.625 7.4375 12.625H6.5625C3.42138 12.625 0.875 10.0786 0.875 6.9375V6.0625ZM4.52513 4.02514C4.69598 3.85429 4.97299 3.85429 5.14385 4.02514L6.99999 5.88128L8.85616 4.02511C9.02701 3.85425 9.30402 3.85425 9.47488 4.02511C9.64573 4.19596 9.64573 4.47297 9.47488 4.64383L7.6187 6.5L9.47488 8.35617C9.64573 8.52703 9.64573 8.80404 9.47488 8.97489C9.30402 9.14575 9.02701 9.14575 8.85616 8.97489L6.99999 7.11872L5.14385 8.97486C4.97299 9.14571 4.69598 9.14571 4.52513 8.97486C4.35428 8.804 4.35428 8.52699 4.52513 8.35614L6.38127 6.5L4.52513 4.64386C4.35428 4.47301 4.35428 4.196 4.52513 4.02514Z"
                              fill="#F7F7F3"/>
                      </svg>

                    </div>
                  </transition>

                </div>
                <div :class="{'active': activeLanguages.includes(language.id)}" @click="addActiveLanguage(language.id)"
                     v-if="activeTab === 'language'" v-for="language in languages" class="tag select-none">
                  {{ language.name }}
                  <transition name="fadeSlow">
                    <div v-if="activeLanguages.includes(language.id)">
                      <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M0.875 6.0625C0.875 2.92138 3.42138 0.375 6.5625 0.375H7.4375C10.5786 0.375 13.125 2.92138 13.125 6.0625V6.9375C13.125 10.0786 10.5786 12.625 7.4375 12.625H6.5625C3.42138 12.625 0.875 10.0786 0.875 6.9375V6.0625ZM4.52513 4.02514C4.69598 3.85429 4.97299 3.85429 5.14385 4.02514L6.99999 5.88128L8.85616 4.02511C9.02701 3.85425 9.30402 3.85425 9.47488 4.02511C9.64573 4.19596 9.64573 4.47297 9.47488 4.64383L7.6187 6.5L9.47488 8.35617C9.64573 8.52703 9.64573 8.80404 9.47488 8.97489C9.30402 9.14575 9.02701 9.14575 8.85616 8.97489L6.99999 7.11872L5.14385 8.97486C4.97299 9.14571 4.69598 9.14571 4.52513 8.97486C4.35428 8.804 4.35428 8.52699 4.52513 8.35614L6.38127 6.5L4.52513 4.64386C4.35428 4.47301 4.35428 4.196 4.52513 4.02514Z"
                              fill="#F7F7F3"/>
                      </svg>

                    </div>
                  </transition>

                </div>
                <div :class="{'active': activeTags.includes(tag.id)}" @click="addActiveTag(tag.id)"
                     v-if="activeTab === 'tags'" v-for="tag in tags" class="tag select-none">
                  {{ tag.name }}
                  <transition name="fadeSlow">
                    <div v-if="activeTags.includes(tag.id)">
                      <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M0.875 6.0625C0.875 2.92138 3.42138 0.375 6.5625 0.375H7.4375C10.5786 0.375 13.125 2.92138 13.125 6.0625V6.9375C13.125 10.0786 10.5786 12.625 7.4375 12.625H6.5625C3.42138 12.625 0.875 10.0786 0.875 6.9375V6.0625ZM4.52513 4.02514C4.69598 3.85429 4.97299 3.85429 5.14385 4.02514L6.99999 5.88128L8.85616 4.02511C9.02701 3.85425 9.30402 3.85425 9.47488 4.02511C9.64573 4.19596 9.64573 4.47297 9.47488 4.64383L7.6187 6.5L9.47488 8.35617C9.64573 8.52703 9.64573 8.80404 9.47488 8.97489C9.30402 9.14575 9.02701 9.14575 8.85616 8.97489L6.99999 7.11872L5.14385 8.97486C4.97299 9.14571 4.69598 9.14571 4.52513 8.97486C4.35428 8.804 4.35428 8.52699 4.52513 8.35614L6.38127 6.5L4.52513 4.64386C4.35428 4.47301 4.35428 4.196 4.52513 4.02514Z"
                              fill="#F7F7F3"/>
                      </svg>

                    </div>
                  </transition>

                </div>

              </div>
            </div>

          </div>

        </div>
      </transition>
    </div>
  <div class="h-[calc(100vh-20vh)] flex justify-start  items-start text-center w-full">
    <div v-if="products.length !== 0"
         class="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div @click="openModal(product)" v-for="product in products" data-modal-open="#itemModal" class="card-container ">
        <div :style="{backgroundImage: `url(${(image_url + product.image)})` }" class="h-32 image-container relative">
          <div
              class="card-icon">
            <img :src="image_url + product.category.svg" class="max-h-3 max-w-3">
          </div>
        </div>
        <div class="card-actions">
          <div class="flex w-full justify-between">
            <div class="flex items-center gap-1 ">
              <img :src="image_url + product.category.svg" class="max-h-3 max-w-3">
              <p class="ibm-plex-mono-medium text-sm ">
                <span class="opacity-20">{{product.category.name}}/</span>{{ product.name }}
              </p>

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
          <p class="opacity-80">
            {{ product.description }}
          </p>
          <div class="flex max-md:flex-col gap-[10px]">
            <button class="flex items-center justify-between flex-1 p-[10px] rounded-md border-primary">
              <p class="opacity-50 text-sm">
                Buy out
              </p>
              <p>${{ product.buyout_price }}</p>
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

    </div>
    <div class="min-h-72 m-auto" v-else-if="products.length === 0 && showError">
      <h1 class=" text-center lg:text-[88px] animateUp fast  xl:text-8xl uppercase font-geforce text-5xl">
        Products not found
      </h1>
    </div>
  </div>
  </main>
  <ItemModal v-model="product"></ItemModal>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.02s;
  transform: scale(1);
}

.fade-enter-from, .fade-leave-to {
  transform: scale(0.99);
}

.fadeSlow-enter-active, .fadeSlow-leave-active {
  transition: all 0.3s;
  transform: scale(1);
}

.fadeSlow-enter-from, .fadeSlow-leave-to {
  transform: scale(0.99);
}


</style>