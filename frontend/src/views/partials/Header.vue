<template>
    <div class="w-full flex flex-row items-center p-2 justify-between bg-white">
        <div class="ml-8 text-lg text-white flex">
            <router-link to="/" class="text-white">
                <img src="/assets/images/icon-left-font.png" alt="logo" class="w-48 flex">
            </router-link>
        </div>
        <div class="w-50 md:w-1/3 h-10 relative hidden lg:flex">
            <label for="search" class="absolute left-2 top-2 cursor-pointer">
                <font-awesome-icon icon="search" />
            </label>
            <input id="search" type="search" name="search" placeholder="Rechercher un Utilisateur"
                class="flex-grow px-10 focus:outline-none border-2 rounded-md" />
        </div>
        <div class="flex items-center mr-8">
            <button v-on:click="subHidden = !subHidden" id="userMenuBtn" class="hidden md:flex items-center w-60 cursor-pointer relative">
                <div class="w-full max-w-full flex items-center">
                    <div class="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-8" viewBox="0 0 24 24"
                            stroke="#1A1A1B">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <svg class="absolute bottom-0 right-0 text-green-600" viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#46d160">
                            <circle cx="6" cy="6" r="4"></circle>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z">
                            </path>
                        </svg>
                    </div>
                    <div class="flex justify-start item-center flex-wrap ml-2">
                        <div class="flex w-full">
                            <!-- Display user name -->
                            <span class="text-sm font-bold">{{ userProfile.user.name }} {{ userProfile.user.familyName }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div v-if="!subHidden" id="subMenu" class="justify-start items-center absolute w-full bg-white shadow-md rounded-b-md p-2 pt-4 top-11 transition-all duration-300">
                    <ul>
                        <li class="text-gray-500 text-xs uppercase">Mon Espace</li>
                        <li class="mt-2">
                            <router-link to="/profile" class="text-md flex" title="Accédez à votre profil">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Mon Profil
                            </router-link>
                        </li>
                        <li class="text-gray-500 text-xs uppercase mt-2">Interface</li>
                        <li id="nightShift" class="mt-2 flex justify-start">
                            <svg id="svgNightShift" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Nigth Shift
                        </li>
                        <li class="mt-2 flex justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            Dark Mode
                        </li>
                        <hr class="mt-2 w-full"/>
                        <li class="mt-2 flex justify-start" @click="logOut">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Déconnexion
                        </li>
                    </ul>
                </div>
            </button>
            <button v-on:click="subHidden = !subHidden" class="md:hidden flex items-center cursor-pointer relative">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
            </button>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    export default { 
        data() {
            return {
                userProfile: {},
                subHidden: true,
                // userMenuBtn: false,
                // nightShift: false,
            }
        },
        mounted() {
            this.getUserProfile();
            // this.userMenuBtn = document.getElementById('userMenuBtn');
            // this.subMenu = document.getElementById('subMenu');
            // this.nightShift = document.getElementById('nightShift');
            // this.btnToggleSubMenu()
            // this.btnToggleNightShift()
        },
        methods: {
            getUserProfile() {
                // Get cookie user id and token
                //  eslint-disable-next-line
                const userId = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                //  eslint-disable-next-line
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

                // Get user profile with userId and token
                axios.get('http://localhost:5000/api/auth/' + userId, {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.userProfile = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            // On click on user menu button display sub menu
            // btnToggleSubMenu() {
            //     this.userMenuBtn.addEventListener('click', () => {
            //         this.subMenu.classList.toggle('hidden');
            //     })
            // },
            // // On click on night shift button display night shift
            // btnToggleNightShift() {
            //     this.nightShift.addEventListener('click', () => {
            //         if (!document.getElementById('scripty-night-mode')) {
            //             var background_color = "#fac563";
            //             var opacity = "0.6080";
                        
            //             var divId = "scripty-night-mode";
            //             var div = document.createElement("div");
            //             div.id = divId;
            //             div.setAttribute(
            //                 "style",
            //                 `transition: opacity 0.1s ease 0s;
            //                 z-index: 2147483647;
            //                 margin: 0;
            //                 border-radius: 0;
            //                 padding: 0;
            //                 background: ${background_color};
            //                 pointer-events: none;
            //                 position: fixed;
            //                 top: -10%;
            //                 right: -10%;
            //                 width: 120%;
            //                 height: 120%;
            //                 opacity: ${opacity};
            //                 mix-blend-mode: multiply;
            //                 display: block;`
            //             );
            //             if (!document.getElementById(divId)) {
            //                 document.documentElement.appendChild(div);
            //             }
            //             document.querySelector('#nightShift svg').setAttribute('fill', '#000')
            //         } else {
            //             document.getElementById('scripty-night-mode').remove();
            //             document.querySelector('#nightShift svg').setAttribute('fill', '#fff')
            //         }
            //     })
            // },

            // Logout function
            logOut() {
                // Remove all cookies
                document.cookie.split(";").forEach(function(c) {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                window.location.href = '/login';
            }
            
        }
    }
</script>