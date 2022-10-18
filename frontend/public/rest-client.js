import { createApp } from 'vue'
const api_base = "http://localhost:8088"

createApp({
    data() {
        return {
            games: [],
            gameInModal: {},
            loginModal:{},
            loginName:"",
            loginPass:"",
            loginError:"",
            token:"",
        }
    },
    async created() {
        this.games = await (await fetch(`${api_base}/games`)).json()
        this.token = sessionStorage.getItem("token")===null?"":sessionStorage.getItem("token")
        console.log("Created",this.token);
    },
    methods: {
        getGame: async function (id) {
            this.gameInModal = await (await fetch(`${api_base}/games/${id}`)).json()
            const gameInfoModal = new bootstrap.Modal(document.getElementById("gameInfoModal"), {})
            gameInfoModal.show()
        },
        showLogin: function(event) {
            console.log(event);
            event.preventDefault()
            this.loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {})
            this.loginModal.show()
        },
        doLogIn: async function(){
            const response = await fetch(`${api_base}/login`,
                {
                    method:"post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "email":this.loginName, "password":this.loginPass })
                }
            )
            const result = await response.json()
            if(response.ok){                
                if(result.success){
                    this.token = result.data.token
                    sessionStorage.setItem("token", this.token);
                    this.loginModal.hide()
                }
            } else {
                this.loginError = result.error
            }
        },
        doLogOff: function() {
            this.loginName=""
            this.loginPass=""
            this.loginError=""
            this.token = ""
            sessionStorage.removeItem("token")
        }
    }
}).mount('#app')