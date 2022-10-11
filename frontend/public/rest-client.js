import { createApp } from 'vue'

createApp({
    data() {
        return {
            games: [],
            gameInModal: {}
        }
    },
    async created() {
        this.games = await (await fetch("http://localhost:8080/games")).json()
    },
    methods: {
        getGame: async function (id) {
            this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json()
            const gameInfoModal = new bootstrap.Modal(document.getElementById("gameInfoModal"), {})
            gameInfoModal.show()
        }
    }
}).mount('#app')