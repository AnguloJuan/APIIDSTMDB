<script setup>
import { onMounted, ref } from 'vue'
import IconLogOut from '../components/icons/IconLogOut.vue'
import { useRouter } from 'vue-router'

const movies = ref([])
const router = useRouter()

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
  }
}

onMounted(async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))
  movies.value = response.results
})

async function deleteSession() {
  const session_id = localStorage.getItem('session_id')

  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
    },
    body: JSON.stringify({ session_id: session_id })
  }

  const res = await fetch('https://api.themoviedb.org/3/authentication/session', options)
    .then((response) => response.json())
    .catch((err) => console.error(err))
  return res
}

async function logOut() {
  const res = await deleteSession()
  if (res.success) {
    localStorage.removeItem('session_id')
    router.push({ name: 'login' })
  } else {
    alert('Something went wrong')
  }
}
</script>

<template>
  <div v-on:click="logOut" class="w-fit mt-2 ml-3 flex flex-row cursor-pointer">
    <icon-log-out />
    <button type="button" class="font-semibold ml-2">Log Out</button>
  </div>

  <main class="flex min-h-full flex-col justify-center align-center mt-8 mx-auto text-white gap-3">
    <h2 class="text-2xl font-bold self-center">List of Movies</h2>
    <div class="flex flex-row flex-wrap justify-center align-center mt-2 gap-3">
      <div v-for="movie in movies" v-bind:key="movie.id">
        <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
          <div class="w-64 h-96 p-2 px-4 bg-gray-800 rounded-md shadow-md overflow-hidden">
            <h3 class="text-xl font-semibold">{{ movie.title }}</h3>
            <p class="text-md">{{ movie.release_date }}</p>
            <p class="text-md">{{ movie.vote_average }}</p>
            <img
              v-bind:src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              :alt="movie.title"
              class="w-full h-auto"
            />
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>
