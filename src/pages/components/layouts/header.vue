<script setup>

import {onMounted, ref, watchEffect} from "vue";
import user from "@/app/api/User/user.js";

const isAuth = ref(user.isAuth);

const userModel = ref({
  username: "",
  balance: 0
});
watchEffect(async () => {
  isAuth.value = user.isAuth;
  if (isAuth.value) {
    await user.getUser();
    userModel.value.username = user.username;
    userModel.value.balance = user.balance;
  }

});

const showMenu = ref(false);

function toggleMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <header class=" w-full pb-10 flex items-center justify-between">
    <RouterLink to="/" class="max-w-44 flex items-center w-full">
      <svg width="28px" height="28px" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M633.849 372.31L633.829 372.287C598.089 329.659 551.559 308.33 494.442 308.33C442.102 308.33 398.311 326.233 363.239 362.054C328.161 397.88 310.656 443.094 310.656 497.509C310.656 551.925 328.161 597.139 363.239 632.965C398.311 668.785 442.102 686.689 494.442 686.689C552.931 686.689 599.985 664.158 635.386 619.143C651.37 599.038 662.775 576.821 670.248 551.637L671.152 548.591H633.188L632.629 550.166C625.649 569.813 616.721 586.447 604.508 600.999C576.075 634.785 539.451 651.655 494.442 651.655C451.688 651.655 416.709 637.404 389.308 608.959C361.915 580.522 348.145 543.448 348.145 497.509C348.145 451.571 361.915 414.497 389.308 386.06C416.709 357.615 451.688 343.364 494.442 343.364C538.481 343.364 574.446 359.087 602.532 390.531C614.793 404.477 624.855 420.481 631.461 438.02L632.039 439.553H668.838L667.872 436.472C660.399 412.65 649.176 391.078 633.849 372.31Z"
            fill="black"/>
        <path
            d="M779.18 439.554H664.433L649.054 402.795H735.409C725.947 379.11 702.266 349.024 693.142 337.467C680.747 321.781 666.552 307.542 650.887 295.154C639.346 286.017 631.308 280.676 618.297 273.628V130.22C626.452 132.937 632.676 135.826 639.3 138.992C760.968 191.948 852.433 310.059 875 443.11H837.145C836.574 440.08 835.964 437.057 835.315 434.044C833.726 428.89 831.85 422.085 829.858 414.855L829.855 414.848C827.291 405.546 824.534 395.542 821.947 387.453C820.255 382.756 818.469 378.094 816.591 373.469C805.881 349.503 794.734 328.257 783.108 309.343C749.72 257.908 704.146 214.606 650.887 185.629V249.591C683.827 270.936 712.219 298.711 734.286 331.142C735.717 333.239 737.123 335.355 738.501 337.491C746.084 349.261 752.862 361.625 758.74 374.464C774.973 406.369 779.18 439.554 779.18 439.554Z"
            fill="black"/>
        <path
            d="M875 549.777C847.58 711.435 718.452 851.037 557.017 878.518C544.883 880.583 532.583 882.078 520.094 882.98C510.709 883.644 501.23 884 491.703 884C482.176 884 472.697 883.668 463.312 882.98C450.847 882.054 438.523 880.583 426.413 878.518V744.887C438.405 748.043 450.728 750.345 463.312 751.745C472.649 752.789 482.105 753.312 491.703 753.312C501.301 753.312 510.78 752.766 520.094 751.745C532.702 750.345 545.049 748.043 557.017 744.887C611.547 730.553 658.968 698.706 692.952 655.704C702.076 644.147 710.228 631.783 717.29 618.731H758.526C752.649 631.57 745.895 643.934 738.287 655.704C697.407 719.091 632.781 765.699 557.017 782.952C544.954 785.705 532.654 787.675 520.094 788.885C510.757 789.787 501.277 790.238 491.703 790.238C482.129 790.238 472.649 789.787 463.312 788.885V845.959C472.673 846.694 482.153 847.098 491.703 847.098C501.254 847.098 510.733 846.694 520.094 845.959C532.607 844.962 544.93 843.301 557.017 840.999C698.024 814.372 810.555 690.955 837.145 549.777H875Z"
            fill="black"/>
        <path d="M654.969 585.541H769.025C771.774 573.486 773.764 561.146 774.973 548.592H663.903L654.969 585.541Z"
              fill="black"/>
        <path
            d="M220.82 560.446H335.567L350.946 597.205H264.591C274.053 620.89 297.734 650.976 306.858 662.533C319.253 678.22 333.448 692.458 349.113 704.846C360.654 713.983 368.692 719.324 381.703 726.372V869.78C373.548 867.063 367.324 864.174 360.7 861.008C239.032 808.052 147.567 689.941 125 556.89H162.855C163.426 559.92 164.036 562.943 164.685 565.956C166.274 571.11 168.15 577.915 170.142 585.145L170.145 585.152C172.709 594.454 175.466 604.458 178.053 612.547C179.745 617.244 181.531 621.906 183.409 626.531C194.119 650.498 205.266 671.743 216.892 690.657C250.28 742.092 295.854 785.394 349.113 814.371V750.409C316.173 729.064 287.781 701.289 265.714 668.858C264.283 666.761 262.877 664.645 261.499 662.509C253.916 650.739 247.138 638.375 241.26 625.536C225.027 593.631 220.82 560.446 220.82 560.446Z"
            fill="black"/>
        <path
            d="M125 450.223C152.42 288.565 281.548 148.963 442.983 121.482C455.117 119.417 467.417 117.922 479.906 117.02C489.291 116.356 498.77 116 508.297 116C517.824 116 527.303 116.332 536.688 117.02C549.153 117.946 561.477 119.417 573.587 121.482V255.113C561.595 251.957 549.272 249.655 536.688 248.255C527.351 247.211 517.895 246.688 508.297 246.688C498.699 246.688 489.22 247.234 479.906 248.255C467.298 249.655 454.951 251.957 442.983 255.113C388.453 269.447 341.032 301.294 307.048 344.296C297.924 355.853 289.772 368.217 282.71 381.269H241.474C247.351 368.43 254.105 356.066 261.713 344.296C302.593 280.909 367.219 234.301 442.983 217.048C455.046 214.295 467.346 212.326 479.906 211.115C489.243 210.213 498.723 209.762 508.297 209.762C517.871 209.762 527.351 210.213 536.688 211.115V154.041C527.327 153.306 517.847 152.902 508.297 152.902C498.746 152.902 489.267 153.306 479.906 154.041C467.393 155.038 455.07 156.699 442.983 159.001C301.976 185.628 189.445 309.045 162.855 450.223H125Z"
            fill="black"/>
        <path d="M345.031 414.459H230.975C228.226 426.514 226.235 438.854 225.027 451.408H336.097L345.031 414.459Z"
              fill="black"/>
      </svg>
      CRL
    </RouterLink>
    <div class="flex max-md:hidden header-nav items-center gap-[10px]">
      <RouterLink to="https://testnet.crl.ac/ui/marketplace" class="hover:text-black/70 transition-all">
        Marketplace
      </RouterLink>
      <a href="" class="lock">
        Blog
      </a>
      <a href="" class="lock">
        Roadmap
      </a>
      <RouterLink to="/faq" class="hover:text-black/70 transition-all">
        FAQ
      </RouterLink>
      <a href="" class="lock">
        API
      </a>
    </div>
    <div v-if="isAuth" class="text-sm cursor-pointer flex gap-[10px] items-center">
      <div class=" border-primary  py-2 px-5 md:px-2 md:py-1">
        ${{ userModel.balance }}
      </div>
      <div class="md:hidden  flex-col relative p-3 border-primary">
        <svg @click="toggleMenu" width="18" height="16" viewBox="0 0 18 16" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M1 15H17Z" fill="#2A2A2A"/>
          <path d="M1 15H17" stroke="#2A2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 1H17Z" fill="#2A2A2A"/>
          <path d="M1 1H17" stroke="#2A2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 8H17Z" fill="#2A2A2A"/>
          <path d="M1 8H17" stroke="#2A2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <transition name="pulse">
          <div v-if="showMenu" class="relative  top-4">
            <div class="absolute w-[230px] -left-[200px]">
              <div class="flex bg-white rounded-lg items-end p-3 w-full flex-col p gap-4">
                <div @click="toggleMenu" class="flex justify-end items-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M0.5 10.25C0.5 4.86522 4.86522 0.5 10.25 0.5H11.75C17.1348 0.5 21.5 4.86522 21.5 10.25V11.75C21.5 17.1348 17.1348 21.5 11.75 21.5H10.25C4.86522 21.5 0.5 17.1348 0.5 11.75V10.25ZM6.75737 6.75739C7.05026 6.4645 7.52513 6.4645 7.81803 6.75739L11 9.93934L14.182 6.75733C14.4749 6.46444 14.9498 6.46444 15.2426 6.75733C15.5355 7.05022 15.5355 7.5251 15.2426 7.81799L12.0606 11L15.2426 14.182C15.5355 14.4749 15.5355 14.9498 15.2426 15.2427C14.9498 15.5356 14.4749 15.5356 14.182 15.2427L11 12.0607L7.81803 15.2426C7.52513 15.5355 7.05026 15.5355 6.75737 15.2426C6.46447 14.9497 6.46447 14.4748 6.75737 14.1819L9.93932 11L6.75737 7.81805C6.46447 7.52516 6.46447 7.05028 6.75737 6.75739Z"
                          fill="#2A2A2A"/>
                  </svg>
                </div>
                <RouterLink to="https://testnet.crl.ac/ui/profile" class=" text-lg text-black/70 hover:text-black flex items-center  gap-[5px]">
                  {{ userModel.username }}
                  <div class="avatar">
                    {{ userModel.username?.slice(0, 2) }}
                  </div>
                </RouterLink>
                <RouterLink to="https://testnet.crl.ac/ui/marketplace" class=" text-lg text-black/70 hover:text-black  transition-all">
                  Marketplace
                </RouterLink>
                <div class="lock text-lg text-black/20 ">
                  Blog
                </div>
                <div class="lock text-lg text-black/20  ">
                  Roadmap
                </div>
                <RouterLink to="/faq" class=" text-lg text-black/70 hover:text-black  transition-all">
                  FAQ
                </RouterLink>
                <a href="" class="lock text-lg text-black/20 ">
                  API
                </a>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <RouterLink to="https://testnet.crl.ac/ui/profile" class="hidden md:flex  items-center gap-[5px]">
        {{ userModel.username }}
        <div class="avatar">
          {{ userModel.username?.slice(0, 2) }}
        </div>
      </RouterLink>
    </div>
    <div v-else>
      <div class="hidden md:flex gap-2" >
        <RouterLink to="https://testnet.crl.ac/ui/auth/login" class="btn-border ">
          Log in
        </RouterLink>
        <RouterLink to="https://testnet.crl.ac/ui/auth/registration" class="btn-border ">
          Sign up
        </RouterLink>
      </div>
      <div class="md:hidden  flex-col relative p-3 border-primary">

        <svg @click="toggleMenu" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 15H17Z" fill="#2A2A2A"/>
          <path d="M1 15H17" stroke="#2A2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 1H17Z" fill="#2A2A2A"/>
          <path d="M1 1H17" stroke="#2A2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 8H17Z" fill="#2A2A2A"/>
          <path d="M1 8H17" stroke="#2A2A2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <transition name="pulse">
          <div v-if="showMenu" class="relative  top-4">
            <div class="absolute w-[230px] -left-[200px]">
              <div class="flex bg-white rounded-lg items-end p-3 w-full flex-col p gap-4">
                <div @click="toggleMenu" class="flex justify-end items-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 10.25C0.5 4.86522 4.86522 0.5 10.25 0.5H11.75C17.1348 0.5 21.5 4.86522 21.5 10.25V11.75C21.5 17.1348 17.1348 21.5 11.75 21.5H10.25C4.86522 21.5 0.5 17.1348 0.5 11.75V10.25ZM6.75737 6.75739C7.05026 6.4645 7.52513 6.4645 7.81803 6.75739L11 9.93934L14.182 6.75733C14.4749 6.46444 14.9498 6.46444 15.2426 6.75733C15.5355 7.05022 15.5355 7.5251 15.2426 7.81799L12.0606 11L15.2426 14.182C15.5355 14.4749 15.5355 14.9498 15.2426 15.2427C14.9498 15.5356 14.4749 15.5356 14.182 15.2427L11 12.0607L7.81803 15.2426C7.52513 15.5355 7.05026 15.5355 6.75737 15.2426C6.46447 14.9497 6.46447 14.4748 6.75737 14.1819L9.93932 11L6.75737 7.81805C6.46447 7.52516 6.46447 7.05028 6.75737 6.75739Z" fill="#2A2A2A"/>
                  </svg>
                </div>
                <div class="flex gap-2" >
                  <RouterLink to="https://testnet.crl.ac/ui/auth/login" class="btn-border ">
                    Log in
                  </RouterLink>
                  <RouterLink to="https://testnet.crl.ac/ui/auth/registration" class="btn-border ">
                    Sign up
                  </RouterLink>
                </div>
                <RouterLink to="https://testnet.crl.ac/ui/marketplace" class=" text-lg text-black/70 hover:text-black  transition-all">
                  Marketplace
                </RouterLink>
                <div class="lock text-lg text-black/20 ">
                  Blog
                </div>
                <div class="lock text-lg text-black/20  ">
                  Roadmap
                </div>
                <RouterLink to="/faq" class=" text-lg text-black/70 hover:text-black  transition-all">
                  FAQ
                </RouterLink>
                <a href="" class="lock text-lg text-black/20 ">
                  API
                </a>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

  </header>
</template>

<style scoped>
.pulse-enter-active, .pulse-leave-active {
  transition: all 0.1s;
  transform: scale(1);
}

.pulse-enter-from, .pulse-leave-to {
  opacity: 0;
  transform: scale(0.99);
}
</style>