<template>
    <div id="registerPage" class="w-full h-screen flex justify-center items-center">
        <div class="max-w-2xl flex justify-center items-center flex-wrap bg-white rounded-md drop-shadow-2xl p-4 relative">
            <form id="registerForm" class="w-10/12 py-4 flex justify-between items-center flex-wrap">
                <div class="w-full flex justify-center items-center mb-4">
                    <img src="/assets/images/icon-left-font.png" class="max-w-xs" alt="Logo Groupomania">
                </div>
                <label for="familyName" hidden>
                    Nom
                </label>
                <input id="familyName" type="text" name="familyName" autocomplete="familyName" class="w-full px-4 py-3 border-2 rounded-md lg:w-64" placeholder="Nom" required>
                <label for="name" hidden>
                    Prénom
                </label>
                <input id="name" type="text" name="name" autocomplete="name" class="w-full px-4 py-3 mt-4 border-2 rounded-md lg:w-64 lg:mt-0" placeholder="Prénom" required>
                <label for="phone" hidden>
                    Téléphone
                </label>
                <input id="phone" type="tel" name="phone" autocomplete="tel" class="w-full px-4 py-3 mt-4 border-2 rounded-md lg:w-64" placeholder="Téléphone" required>
                <label for="birthday" hidden>
                    Anniversaire
                </label>
                <input id="birthday" type="date" name="birthday" autocomplete="bday" class="w-full px-4 py-3 mt-4 border-2 rounded-md lg:w-64" placeholder="Anniversaire" required>
                <label for="email" hidden>
                    Email
                </label>
                <div class="w-full relative mt-4">
                    <input id="email" type="email" name="email" autocomplete="email" class="w-full pl-4 pr-44 py-3 border-2 rounded-md" placeholder="Email" required>
                    <span class="absolute top-0.5 right-0.5 flex justify-center items-center py-3 px-1 bg-white rounded-r-md pointer-events-none">@groupomania.com</span>
                </div>
                <label for="password" hidden>
                    Mot de Passe
                </label>
                <input id="password" type="password" name="password" autocomplete="current-password" class="w-full px-4 py-3 mt-4 border-2 rounded-md" placeholder="Mot de Passe" required>
                <label for="confirmPassword" hidden>
                    Confirmation du mot de passe
                </label>
                <input id="confirmPassword" type="password" name="confirmPassword" autocomplete="current-password" class="w-full px-4 py-3 mt-4 border-2 rounded-md" placeholder="Confirmation Mot de Passe" required>

                <label for="submit" hidden>
                    S'inscrire'
                </label>
                <button @click="signUp" class="groupomania-bg-blue py-3 px-4 mt-4 text-white font-bold rounded-md cursor-pointer w-full">S'inscrire sur Groupomania</button>
            </form>
            <div class="w-10/12">
                <span>Vous pouvez consulter nos <a href="#" class="groupomania-color-blue">Mentions Légales</a></span>
            </div>
            <div class="w-10/12 my-2">
                <hr>
            </div>
            <div class="w-10/12">
                <span>Vous avez un compte sur Groupomania ? <a href="/login" class="groupomania-color-blue font-bold">SE CONNECTER</a></span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    data() {
        return {
            message: '',
            errors: [],
            registerPage: null,
            registerForm: null
        }
    },
    mounted() {
        // if user is loggued in, redirect to login page
        if (document.cookie.includes('userId') && document.cookie.includes('userLoggued')) {
            this.$router.push('/login')
        }
        this.registerPage = document.getElementById('registerPage')
        this.registerForm = document.getElementById('registerForm')
        this.registerBackgroundTransition()
        this.registerScroll()
    },
    methods: {
        signUp(e) {
            e.preventDefault()
            const form = document.getElementById('registerForm');
            const formData = new FormData(form);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Check if all fields are filled
            if (data.familyName === '' || data.name === '' || data.phone === '' || data.birthday === '' || data.email === '' || data.password === '' || data.confirmPassword === '') {
                console.log('Tout les champs doivent être remplis !');
                this.registerForm.classList.add('shake');
                setTimeout(() => {
                    this.registerForm.classList.remove('shake');
                }, 1000);
                // Tailwind create pop-up message for user to fill all fields
                this.registerForm.insertAdjacentHTML('beforebegin', `
                    <div id="popupErrorMsg" class="absolute top-0 lg:-top-14 w-full groupomania-bg-orange text-white text-center font-bold rounded-md p-2 m-2">
                        Tout les champs doivent être remplis !
                    </div>
                `);
                setTimeout(() => {
                    document.getElementById('popupErrorMsg').remove();
                }, 5000);
                
                this.inputs = document.querySelectorAll('input');
                this.inputs.forEach(input => {
                    if (input.value === '') {
                        input.classList.add('border-red-500');
                    } else {
                        input.classList.remove('border-red-500');
                    }
                });

                return;
            }

            if(data.email.includes('@')) {
                data.email = data.email.split('@')[0]
            }

            // Add @groupomania.com to email
            data.email += '@groupomania.com';

            // Check if passwords match
            if (data.password !== data.confirmPassword) {
                console.log(data.password);
                this.registerForm.classList.add('shake');
                setTimeout(() => {
                    this.registerForm.classList.remove('shake');
                }, 1000);
                // Tailwind create pop-up message for user to fill all fields
                this.registerForm.insertAdjacentHTML('beforebegin', `
                    <div id="popupErrorMsg" class="absolute top-0 lg:-top-14 w-full groupomania-bg-orange text-white text-center font-bold rounded-md p-2 m-2">
                        Les mots de passe ne correspondent pas !
                    </div>
                `);
                setTimeout(() => {
                    document.getElementById('popupErrorMsg').remove();
                }, 5000);
                return;
            }

            // Convert birthday to timestamp
            data.birthday = new Date(data.birthday).getTime() / 1000;

            axios.post('http://localhost:5000/api/auth/register', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response);
                this.$router.push('/login')
            })
            .catch(error => {
                this.registerForm.classList.add('shake');
                setTimeout(() => {
                    this.registerForm.classList.remove('shake');
                }, 1000);
                // Tailwind create pop-up message for user to fill all fields
                this.registerForm.insertAdjacentHTML('beforebegin', `
                    <div id="popupErrorMsg" class="absolute top-0 lg:-top-14 w-full groupomania-bg-orange text-white text-center font-bold rounded-md p-2 m-2">
                        L'utilisateur existe déjà ! <span><a href="/login">CONNEXION</a></span>
                    </div>
                `);
                setTimeout(() => {
                    document.getElementById('popupErrorMsg').remove();
                }, 5000);
                console.log(error);
            })
        },
        // Background transition
        registerBackgroundTransition() {
            setInterval(() => {
                this.registerPage.style.backgroundImage = `url(/assets/images/bg-img-login-${Math.floor(Math.random() * 4) + 1}.jpg)`;
            }, 9000);
        },
        registerScroll() {
            // scroll background image parallax
            window.addEventListener('scroll', () => {
                const scroll = window.scrollY;
                this.registerPage.style.backgroundPositionY = `${scroll * 0.5}px`;
            });
        }
    }
}

</script>

<style scoped>
    .shake {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }
    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }
        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }
        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }

    #registerPage {
        background-image: url("../../public/assets/images/bg-img-login-1.jpg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
