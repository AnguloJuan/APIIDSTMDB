<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['movie', 'movieId'])
const rate = ref(null)
const rated = ref(false)

async function rateMovie(rate) {
  const session_id = localStorage.getItem('session_id')
  const parsedRate = parseFloat(rate)
  // API call to rate the movie
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
    },
    body: JSON.stringify({ value: parsedRate })
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${props.movie.id}/rating?session_id=${session_id}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err.status_message))

  if (res.success) {
    alert('Movie rated successfully')
    location.reload()
  } else {
    alert('Something went wrong')
  }
}

async function deleteRate() {
  const session_id = localStorage.getItem('session_id')
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
    }
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${props.movie.id}/rating?session_id=${session_id}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))

  if (res.success) {
    alert('Movie rating deleted successfully')
    location.reload()
  } else {
    alert('Something went wrong')
  }
}

onMounted(async () => {
  // API call to get the movies rating
  const session_id = localStorage.getItem('session_id')
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
    }
  }
  fetch(
    `https://api.themoviedb.org/3/movie/${props.movieId}/account_states?session_id=${session_id}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.rated) {
        rate.value = response.rated.value
        rated.value = true
      }
    })
    .catch((err) => console.error(err))
})
</script>

<template>
  <p class="my-3 font-bold">
    Rating: <span class="font-normal">{{ props.movie.vote_average }}</span>
  </p>
  <div>
    <p>Rate this movie</p>
    <input
      type="number"
      v-model="rate"
      min="0"
      max="10"
      class="block rounded-md border-1 px-3 py-1.5 border-1 bg-gray-800 border-gray-100 focus:border-2 focus:border-inset focus:border-indigo-600 focus:outline-0 transition-color transition ease-in"
    />
    <input
      v-model="rate"
      type="range"
      min="0"
      max="10"
      step="0.5"
      class="appearance-none p-1 my-2 w-1/2 block rounded-md border-1 border-1 bg-gray-800 border-gray-100 focus:border-2 focus:border-inset focus:border-indigo-600 focus:outline-0 transition-color transition ease-in"
    />

    <button
      @click="rateMovie(rate)"
      class="font-semibold align-center hover:bg-blue-900 bg-blue-800 rounded-md p-2 mt-4"
    >
      Rate
    </button>

    <button
      v-if="rated"
      @click="deleteRate"
      class="font-semibold align-center hover:bg-red-900 bg-red-800 rounded-md p-2 mt-4 ml-3"
    >
      Delete Rating
    </button>
  </div>
</template>
