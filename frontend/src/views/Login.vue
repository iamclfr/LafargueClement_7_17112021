<template>
    <div id="loginPage" class="w-full h-screen flex justify-center items-center">
        <div class="max-w-lg relative flex justify-center items-center flex-wrap bg-white rounded-md drop-shadow-2xl p-4 z-50">
            <form id="loginForm" class="w-10/12 py-4">
                <div class="w-full flex justify-center items-center mb-4">
                    <img src="/assets/images/icon-left-font.png" class="max-w-xs" alt="Logo Groupomania">
                </div>
                <label for="email" hidden>
                    Email
                </label>
                <div class="w-full relative">
                    <input id="email" type="email" name="email" autocomplete="email" class="w-full pl-4 pr-44 py-3 border-2 rounded-md" placeholder="Email" required>
                    <span class="absolute top-0.5 right-0.5 flex justify-center items-center py-3 px-1 bg-white rounded-r-md pointer-events-none">@groupomania.com</span>
                </div>

                <label for="password" hidden>
                    Mot de Passe
                </label>
                <input id="password" type="password" name="password" autocomplete="current-password" class="w-full px-4 py-3 mt-4 border-2 rounded-md" placeholder="Mot de Passe" required>

                <label for="submit" hidden>
                    Se connecter
                </label>
                <button @click='login' type="submit" class="groupomania-bg-blue py-3 px-4 mt-4 text-white font-bold rounded-md cursor-pointer w-full">Se Connecter</button>
            </form>
            <div class="w-10/12">
                <span>Vous avez oublié votre <a href="#" class="groupomania-color-blue">Mot de Passe</a> ?</span>
            </div>
            <div class="w-10/12 my-2">
                <hr>
            </div>
            <div class="w-10/12">
                <span>Première fois sur Groupomania ? <a href="/register" class="groupomania-color-blue font-bold">S'INSCRIRE</a></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            errors: [],
            loginPage: null,
            loginForm: null
        }
    },
    mounted() {
        // if user is loggued in, redirect to home
        if (this.$auth.isLogged()) {
            this.$router.push('/')
        }
        this.loginPage = document.getElementById('loginPage')
        this.loginForm = document.getElementById('loginForm')
        this.registerBackgroundTransition()
        this.registerScroll()
    },
    methods: {
        login(e) {
            e.preventDefault()
            const form = document.getElementById('loginForm')
            const formData = new FormData(form)
            const data = {}

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Check if email and password are not empty
            if (data.email === '' || data.password === '') {
                this.errors = ['Veuillez remplir tous les champs']
                this.loginForm.classList.add('shake');
                setTimeout(() => {
                    this.loginForm.classList.remove('shake');
                }, 1000);
                // Tailwind create pop-up message for user to fill all fields
                this.loginForm.insertAdjacentHTML('beforebegin', `
                    <div id="popupErrorMsg" class="absolute -top-14 w-full groupomania-bg-orange text-white text-center font-bold rounded-md p-2 m-2">
                        Tout les champs doivent être remplis !
                    </div>
                `);
                setTimeout(() => {
                    document.getElementById('popupErrorMsg').remove();
                }, 5000);
                return
            }

            if(data.email.includes('@')) {
                data.email = data.email.split('@')[0]
            }

            // Add @groupomania.com to email
            data.email += '@groupomania.com';

            // TODO: Login user with axios and redirect to home page if success else display error message in console
            this.$auth.axios().post('auth/login', data)
                .then(response => {
                    this.$auth.login(response.data.user, response.data.token)
                    // Redirect to home page
                    this.$router.push('/', () => {
                        window.location.reload()
                    })
                    
                })
                .catch(error => {
                    this.loginForm.classList.add('shake');
                    setTimeout(() => {
                        this.loginForm.classList.remove('shake');
                    }, 1000);
                    // Tailwind create pop-up message for user to fill all fields
                    this.loginForm.insertAdjacentHTML('beforebegin', `
                        <div id="popupErrorMsg" class="absolute -top-14 w-full groupomania-bg-orange text-white text-center font-bold rounded-md p-2 m-2">
                            Utilisateur non trouvé ! <a href="/register" class="font-bold">S'INSCRIRE</a>
                        </div>
                    `);
                    setTimeout(() => {
                        document.getElementById('popupErrorMsg').remove();
                    }, 5000);
                    console.log(error)
                })
        },

        // Background transition
        registerBackgroundTransition() {
            setInterval(() => {
                this.loginPage.style.backgroundImage = `url(/assets/images/bg-img-login-${Math.floor(Math.random() * 4) + 1}.jpg)`;
            }, 9000);
        },
        registerScroll() {
            // scroll background image parallax
            window.addEventListener('scroll', () => {
                const scroll = window.scrollY;
                this.loginPage.style.backgroundPositionY = `${scroll * 0.5}px`;
            });
        }
    }
}
</script>

<style scoped>
    #loginPage {
    background-image: url("../../public/assets/images/bg-img-login-1.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>