<script setup>
import {ref} from "vue";
import user from "@/app/api/User/user.js";

const amount = ref(null);
function createPayment(){
  user.getPaymentLink(amount.value);
}
</script>

<template>
  <div id="DepositModal" class="modal">
    <div class="flex flex-col relative gap-5 ">
      <div class="flex cursor-pointer justify-between items-center">
        <p class="text-xl font-medium">
          Top-up balance
        </p>
        <div class="close-DepositModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0.25 8.875C0.25 4.38769 3.88769 0.75 8.375 0.75H9.625C14.1123 0.75 17.75 4.38769 17.75 8.875V10.125C17.75 14.6123 14.1123 18.25 9.625 18.25H8.375C3.88769 18.25 0.25 14.6123 0.25 10.125V8.875ZM5.46447 5.96449C5.70855 5.72041 6.10428 5.72041 6.34836 5.96449L8.99998 8.61612L11.6517 5.96444C11.8957 5.72036 12.2915 5.72036 12.5355 5.96444C12.7796 6.20852 12.7796 6.60425 12.5355 6.84832L9.88386 9.5L12.5355 12.1517C12.7796 12.3958 12.7796 12.7915 12.5355 13.0356C12.2915 13.2796 11.8957 13.2796 11.6517 13.0356L8.99998 10.3839L6.34836 13.0355C6.10428 13.2796 5.70855 13.2796 5.46447 13.0355C5.22039 12.7914 5.22039 12.3957 5.46447 12.1516L8.1161 9.5L5.46447 6.84837C5.22039 6.6043 5.22039 6.20857 5.46447 5.96449Z"
                  fill="#2A2A2A"/>
          </svg>
        </div>
      </div>
      <div class="flex text-sm flex-col gap-1">
        <label for="amount">Amount</label>
        <div class="border-primary flex gap-1 items-center py-2.5 px-3.5">
          <p>$</p>
          <input id="amount" v-model="amount" class="flex-1" placeholder="0">
        </div>
      </div>
      <div class="flex text-sm flex-col gap-1">
        <p >Payment method</p>
        <div class="flex gap-2">
          <button class="btn-border bg-black text-white flex-1 py-2.5">
            Cryptomus
          </button>
          <button class="btn-border  text-black/50  hover:bg-transparent hover:text-black/50 flex-1 py-2.5" disabled>
            Card <span class="text-black/20">Soon</span>
          </button>
        </div>

      </div>
      <div class="flex gap-2">
        <button class="close-DepositModal btn-border flex-1 py-2.5">
          Cancel
        </button>
        <button @click="createPayment" class="btn-border flex-1 py-2.5" >
          Continue
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>