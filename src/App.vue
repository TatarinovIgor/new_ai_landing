<script setup>

import Header from "@/pages/components/layouts/header.vue";
import Footer from "@/pages/components/layouts/footer.vue";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
const router = useRouter();
const page = router.currentRoute.value.path;
onMounted(() => {
  console.log(page)
})
console.log(page)
</script>

<template >
  <Header/>
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
  <Footer/>
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
