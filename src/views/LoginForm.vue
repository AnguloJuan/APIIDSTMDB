<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

async function login() {
}

</script>

<template>
  <main class="flex min-h-full flex-col justify-center align-center mt-10 mx-auto max-w-2xl text-white gap-3">
    <h2 class="text-xl font-bold self-center">Log In</h2>
    <form action="" @submit.prevent="login" class="flex flex-col justify-center align-center mt-2 gap-3">
      <label for="">Email: </label>
      <input type="email" placeholder="Type you email" v-model="email"
        class="block w-full rounded-md border-1 px-3 py-1.5 shadow-sm border-1 bg-gray-800 border-gray-100 focus:border-2 focus:border-inset focus:border-indigo-600 focus:outline-0 transition-color transition ease-in">

      <label for="">Password: </label>
      <input type="password" placeholder="Type you password" v-model="password"
        class="block w-full rounded-md border-1 px-3 py-1.5 shadow-sm border-1 bg-gray-800 border-gray-100 focus:border-2 focus:border-inset focus:border-indigo-600 focus:outline-0 transition-color transition ease-in">

      <button class="font-semibold align-center hover:bg-blue-900 bg-blue-800 rounded-md p-2 mt-4">
        Log In
      </button>
    </form>
  </main>
</template>
