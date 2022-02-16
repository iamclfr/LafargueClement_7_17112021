<template>
    <div class="w-full flex flex-row items-center p-2 justify-between bg-white">
        <div class="ml-8 text-lg text-white flex">
            <router-link to="/" class="text-white">
                <img src="/assets/images/icon-left-font.png" alt="logo" class="w-48 hidden lg:flex">
                <img src="/assets/images/icon.png" alt="logo" class="w-8 flex lg:hidden">
            </router-link>
        </div>
        <div class="flex items-center mr-8">
            <button v-on:click="subHidden = !subHidden" id="userMenuBtn" class="flex items-center w-52 cursor-pointer relative">
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
                            <span class="text-sm font-bold">{{ $auth.getUser().firstName }} {{ $auth.getUser().lastName }} </span>
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
        </div>
    </div>
</template>


<script>
    export default { 
        data() {
            return {
                subHidden: true,
            }
        },
        methods: {

            // Logout function
            logOut() {
                this.$auth.logout()
                this.$router.push('/login')
            }
            
        }
    }
</script>