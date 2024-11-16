<script setup>
import {onMounted, ref, watch} from "vue";
import user from "@/app/api/User/user.js";
import DepositModal from "@/modals/DepositModal.vue";
import Modal from "@/app/modal/index.js";

function toggleAnswer(event) {
  if (event.target.closest('.question')) {
    const faq = event.currentTarget;
    faq.classList.toggle('show');
  }
}

const successChange = ref(false)

const userModel = ref({
    name: null,
    email: null,
    username: null,
    balance: 0,
    bill_email: null,
    country: null,
    phone: null,
    address1: null,
    address2: null,
    city: null,
    zip: null,
    state: null,
})

onMounted(async () => {
    await user.getUser()
    userModel.value.name = user.name
    userModel.value.email = user.email
    userModel.value.username = user.username
    userModel.value.balance = user.balance
    userModel.value.bill_email = user.bill_email
    userModel.value.country = user.country
    userModel.value.address1 = user?.address?.address1
    userModel.value.address2 = user?.address?.address2
    userModel.value.city = user.city
    userModel.value.zip = user.zip
    userModel.value.state = user.state
    userModel.value.phone = user.phone

  const modals = [new Modal("DepositModal")];
  modals.forEach(modal => modal.init());
})
watch(userModel, () => {
    successChange.value = false
}, {deep: true});

async function saveChanges() {
    const response = await user.changeInfoUser(userModel.value)
    if (response.status === 200) {
        successChange.value = true
    }
}
</script>

<template>
  <main class="max-w-[770px]  w-full flex flex-col gap-5 ">
    <div class="flex max-md:flex-col gap-5 ">
      <div class="px-5 py-8 flex-1 border-primary rounded-md">
        <div class="flex gap-5 items-center">
          <div class="avatar big">
            TN
          </div>
          <div class="flex flex-col gap-[5px]">
            <h1 class="font-medium">{{userModel.username}}</h1>
            <p class="text-sm">{{ userModel.email }}</p>
            <p class="text-sm">{{ userModel.phone }}</p>

          </div>
        </div>
      </div>
      <div class="px-5 py-5 flex-1 border-primary rounded-md">
        <div class="flex gap-5 items-center">
          <div class="flex flex-col gap-[5px]">
            <p class="font-medium">Balance</p>
            <p class="text-2xl font-medium">${{userModel.balance}}</p>
            <button
                class="open-DepositModal flex text-white text-sm py-[5px] gap-[5px] px-[10px] bg-black items-center rounded-md transition-all active:translate-y-1 hover:translate-y-0.5 hover:shadow-2xl">
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M0.875 6.0625C0.875 2.92138 3.42138 0.375 6.5625 0.375H7.4375C10.5786 0.375 13.125 2.92138 13.125 6.0625V6.9375C13.125 10.0786 10.5786 12.625 7.4375 12.625H6.5625C3.42138 12.625 0.875 10.0786 0.875 6.9375V6.0625ZM3.5 6.5C3.5 6.25838 3.69588 6.0625 3.9375 6.0625H6.5625V3.4375C6.5625 3.19588 6.75838 3 7 3C7.24162 3 7.4375 3.19588 7.4375 3.4375V6.0625H10.0625C10.3041 6.0625 10.5 6.25838 10.5 6.5C10.5 6.74162 10.3041 6.9375 10.0625 6.9375H7.4375V9.5625C7.4375 9.80412 7.24162 10 7 10C6.75838 10 6.5625 9.80412 6.5625 9.5625V6.9375H3.9375C3.69588 6.9375 3.5 6.74162 3.5 6.5Z"
                      fill="white" />
              </svg>
              Top-up
            </button>

          </div>

        </div>
      </div>
    </div>
    <div @click="toggleAnswer" class="cursor-pointer faq border-primary flex flex-col p-5 w-full">
      <div class="question flex text-xl justify-between rounded-md  w-full items-center">
        <div class="flex items-center gap-[10px]">
          <p class="text-base">
            Billing
          </p>
        </div>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.2">
            <path
                d="M13.5726 16.4985L17.7077 11.2356C18.7388 9.92339 17.8039 8 16.1351 8L7.86493 8C6.19606 8 5.26123 9.92339 6.29229 11.2356L10.4274 16.4985C11.2281 17.5176 12.7719 17.5176 13.5726 16.4985Z"
                fill="#2A2A2A" />
          </g>
        </svg>


      </div>
      <div class="answer border-primary border-x-0 bottom-b-0">
        <div class="flex text-sm flex-col gap-[10px]">
          <div class="flex flex-col gap-[5px]">
            <label for="name">Your name</label>
            <input v-model="userModel.name" type="text" id="name" placeholder="Enter your name"
                   class="border-primary rounded-md px-[15px] py-[10px]">
          </div>
          <div class="flex flex-col gap-[5px]">
            <label for="email">Billing email</label>
            <input v-model="userModel.bill_email" type="text" id="email" placeholder="Enter your billing email"
                   class="border-primary rounded-md px-[15px] py-[10px]">
          </div>
          <div class="flex flex-col gap-[5px]">
            <label for="country">Your address</label>
            <input v-model="userModel.country" type="text" id="country" placeholder="Country"
                   class="border-primary rounded-md px-[15px] py-[10px]">
            <input v-model="userModel.address1" type="text" placeholder="Address line 1"
                   class="border-primary rounded-md px-[15px] py-[10px]">
            <input v-model="userModel.address2" type="text" placeholder="Address line 2"
                   class="border-primary rounded-md px-[15px] py-[10px]">
            <div class="flex gap-[5px] items-center">
              <input v-model="userModel.city" type="text" placeholder="City"
                     class="border-primary flex-1 rounded-md px-[15px] py-[10px]">
              <input v-model="userModel.zip" type="text" placeholder="Postal Code"
                     class="border-primary flex-1 rounded-md px-[15px] py-[10px]">
            </div>
            <input v-model="userModel.state" type="text" placeholder="State, country, province or region"
                   class="border-primary flex-1 rounded-md px-[15px] py-[10px]">
            <button @click="saveChanges" :class="{'bg-green': successChange, 'text-white': successChange}"
                class="flex border-primary w-fit text-black/50 text-sm py-[5px] gap-[5px] px-[10px] hover:bg-black items-center rounded-md transition-all  hover:shadow-2xl hover:text-white">
              {{ successChange ? 'Changes saved' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="px-5 w-full py-8 flex-1 border-primary rounded-md">
      <div class="flex flex-col gap-7 justify-start items-start">
        <p class="font-medium">Transactions</p>
        <table class="w-full text-sm">
          <thead class="text-black/50 border-primary border-x-0 border-t-0 ">
          <tr>
            <th class="text-start  py-[10px] font-medium">Type</th>
            <th class="text-start font-medium">Amount</th>
            <th class="text-start font-medium">Date</th>
            <th class="text-end font-medium">Invoice</th>
          </tr>
          </thead>
          <tbody>
<!--          <tr class="border-primary border-x-0 border-t-0">-->
<!--            <td class="text-start w-1/3 py-[10px]">-->
<!--              <div class="flex gap-2 items-center">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"-->
<!--                     fill="none">-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                        d="M3.21283 3.32728C2.76718 3.62759 2.5 4.12982 2.5 4.66721V13H2C1.72386 13 1.5 13.2239 1.5 13.5C1.5 13.7761 1.72386 14 2 14H14C14.2761 14 14.5 13.7761 14.5 13.5C14.5 13.2239 14.2761 13 14 13H13.5V4.66721C13.5 4.12982 13.2328 3.62759 12.7872 3.32728C12.3698 3.04604 11.8452 2.97533 11.3683 3.13602L11.3074 3.15654C10.9458 3.27838 10.5542 3.27838 10.1926 3.15653L10.0625 3.11271C9.61649 2.96243 9.13352 2.96243 8.6875 3.11271C8.24149 3.26299 7.75852 3.26299 7.3125 3.11271C6.86649 2.96243 6.38351 2.96243 5.9375 3.11271L5.80743 3.15654C5.4458 3.27838 5.0542 3.27838 4.69257 3.15653L4.63169 3.13602C4.15476 2.97533 3.63019 3.04604 3.21283 3.32728ZM8.5 5.79974C8.22386 5.79974 8 6.02359 8 6.29974C8 6.57588 8.22386 6.79974 8.5 6.79974L11 6.79974C11.2761 6.79974 11.5 6.57588 11.5 6.29974C11.5 6.02359 11.2761 5.79974 11 5.79974L8.5 5.79974ZM8 9.33215C8 9.05601 8.22386 8.83215 8.5 8.83215H11C11.2761 8.83215 11.5 9.05601 11.5 9.33215C11.5 9.6083 11.2761 9.83215 11 9.83215H8.5C8.22386 9.83215 8 9.6083 8 9.33215ZM6 5.28893C5.44772 5.28893 5 5.73665 5 6.28893V6.31055C5 6.86283 5.44772 7.31055 6 7.31055C6.55228 7.31055 7 6.86283 7 6.31055V6.28893C7 5.73665 6.55228 5.28893 6 5.28893ZM5 9.32135C5 8.76906 5.44772 8.32135 6 8.32135C6.55228 8.32135 7 8.76907 7 9.32135V9.34296C7 9.89525 6.55228 10.343 6 10.343C5.44772 10.343 5 9.89525 5 9.34296V9.32135Z"-->
<!--                        fill="#2A2A2A" />-->
<!--                </svg>-->
<!--                Top-up-->
<!--              </div>-->
<!--            </td>-->
<!--            <td>$100</td>-->
<!--            <td>12/12/2021</td>-->
<!--            <td class="text-end">-->
<!--              <div class="flex justify-end gap-2 items-center">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"-->
<!--                     fill="none">-->
<!--                  <path-->
<!--                      d="M5.17139 4.21448C4.75717 4.21448 4.42139 4.55026 4.42139 4.96448C4.42139 5.37869 4.75717 5.71448 5.17139 5.71448H9.72473L3.93403 11.5052C3.64113 11.7981 3.64113 12.2729 3.93403 12.5658C4.22692 12.8587 4.70179 12.8587 4.99469 12.5658L10.7853 6.77518V11.3284C10.7853 11.7427 11.1211 12.0784 11.5353 12.0784C11.9496 12.0784 12.2853 11.7427 12.2853 11.3284V4.96448C12.2853 4.55026 11.9496 4.21448 11.5353 4.21448H5.17139Z"-->
<!--                      fill="#2A2A2A" fill-opacity="0.5" />-->
<!--                </svg>-->
<!--                View invoice-->
<!--              </div>-->
<!--            </td>-->
<!--          </tr>-->
          </tbody>
        </table>
      </div>
    </div>
    <div class="px-5 w-full py-8 flex-1 border-primary rounded-md">
      <div class="flex flex-col gap-7 justify-start items-start">
        <p class="font-medium">My models</p>
        <div class="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
<!--          <div class="card-container">-->
<!--            <div style="background-image: url(/assets/img/image.png);"-->
<!--                 class="h-32 image-container relative">-->
<!--              <div class="card-icon">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"-->
<!--                     fill="none">-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                        d="M3.375 2.8125C2.44302 2.8125 1.6875 3.56802 1.6875 4.5V6.75C1.6875 7.68198 2.44302 8.4375 3.375 8.4375H14.625C15.557 8.4375 16.3125 7.68198 16.3125 6.75V4.5C16.3125 3.56802 15.557 2.8125 14.625 2.8125H3.375ZM3.9375 5.625C3.9375 5.31434 4.18934 5.0625 4.5 5.0625H5.0625C5.37316 5.0625 5.625 5.31434 5.625 5.625C5.625 5.93566 5.37316 6.1875 5.0625 6.1875H4.5C4.18934 6.1875 3.9375 5.93566 3.9375 5.625Z"-->
<!--                        fill="#2A2A2A" />-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                        d="M3.375 9.5625C2.44302 9.5625 1.6875 10.318 1.6875 11.25V13.5C1.6875 14.432 2.44302 15.1875 3.375 15.1875H14.625C15.557 15.1875 16.3125 14.432 16.3125 13.5V11.25C16.3125 10.318 15.557 9.5625 14.625 9.5625H3.375ZM3.9375 12.375C3.9375 12.0643 4.18934 11.8125 4.5 11.8125H5.0625C5.37316 11.8125 5.625 12.0643 5.625 12.375C5.625 12.6857 5.37316 12.9375 5.0625 12.9375H4.5C4.18934 12.9375 3.9375 12.6857 3.9375 12.375Z"-->
<!--                        fill="#2A2A2A" />-->
<!--                </svg>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="card-actions">-->
<!--              <div class="flex w-full justify-between">-->
<!--                <div class="flex items-center gap-1 ">-->
<!--                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"-->
<!--                       xmlns="http://www.w3.org/2000/svg">-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                          d="M3 2.5C2.17157 2.5 1.5 3.17157 1.5 4V6C1.5 6.82843 2.17157 7.5 3 7.5H13C13.8284 7.5 14.5 6.82843 14.5 6V4C14.5 3.17157 13.8284 2.5 13 2.5H3ZM3.5 5C3.5 4.72386 3.72386 4.5 4 4.5H4.5C4.77614 4.5 5 4.72386 5 5C5 5.27614 4.77614 5.5 4.5 5.5H4C3.72386 5.5 3.5 5.27614 3.5 5Z"-->
<!--                          fill="#2A2A2A" />-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                          d="M3 8.5C2.17157 8.5 1.5 9.17157 1.5 10V12C1.5 12.8284 2.17157 13.5 3 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V10C14.5 9.17157 13.8284 8.5 13 8.5H3ZM3.5 11C3.5 10.7239 3.72386 10.5 4 10.5H4.5C4.77614 10.5 5 10.7239 5 11C5 11.2761 4.77614 11.5 4.5 11.5H4C3.72386 11.5 3.5 11.2761 3.5 11Z"-->
<!--                          fill="#2A2A2A" />-->
<!--                  </svg>-->
<!--                  <p class="ibm-plex-mono-medium text-sm ">-->
<!--                    <span class="opacity-20">crl/</span>data-analyst-->
<!--                  </p>-->

<!--                </div>-->
<!--                <div class="flex opacity-50 items-center gap-1 ">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"-->
<!--                       fill="none">-->
<!--                    <path-->
<!--                        d="M4.9299 2.16798C5.26667 1.13151 6.733 1.13151 7.06977 2.16798L7.43111 3.28007C7.58172 3.74359 8.01367 4.05742 8.50105 4.05742H9.67037C10.7602 4.05742 11.2133 5.45199 10.3316 6.09257L9.38563 6.77987C8.99133 7.06635 8.82634 7.57413 8.97695 8.03766L9.33829 9.14974C9.67506 10.1862 8.48877 11.0481 7.60709 10.4075L6.66109 9.72023C6.2668 9.43375 5.73288 9.43375 5.33858 9.72023L4.39258 10.4075C3.5109 11.0481 2.32461 10.1862 2.66138 9.14974L3.02272 8.03766C3.17333 7.57413 3.00834 7.06635 2.61404 6.77987L1.66805 6.09257C0.786369 5.45199 1.23949 4.05742 2.3293 4.05742H3.49862C3.986 4.05742 4.41795 3.74359 4.56856 3.28007L4.9299 2.16798Z"-->
<!--                        fill="#2A2A2A" />-->
<!--                  </svg>-->
<!--                  <p class=" text-sm ">-->
<!--                    4.9/5-->
<!--                  </p>-->

<!--                </div>-->
<!--              </div>-->

<!--              <div class="flex gap-3 items-center flex-wrap">-->
<!--                <div class="w-fit rounded-full flex text-xs font-medium text-red px-2 py-1 gap-1 items-center bg-red/20">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">-->
<!--                    <path d="M3.9375 6.1875C3.45425 6.1875 3.0625 6.57925 3.0625 7.0625V7.9375C3.0625 8.42075 3.45425 8.8125 3.9375 8.8125H7V6.1875H3.9375Z" fill="#CA8787"/>-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.4375 3.125C7.19588 3.125 7 3.32088 7 3.5625C7 3.80412 7.19588 4 7.4375 4H8.75V4.875H3.5C2.5335 4.875 1.75 5.6585 1.75 6.625V8.375C1.75 9.3415 2.5335 10.125 3.5 10.125H8.75V11H7.4375C7.19588 11 7 11.1959 7 11.4375C7 11.6791 7.19588 11.875 7.4375 11.875H10.9375C11.1791 11.875 11.375 11.6791 11.375 11.4375C11.375 11.1959 11.1791 11 10.9375 11H9.625V10.125H10.5C11.4665 10.125 12.25 9.3415 12.25 8.375V6.625C12.25 5.6585 11.4665 4.875 10.5 4.875H9.625V4L10.9375 4C11.1791 4 11.375 3.80412 11.375 3.5625C11.375 3.32088 11.1791 3.125 10.9375 3.125H7.4375ZM8.75 5.75H3.5C3.01675 5.75 2.625 6.14175 2.625 6.625V8.375C2.625 8.85825 3.01675 9.25 3.5 9.25H8.75V5.75ZM9.625 9.25V5.75H10.5C10.9832 5.75 11.375 6.14175 11.375 6.625V8.375C11.375 8.85825 10.9832 9.25 10.5 9.25H9.625Z" fill="#CA8787"/>-->
<!--                  </svg>-->

<!--                  Input data: .CSV file-->
<!--                </div>-->
<!--                <div class="w-fit rounded-full flex text-xs font-medium text-green_ligth px-2 py-1 gap-1 items-center bg-green/20">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.375 1.375C2.92525 1.375 1.75 2.55025 1.75 4V11C1.75 12.4497 2.92525 13.625 4.375 13.625H6.02224C5.96997 13.5456 5.92438 13.4616 5.88611 13.3739C5.78019 13.1312 5.73321 12.8669 5.74903 12.6026L5.81614 11.4532C5.83681 11.0945 5.97208 10.752 6.20204 10.4759L6.6215 9.97256L6.64666 9.939L8.81945 7.3174C9.22166 6.83745 9.79802 6.5369 10.4218 6.48184C11.0456 6.42678 11.6657 6.62172 12.1457 7.02378C12.1814 7.05321 12.2162 7.08363 12.25 7.11502V5.15474C12.25 4.41894 11.9412 3.71691 11.3988 3.21971L10.1391 2.06497C9.65493 1.62119 9.02204 1.375 8.36528 1.375H4.375ZM8.3125 2.25C8.55413 2.25 8.75 2.44588 8.75 2.6875V4.4375C8.75 4.67912 8.94588 4.875 9.1875 4.875H10.9375C11.1791 4.875 11.375 5.07088 11.375 5.3125C11.375 5.55412 11.1791 5.75 10.9375 5.75H9.1875C8.46263 5.75 7.875 5.16237 7.875 4.4375V2.6875C7.875 2.44588 8.07088 2.25 8.3125 2.25Z" fill="#97C1A9"/>-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73186 10.9746C6.61209 11.1186 6.54168 11.2972 6.53099 11.4842L6.46234 12.6848C6.42876 13.2721 6.97273 13.7246 7.54412 13.5846L8.71218 13.2985C8.89409 13.2539 9.0569 13.1521 9.17668 13.0082L9.189 12.9933L9.18948 12.9937L11.905 9.72907C12.4666 9.05396 12.3745 8.05143 11.6994 7.48987C11.0243 6.92832 10.0217 7.02037 9.46019 7.69549L7.18824 10.4269C7.18088 10.4351 7.17364 10.4435 7.16653 10.452L6.73186 10.9746ZM7.83961 11.0111C7.84687 11.003 7.85399 10.9948 7.86095 10.9864L10.1329 8.25504C10.3854 7.95145 10.8362 7.91005 11.1398 8.16258C11.4434 8.4151 11.4848 8.86593 11.2323 9.16952L8.53801 12.4086C8.53065 12.4169 8.52341 12.4252 8.5163 12.4338L8.50397 12.4486L7.33592 12.7348L7.40456 11.5341L7.83923 11.0116L7.83961 11.0111Z" fill="#97C1A9"/>-->
<!--                  </svg>-->
<!--                  Text generation-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="card-container">-->
<!--            <div style="background-image: url(/assets/img/image.png);"-->
<!--                 class="h-32 image-container relative">-->
<!--              <div class="card-icon">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"-->
<!--                     fill="none">-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                        d="M3.375 2.8125C2.44302 2.8125 1.6875 3.56802 1.6875 4.5V6.75C1.6875 7.68198 2.44302 8.4375 3.375 8.4375H14.625C15.557 8.4375 16.3125 7.68198 16.3125 6.75V4.5C16.3125 3.56802 15.557 2.8125 14.625 2.8125H3.375ZM3.9375 5.625C3.9375 5.31434 4.18934 5.0625 4.5 5.0625H5.0625C5.37316 5.0625 5.625 5.31434 5.625 5.625C5.625 5.93566 5.37316 6.1875 5.0625 6.1875H4.5C4.18934 6.1875 3.9375 5.93566 3.9375 5.625Z"-->
<!--                        fill="#2A2A2A" />-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                        d="M3.375 9.5625C2.44302 9.5625 1.6875 10.318 1.6875 11.25V13.5C1.6875 14.432 2.44302 15.1875 3.375 15.1875H14.625C15.557 15.1875 16.3125 14.432 16.3125 13.5V11.25C16.3125 10.318 15.557 9.5625 14.625 9.5625H3.375ZM3.9375 12.375C3.9375 12.0643 4.18934 11.8125 4.5 11.8125H5.0625C5.37316 11.8125 5.625 12.0643 5.625 12.375C5.625 12.6857 5.37316 12.9375 5.0625 12.9375H4.5C4.18934 12.9375 3.9375 12.6857 3.9375 12.375Z"-->
<!--                        fill="#2A2A2A" />-->
<!--                </svg>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="card-actions">-->
<!--              <div class="flex w-full justify-between">-->
<!--                <div class="flex items-center gap-1 ">-->
<!--                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"-->
<!--                       xmlns="http://www.w3.org/2000/svg">-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                          d="M3 2.5C2.17157 2.5 1.5 3.17157 1.5 4V6C1.5 6.82843 2.17157 7.5 3 7.5H13C13.8284 7.5 14.5 6.82843 14.5 6V4C14.5 3.17157 13.8284 2.5 13 2.5H3ZM3.5 5C3.5 4.72386 3.72386 4.5 4 4.5H4.5C4.77614 4.5 5 4.72386 5 5C5 5.27614 4.77614 5.5 4.5 5.5H4C3.72386 5.5 3.5 5.27614 3.5 5Z"-->
<!--                          fill="#2A2A2A" />-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                          d="M3 8.5C2.17157 8.5 1.5 9.17157 1.5 10V12C1.5 12.8284 2.17157 13.5 3 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V10C14.5 9.17157 13.8284 8.5 13 8.5H3ZM3.5 11C3.5 10.7239 3.72386 10.5 4 10.5H4.5C4.77614 10.5 5 10.7239 5 11C5 11.2761 4.77614 11.5 4.5 11.5H4C3.72386 11.5 3.5 11.2761 3.5 11Z"-->
<!--                          fill="#2A2A2A" />-->
<!--                  </svg>-->
<!--                  <p class="ibm-plex-mono-medium text-sm ">-->
<!--                    <span class="opacity-20">crl/</span>data-analyst-->
<!--                  </p>-->

<!--                </div>-->
<!--                <div class="flex opacity-50 items-center gap-1 ">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"-->
<!--                       fill="none">-->
<!--                    <path-->
<!--                        d="M4.9299 2.16798C5.26667 1.13151 6.733 1.13151 7.06977 2.16798L7.43111 3.28007C7.58172 3.74359 8.01367 4.05742 8.50105 4.05742H9.67037C10.7602 4.05742 11.2133 5.45199 10.3316 6.09257L9.38563 6.77987C8.99133 7.06635 8.82634 7.57413 8.97695 8.03766L9.33829 9.14974C9.67506 10.1862 8.48877 11.0481 7.60709 10.4075L6.66109 9.72023C6.2668 9.43375 5.73288 9.43375 5.33858 9.72023L4.39258 10.4075C3.5109 11.0481 2.32461 10.1862 2.66138 9.14974L3.02272 8.03766C3.17333 7.57413 3.00834 7.06635 2.61404 6.77987L1.66805 6.09257C0.786369 5.45199 1.23949 4.05742 2.3293 4.05742H3.49862C3.986 4.05742 4.41795 3.74359 4.56856 3.28007L4.9299 2.16798Z"-->
<!--                        fill="#2A2A2A" />-->
<!--                  </svg>-->
<!--                  <p class=" text-sm ">-->
<!--                    4.9/5-->
<!--                  </p>-->

<!--                </div>-->
<!--              </div>-->

<!--              <div class="flex gap-3 items-center flex-wrap">-->
<!--                <div class="w-fit rounded-full flex text-xs font-medium text-red px-2 py-1 gap-1 items-center bg-red/20">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">-->
<!--                    <path d="M3.9375 6.1875C3.45425 6.1875 3.0625 6.57925 3.0625 7.0625V7.9375C3.0625 8.42075 3.45425 8.8125 3.9375 8.8125H7V6.1875H3.9375Z" fill="#CA8787"/>-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.4375 3.125C7.19588 3.125 7 3.32088 7 3.5625C7 3.80412 7.19588 4 7.4375 4H8.75V4.875H3.5C2.5335 4.875 1.75 5.6585 1.75 6.625V8.375C1.75 9.3415 2.5335 10.125 3.5 10.125H8.75V11H7.4375C7.19588 11 7 11.1959 7 11.4375C7 11.6791 7.19588 11.875 7.4375 11.875H10.9375C11.1791 11.875 11.375 11.6791 11.375 11.4375C11.375 11.1959 11.1791 11 10.9375 11H9.625V10.125H10.5C11.4665 10.125 12.25 9.3415 12.25 8.375V6.625C12.25 5.6585 11.4665 4.875 10.5 4.875H9.625V4L10.9375 4C11.1791 4 11.375 3.80412 11.375 3.5625C11.375 3.32088 11.1791 3.125 10.9375 3.125H7.4375ZM8.75 5.75H3.5C3.01675 5.75 2.625 6.14175 2.625 6.625V8.375C2.625 8.85825 3.01675 9.25 3.5 9.25H8.75V5.75ZM9.625 9.25V5.75H10.5C10.9832 5.75 11.375 6.14175 11.375 6.625V8.375C11.375 8.85825 10.9832 9.25 10.5 9.25H9.625Z" fill="#CA8787"/>-->
<!--                  </svg>-->

<!--                  Input data: .CSV file-->
<!--                </div>-->
<!--                <div class="w-fit rounded-full flex text-xs font-medium text-green_ligth px-2 py-1 gap-1 items-center bg-green/20">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.375 1.375C2.92525 1.375 1.75 2.55025 1.75 4V11C1.75 12.4497 2.92525 13.625 4.375 13.625H6.02224C5.96997 13.5456 5.92438 13.4616 5.88611 13.3739C5.78019 13.1312 5.73321 12.8669 5.74903 12.6026L5.81614 11.4532C5.83681 11.0945 5.97208 10.752 6.20204 10.4759L6.6215 9.97256L6.64666 9.939L8.81945 7.3174C9.22166 6.83745 9.79802 6.5369 10.4218 6.48184C11.0456 6.42678 11.6657 6.62172 12.1457 7.02378C12.1814 7.05321 12.2162 7.08363 12.25 7.11502V5.15474C12.25 4.41894 11.9412 3.71691 11.3988 3.21971L10.1391 2.06497C9.65493 1.62119 9.02204 1.375 8.36528 1.375H4.375ZM8.3125 2.25C8.55413 2.25 8.75 2.44588 8.75 2.6875V4.4375C8.75 4.67912 8.94588 4.875 9.1875 4.875H10.9375C11.1791 4.875 11.375 5.07088 11.375 5.3125C11.375 5.55412 11.1791 5.75 10.9375 5.75H9.1875C8.46263 5.75 7.875 5.16237 7.875 4.4375V2.6875C7.875 2.44588 8.07088 2.25 8.3125 2.25Z" fill="#97C1A9"/>-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73186 10.9746C6.61209 11.1186 6.54168 11.2972 6.53099 11.4842L6.46234 12.6848C6.42876 13.2721 6.97273 13.7246 7.54412 13.5846L8.71218 13.2985C8.89409 13.2539 9.0569 13.1521 9.17668 13.0082L9.189 12.9933L9.18948 12.9937L11.905 9.72907C12.4666 9.05396 12.3745 8.05143 11.6994 7.48987C11.0243 6.92832 10.0217 7.02037 9.46019 7.69549L7.18824 10.4269C7.18088 10.4351 7.17364 10.4435 7.16653 10.452L6.73186 10.9746ZM7.83961 11.0111C7.84687 11.003 7.85399 10.9948 7.86095 10.9864L10.1329 8.25504C10.3854 7.95145 10.8362 7.91005 11.1398 8.16258C11.4434 8.4151 11.4848 8.86593 11.2323 9.16952L8.53801 12.4086C8.53065 12.4169 8.52341 12.4252 8.5163 12.4338L8.50397 12.4486L7.33592 12.7348L7.40456 11.5341L7.83923 11.0116L7.83961 11.0111Z" fill="#97C1A9"/>-->
<!--                  </svg>-->
<!--                  Text generation-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>

      </div>
    </div>
  </main>
  <DepositModal/>
</template>

<style scoped>

</style>