<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

// Create request token
async function createToken() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
    }
  };

  const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options)
    .then(response => response.json())
    .catch(err => console.error(err));

  if (response.success) {
    return response.request_token;
  } else {
    alert('Something went wrong');
  }
}

// Craete session with login
async function createSessionWithLogin() {
  const token = await createToken();
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      request_token: token
    })
  };

  const response = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', options)
    .then(response => response.json())
    .catch(err => console.error(err));

  return response.request_token;
}

async function createSession() {
  const token = await createSessionWithLogin();
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
    },
    body: JSON.stringify({ request_token: token })
  };

  const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', options)
    .then(response => response.json())
    .catch(err => console.error(err));

  return response;
}

async function login() {
  if (!username.value || !password.value) {
    alert('Please fill all the fields');
    return;
  }

  const response = await createSession();
  if (response.success) {
    localStorage.setItem('session_id', response.session_id);
    router.push({ name: 'MovieList' });
  } else {
    alert('Invalid username or password');
  }
}

</script>

<template>
  <main class="flex min-h-full flex-col justify-center align-center mt-10 mx-auto max-w-2xl text-white gap-3">
    <h2 class="text-xl font-bold self-center">Log In</h2>
    <form action="" @submit.prevent="login" class="flex flex-col justify-center align-center mt-2 gap-3">
      <label for="username">User Name: </label>
      <input type="username" placeholder="Type you username" v-model="username"
        class="block w-full rounded-md border-1 px-3 py-1.5 shadow-sm border-1 bg-gray-800 border-gray-100 focus:border-2 focus:border-inset focus:border-indigo-600 focus:outline-0 transition-color transition ease-in">

      <label for="password">Password: </label>
      <input type="password" placeholder="Type you password" v-model="password"
        class="block w-full rounded-md border-1 px-3 py-1.5 shadow-sm border-1 bg-gray-800 border-gray-100 focus:border-2 focus:border-inset focus:border-indigo-600 focus:outline-0 transition-color transition ease-in">

      <button class="font-semibold align-center hover:bg-blue-900 bg-blue-800 rounded-md p-2 mt-4">
        Log In
      </button>
    </form>
  </main>
</template>
