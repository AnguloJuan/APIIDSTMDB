<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RateMovie from '../components/RateMovie.vue'
//let name = 'MovieDetails';
const movie = ref({})
const route = useRoute()
onMounted(async () => {
  // Get the movie ID from the route params
  const movieId = route.params.id

  // API call to get the movie details
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
    }
  }

  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then((response) => response.json())
    .then((response) => {
      movie.value = response
    })
    .catch((err) => console.error(err))
})
</script>

<template>
  <div class="p-8 flex">
    <img
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      :alt="movie.title"
      class="w-1/3"
    />
    <div class="ml-8">
      <h1 class="text-2xl font-bold my-2">{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
      <p class="my-3 font-bold">
        Release Date: <span class="font-normal">{{ movie.release_date }}</span>
      </p>
      <RateMovie :movie="movie" />
    </div>
  </div>
</template>
