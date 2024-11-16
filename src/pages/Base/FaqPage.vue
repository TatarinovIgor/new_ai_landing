<script setup>
function toggleAnswer(event) {
  const element = event.currentTarget;
  const answer = element.querySelector('.faq');
  element.classList.toggle('show');
}
</script>

<template>
  <main class="flex  w-full max-w-[770px] flex-col  gap-5 justify-center items-center">
    <div @click="toggleAnswer" class="cursor-pointer faq border-primary flex flex-col p-5 w-full">
      <div class="question flex text-xl justify-between rounded-md  w-full items-center">
        <div class="flex items-center gap-[10px]">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                  d="M11.9999 4.25C10.3431 4.25 8.99994 5.59315 8.99994 7.25V8C8.99994 9.65685 10.3431 11 11.9999 11C13.6568 11 14.9999 9.65685 14.9999 8V7.25C14.9999 5.59315 13.6568 4.25 11.9999 4.25Z"
                  fill="#2A2A2A" />
              <path
                  d="M19.1249 6.5C18.0894 6.5 17.2499 7.33947 17.2499 8.375V9.125C17.2499 10.1605 18.0894 11 19.1249 11C20.1605 11 20.9999 10.1605 20.9999 9.125V8.375C20.9999 7.33947 20.1605 6.5 19.1249 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M22.0883 16.7591C20.6453 18.3662 18.9988 18.8606 17.4305 18.2422C17.4557 18.2081 17.4808 18.1735 17.5059 18.1387C17.8742 17.6258 18.0669 16.5446 17.9783 15.4874L17.9045 14.607C17.8322 13.7436 17.6443 13.0083 17.3884 12.5H21.2788C21.8287 12.5 22.3041 13.2931 22.4206 14.4046L22.4821 14.9916C22.5559 15.6964 22.3953 16.4172 22.0883 16.7591Z"
                  fill="#2A2A2A" />
              <path
                  d="M6.56932 18.2422C5.00109 18.8606 3.35458 18.3662 1.91153 16.7591C1.60453 16.4172 1.44397 15.6964 1.5178 14.9916L1.57929 14.4046C1.69573 13.2931 2.17118 12.5 2.72107 12.5H6.61151C6.35555 13.0083 6.16768 13.7436 6.09533 14.607L6.02154 15.4874C5.93295 16.5446 6.12562 17.6258 6.49402 18.1387C6.51907 18.1735 6.54417 18.2081 6.56932 18.2422Z"
                  fill="#2A2A2A" />
              <path
                  d="M4.87494 6.5C5.91047 6.5 6.74994 7.33947 6.74994 8.375V9.125C6.74994 10.1605 5.91047 11 4.87494 11C3.8394 11 2.99994 10.1605 2.99994 9.125V8.375C2.99994 7.33947 3.8394 6.5 4.87494 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M7.59508 15.1189C7.73481 13.5906 8.30535 12.5 8.96521 12.5H15.0347C15.6945 12.5 16.2651 13.5906 16.4048 15.1189L16.4786 15.926C16.5672 16.8951 16.3745 17.8862 16.0061 18.3563C13.5051 21.5479 10.4948 21.5479 7.99377 18.3563C7.62538 17.8862 7.4327 16.8951 7.5213 15.926L7.59508 15.1189Z"
                  fill="#2A2A2A" />
            </g>
          </svg>
          <p>
            Who we are?
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
      <div class="answer  opacity-70 border-primary border-x-0 bottom-b-0">
        We are the Cryptographic Research Lab, a cutting-edge research facility specializing in artificial
        intelligence, fine-tuning technologies, and the development of data marketplaces. Our mission
        is to drive innovation in the fields of cryptography and data analysis, enabling us to effectively
        address complex challenges and guarantee the utmost security for valuable information.
      </div>
    </div>
    <div @click="toggleAnswer" class="cursor-pointer faq border-primary flex flex-col p-5 w-full">
      <div class="question flex text-xl justify-between rounded-md  w-full items-center">
        <div class="flex items-center gap-[10px]">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                  d="M11.9999 4.25C10.3431 4.25 8.99994 5.59315 8.99994 7.25V8C8.99994 9.65685 10.3431 11 11.9999 11C13.6568 11 14.9999 9.65685 14.9999 8V7.25C14.9999 5.59315 13.6568 4.25 11.9999 4.25Z"
                  fill="#2A2A2A" />
              <path
                  d="M19.1249 6.5C18.0894 6.5 17.2499 7.33947 17.2499 8.375V9.125C17.2499 10.1605 18.0894 11 19.1249 11C20.1605 11 20.9999 10.1605 20.9999 9.125V8.375C20.9999 7.33947 20.1605 6.5 19.1249 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M22.0883 16.7591C20.6453 18.3662 18.9988 18.8606 17.4305 18.2422C17.4557 18.2081 17.4808 18.1735 17.5059 18.1387C17.8742 17.6258 18.0669 16.5446 17.9783 15.4874L17.9045 14.607C17.8322 13.7436 17.6443 13.0083 17.3884 12.5H21.2788C21.8287 12.5 22.3041 13.2931 22.4206 14.4046L22.4821 14.9916C22.5559 15.6964 22.3953 16.4172 22.0883 16.7591Z"
                  fill="#2A2A2A" />
              <path
                  d="M6.56932 18.2422C5.00109 18.8606 3.35458 18.3662 1.91153 16.7591C1.60453 16.4172 1.44397 15.6964 1.5178 14.9916L1.57929 14.4046C1.69573 13.2931 2.17118 12.5 2.72107 12.5H6.61151C6.35555 13.0083 6.16768 13.7436 6.09533 14.607L6.02154 15.4874C5.93295 16.5446 6.12562 17.6258 6.49402 18.1387C6.51907 18.1735 6.54417 18.2081 6.56932 18.2422Z"
                  fill="#2A2A2A" />
              <path
                  d="M4.87494 6.5C5.91047 6.5 6.74994 7.33947 6.74994 8.375V9.125C6.74994 10.1605 5.91047 11 4.87494 11C3.8394 11 2.99994 10.1605 2.99994 9.125V8.375C2.99994 7.33947 3.8394 6.5 4.87494 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M7.59508 15.1189C7.73481 13.5906 8.30535 12.5 8.96521 12.5H15.0347C15.6945 12.5 16.2651 13.5906 16.4048 15.1189L16.4786 15.926C16.5672 16.8951 16.3745 17.8862 16.0061 18.3563C13.5051 21.5479 10.4948 21.5479 7.99377 18.3563C7.62538 17.8862 7.4327 16.8951 7.5213 15.926L7.59508 15.1189Z"
                  fill="#2A2A2A" />
            </g>
          </svg>
          <p>
            Who we are?
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
      <div class="answer  opacity-70 border-primary border-x-0 bottom-b-0">
        We are the Cryptographic Research Lab, a cutting-edge research facility specializing in artificial
        intelligence, fine-tuning technologies, and the development of data marketplaces. Our mission
        is to drive innovation in the fields of cryptography and data analysis, enabling us to effectively
        address complex challenges and guarantee the utmost security for valuable information.
      </div>
    </div>
    <div @click="toggleAnswer" class="cursor-pointer faq border-primary flex flex-col p-5 w-full">
      <div class="question flex text-xl justify-between rounded-md  w-full items-center">
        <div class="flex items-center gap-[10px]">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                  d="M11.9999 4.25C10.3431 4.25 8.99994 5.59315 8.99994 7.25V8C8.99994 9.65685 10.3431 11 11.9999 11C13.6568 11 14.9999 9.65685 14.9999 8V7.25C14.9999 5.59315 13.6568 4.25 11.9999 4.25Z"
                  fill="#2A2A2A" />
              <path
                  d="M19.1249 6.5C18.0894 6.5 17.2499 7.33947 17.2499 8.375V9.125C17.2499 10.1605 18.0894 11 19.1249 11C20.1605 11 20.9999 10.1605 20.9999 9.125V8.375C20.9999 7.33947 20.1605 6.5 19.1249 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M22.0883 16.7591C20.6453 18.3662 18.9988 18.8606 17.4305 18.2422C17.4557 18.2081 17.4808 18.1735 17.5059 18.1387C17.8742 17.6258 18.0669 16.5446 17.9783 15.4874L17.9045 14.607C17.8322 13.7436 17.6443 13.0083 17.3884 12.5H21.2788C21.8287 12.5 22.3041 13.2931 22.4206 14.4046L22.4821 14.9916C22.5559 15.6964 22.3953 16.4172 22.0883 16.7591Z"
                  fill="#2A2A2A" />
              <path
                  d="M6.56932 18.2422C5.00109 18.8606 3.35458 18.3662 1.91153 16.7591C1.60453 16.4172 1.44397 15.6964 1.5178 14.9916L1.57929 14.4046C1.69573 13.2931 2.17118 12.5 2.72107 12.5H6.61151C6.35555 13.0083 6.16768 13.7436 6.09533 14.607L6.02154 15.4874C5.93295 16.5446 6.12562 17.6258 6.49402 18.1387C6.51907 18.1735 6.54417 18.2081 6.56932 18.2422Z"
                  fill="#2A2A2A" />
              <path
                  d="M4.87494 6.5C5.91047 6.5 6.74994 7.33947 6.74994 8.375V9.125C6.74994 10.1605 5.91047 11 4.87494 11C3.8394 11 2.99994 10.1605 2.99994 9.125V8.375C2.99994 7.33947 3.8394 6.5 4.87494 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M7.59508 15.1189C7.73481 13.5906 8.30535 12.5 8.96521 12.5H15.0347C15.6945 12.5 16.2651 13.5906 16.4048 15.1189L16.4786 15.926C16.5672 16.8951 16.3745 17.8862 16.0061 18.3563C13.5051 21.5479 10.4948 21.5479 7.99377 18.3563C7.62538 17.8862 7.4327 16.8951 7.5213 15.926L7.59508 15.1189Z"
                  fill="#2A2A2A" />
            </g>
          </svg>
          <p>
            Who we are?
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
      <div class="answer  opacity-70 border-primary border-x-0 bottom-b-0">
        We are the Cryptographic Research Lab, a cutting-edge research facility specializing in artificial
        intelligence, fine-tuning technologies, and the development of data marketplaces. Our mission
        is to drive innovation in the fields of cryptography and data analysis, enabling us to effectively
        address complex challenges and guarantee the utmost security for valuable information.
      </div>
    </div>
    <div @click="toggleAnswer" class="cursor-pointer faq border-primary flex flex-col p-5 w-full">
      <div class="question flex text-xl justify-between rounded-md  w-full items-center">
        <div class="flex items-center gap-[10px]">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                  d="M11.9999 4.25C10.3431 4.25 8.99994 5.59315 8.99994 7.25V8C8.99994 9.65685 10.3431 11 11.9999 11C13.6568 11 14.9999 9.65685 14.9999 8V7.25C14.9999 5.59315 13.6568 4.25 11.9999 4.25Z"
                  fill="#2A2A2A" />
              <path
                  d="M19.1249 6.5C18.0894 6.5 17.2499 7.33947 17.2499 8.375V9.125C17.2499 10.1605 18.0894 11 19.1249 11C20.1605 11 20.9999 10.1605 20.9999 9.125V8.375C20.9999 7.33947 20.1605 6.5 19.1249 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M22.0883 16.7591C20.6453 18.3662 18.9988 18.8606 17.4305 18.2422C17.4557 18.2081 17.4808 18.1735 17.5059 18.1387C17.8742 17.6258 18.0669 16.5446 17.9783 15.4874L17.9045 14.607C17.8322 13.7436 17.6443 13.0083 17.3884 12.5H21.2788C21.8287 12.5 22.3041 13.2931 22.4206 14.4046L22.4821 14.9916C22.5559 15.6964 22.3953 16.4172 22.0883 16.7591Z"
                  fill="#2A2A2A" />
              <path
                  d="M6.56932 18.2422C5.00109 18.8606 3.35458 18.3662 1.91153 16.7591C1.60453 16.4172 1.44397 15.6964 1.5178 14.9916L1.57929 14.4046C1.69573 13.2931 2.17118 12.5 2.72107 12.5H6.61151C6.35555 13.0083 6.16768 13.7436 6.09533 14.607L6.02154 15.4874C5.93295 16.5446 6.12562 17.6258 6.49402 18.1387C6.51907 18.1735 6.54417 18.2081 6.56932 18.2422Z"
                  fill="#2A2A2A" />
              <path
                  d="M4.87494 6.5C5.91047 6.5 6.74994 7.33947 6.74994 8.375V9.125C6.74994 10.1605 5.91047 11 4.87494 11C3.8394 11 2.99994 10.1605 2.99994 9.125V8.375C2.99994 7.33947 3.8394 6.5 4.87494 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M7.59508 15.1189C7.73481 13.5906 8.30535 12.5 8.96521 12.5H15.0347C15.6945 12.5 16.2651 13.5906 16.4048 15.1189L16.4786 15.926C16.5672 16.8951 16.3745 17.8862 16.0061 18.3563C13.5051 21.5479 10.4948 21.5479 7.99377 18.3563C7.62538 17.8862 7.4327 16.8951 7.5213 15.926L7.59508 15.1189Z"
                  fill="#2A2A2A" />
            </g>
          </svg>
          <p>
            Who we are?
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
      <div class="answer  opacity-70 border-primary border-x-0 bottom-b-0">
        We are the Cryptographic Research Lab, a cutting-edge research facility specializing in artificial
        intelligence, fine-tuning technologies, and the development of data marketplaces. Our mission
        is to drive innovation in the fields of cryptography and data analysis, enabling us to effectively
        address complex challenges and guarantee the utmost security for valuable information.
      </div>
    </div>
    <div @click="toggleAnswer" class="cursor-pointer faq border-primary flex flex-col p-5 w-full">
      <div class="question flex text-xl justify-between rounded-md  w-full items-center">
        <div class="flex items-center gap-[10px]">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                  d="M11.9999 4.25C10.3431 4.25 8.99994 5.59315 8.99994 7.25V8C8.99994 9.65685 10.3431 11 11.9999 11C13.6568 11 14.9999 9.65685 14.9999 8V7.25C14.9999 5.59315 13.6568 4.25 11.9999 4.25Z"
                  fill="#2A2A2A" />
              <path
                  d="M19.1249 6.5C18.0894 6.5 17.2499 7.33947 17.2499 8.375V9.125C17.2499 10.1605 18.0894 11 19.1249 11C20.1605 11 20.9999 10.1605 20.9999 9.125V8.375C20.9999 7.33947 20.1605 6.5 19.1249 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M22.0883 16.7591C20.6453 18.3662 18.9988 18.8606 17.4305 18.2422C17.4557 18.2081 17.4808 18.1735 17.5059 18.1387C17.8742 17.6258 18.0669 16.5446 17.9783 15.4874L17.9045 14.607C17.8322 13.7436 17.6443 13.0083 17.3884 12.5H21.2788C21.8287 12.5 22.3041 13.2931 22.4206 14.4046L22.4821 14.9916C22.5559 15.6964 22.3953 16.4172 22.0883 16.7591Z"
                  fill="#2A2A2A" />
              <path
                  d="M6.56932 18.2422C5.00109 18.8606 3.35458 18.3662 1.91153 16.7591C1.60453 16.4172 1.44397 15.6964 1.5178 14.9916L1.57929 14.4046C1.69573 13.2931 2.17118 12.5 2.72107 12.5H6.61151C6.35555 13.0083 6.16768 13.7436 6.09533 14.607L6.02154 15.4874C5.93295 16.5446 6.12562 17.6258 6.49402 18.1387C6.51907 18.1735 6.54417 18.2081 6.56932 18.2422Z"
                  fill="#2A2A2A" />
              <path
                  d="M4.87494 6.5C5.91047 6.5 6.74994 7.33947 6.74994 8.375V9.125C6.74994 10.1605 5.91047 11 4.87494 11C3.8394 11 2.99994 10.1605 2.99994 9.125V8.375C2.99994 7.33947 3.8394 6.5 4.87494 6.5Z"
                  fill="#2A2A2A" />
              <path
                  d="M7.59508 15.1189C7.73481 13.5906 8.30535 12.5 8.96521 12.5H15.0347C15.6945 12.5 16.2651 13.5906 16.4048 15.1189L16.4786 15.926C16.5672 16.8951 16.3745 17.8862 16.0061 18.3563C13.5051 21.5479 10.4948 21.5479 7.99377 18.3563C7.62538 17.8862 7.4327 16.8951 7.5213 15.926L7.59508 15.1189Z"
                  fill="#2A2A2A" />
            </g>
          </svg>
          <p>
            Who we are?
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
      <div class="answer  opacity-70 border-primary border-x-0 bottom-b-0">
        We are the Cryptographic Research Lab, a cutting-edge research facility specializing in artificial
        intelligence, fine-tuning technologies, and the development of data marketplaces. Our mission
        is to drive innovation in the fields of cryptography and data analysis, enabling us to effectively
        address complex challenges and guarantee the utmost security for valuable information.
      </div>
    </div>

  </main>
</template>

<style scoped>

</style>