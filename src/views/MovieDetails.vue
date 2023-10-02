<template>
    <div class="p-8 flex ">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" class="w-1/3" />
        <div class="ml-8">
            <h1 class="text-2xl font-bold my-2">{{ movie.title }}</h1>
            <p>{{ movie.overview }}</p>
            <p class="my-3 font-bold">Release Date: <span class="font-normal">{{ movie.release_date }}</span></p>
            <p class="my-3 font-bold">Rating: <span class="font-normal">{{ movie.vote_average }}</span></p>
            <div>
                <p>Rate this movie</p>
                <input type="number" v-model="rate" min="0" max="10"
                    class="block rounded-md border-1 px-3 py-1.5 border-1 bg-gray-800 border-gray-100 focus:border-2 focus:border-inset focus:border-indigo-600 focus:outline-0 transition-color transition ease-in">
                <input v-model="rate" type="range" min="0" max="10" step="0.5"
                    class="appearance-none p-1 my-2 w-1/2 block rounded-md border-1 border-1 bg-gray-800 border-gray-100  focus:border-2 focus:border-inset focus:border-indigo-600 focus:outline-0 transition-color transition ease-in" />

                <button @click="rateMovie(rate)"
                    class="font-semibold align-center hover:bg-blue-900 bg-blue-800 rounded-md p-2 mt-4">Rate</button>

                <button v-if="rated" @click="deleteRate"
                    class="font-semibold align-center hover:bg-red-900 bg-red-800 rounded-md p-2 mt-4 ml-3">Delete
                    Rating</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MovieDetails',
    data() {
        return {
            movie: {},
            rate: null,
            rated: false
        };
    },
    mounted() {
        // Get the movie ID from the route params
        const movieId = this.$route.params.id;

        // Make an API call to get the movie details
        let options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(response => { this.movie = response; })
            .catch(err => console.error(err));

        // Make an API call to get the movies rating
        const session_id = localStorage.getItem('session_id');
        options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
            }
        };
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/account_states?session_id=${session_id}`, options)
            .then(response => response.json())
            .then(response => {
                if (response.rated) {
                    this.rate = response.rated.value;
                    this.rated = true;
                }
            })
            .catch(err => console.error(err));
    },

    methods: {
        async rateMovie(rate) {
            const session_id = localStorage.getItem('session_id');
            const parsedRate = parseFloat(rate);
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
                },
                body: JSON.stringify({ value: parsedRate })
            };

            const res = await fetch(`https://api.themoviedb.org/3/movie/${this.movie.id}/rating?session_id=${session_id}`, options)
                .then(response => response.json())
                .catch(err => console.error(err.status_message));

            if (res.success) {
                alert('Movie rated successfully');
                location.reload();
            } else {
                alert('Something went wrong');
            }
        },
        async deleteRate() {
            const session_id = localStorage.getItem('session_id');
            const options = {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjk5ZjdiNWU1ZTYxZDMzOGMzNTdiYmRjNjMyMTZjYSIsInN1YiI6IjY1MTFjODIyZThkMGI0MDBjYTg3NDgzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czkcFSTdNUtv8v4fgSXHO7kTHA7hf3It3LZ-gUzEQfU'
                }
            };

            const res = await fetch(`https://api.themoviedb.org/3/movie/${this.movie.id}/rating?session_id=${session_id}`, options)
                .then(response => response.json())
                .catch(err => console.error(err));

            if (res.success) {
                alert('Movie rating deleted successfully');
                location.reload();
            } else {
                alert('Something went wrong');
            }
        }
    }
};
</script>
