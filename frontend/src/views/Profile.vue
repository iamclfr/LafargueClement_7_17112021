<template>
    <div class="max-w-screen-lg mx-4 lg:m-auto my-0 pt-4 flex sm:justify-center md:justify-center lg:justify-between flex-wrap">
        <div class="column-left flex justify-center items-center flex-wrap" style="width: 650px;">
            <div class="bg-white w-full rounded-md shadow-md lg:hidden flex justify-center items-center flex-wrap overflow-hidden mb-4">
                <div class="w-full relative flex justify-start h-20 groupomania-bg-blue">
                    <div class="w-40 mt-4 ml-4 relative">
                        <img src="/assets/images/icon.png" alt="Photo Utilisateur" class="w-28 rounded-md shadow-md">
                        <button class="absolute top-20 right-9 bg-white border-2 groupomania-border-blue rounded-full py-1.5 px-2">
                            <font-awesome-icon icon="camera-retro" class="groupomania-color-blue text-lg" />
                        </button>
                    </div>
                    <span class="absolute right-6 top-24 font-bold">{{ user.firstName }} {{ user.lastName }}</span>
                </div>
                <div class="flex justify-center items-center flex-wrap mt-16">
                    <button v-on:click="updateProfHidden = !updateProfHidden" class="w-full py-2 px-4 groupomania-bg-orange text-white font-bold border-2 groupomania-border-orange rounded-md mx-4 mt-2 shadow-md">Modifier mon Profil</button>
                    <div class="flex justify-center items-center flex-wrap mt-4">
                        <div class="flex justify-center items-center flex-wrap">
                            <span class="w-full text-center">Nb. de Posts</span>
                            <span class="w-full text-center">15
                                <font-awesome-icon icon="meteor" />
                            </span>
                        </div>
                        <div class="flex justify-center items-center flex-wrap">
                            <span class="w-full text-center">Anniversaire</span>
                            <span class="w-full text-center">{{ user.birthday }}
                                <font-awesome-icon icon="birthday-cake" />
                            </span>
                        </div>
                    </div>
                    <router-link to="/" class="w-full py-2 px-4 groupomania-bg-blue text-center text-white font-bold border-2 groupomania-border-blue rounded-md mx-4 my-4 shadow-md">Créer un Post</router-link>
                </div>
            </div>
            <div class="bg-transparent w-full mb-4 hidden lg:flex justify-center items-center relative" style="height: 74px;">
                <svg viewBox="0 0 101 18.7" fill="#ffffff">
                    <text x="-1.5" y="15" class="font-black groupomania-color-blue" style="letter-spacing:-1.6px;text-shadow: rgb(0 0 0 / 5%) 0px 4px 4px;">MES</text>
                </svg>
            </div>
            <div class="bg-transparent w-full mb-4 flex justify-center items-center relative" style="height: 74px;">
                <svg viewBox="0 0 101 18.7" fill="#ffffff">
                    <text x="-1.5" y="15" class="font-black groupomania-color-blue" style="letter-spacing:-1.6px;text-shadow: rgb(0 0 0 / 5%) 0px 4px 4px;">PUBLICATIONS</text>
                </svg>
            </div>
            <!-- START TEMPLATE POST -->
            <div v-for="post in posts" :key="post.id" :id="post.id" class="relative bg-white w-full mb-4 mx-2 rounded-md flex justify-center items-start shadow-md overflow-hidden border border-gray-400">
                <button v-if="post.User.isAdmin" :id="post.id" v-on:click="deleteThePost" class="absolute right-2 top-1">
                    <font-awesome-icon icon="trash" />
                </button>
                <div class="w-full flex flex-wrap justify-start items-center">
                    <div class="inline-flex justify-start items-center">
                        <div class="w-12 flex justify-start items-center">
                            <img src="/assets/images/icon.png" alt="Icone Groupomania" class="w-full">
                        </div>
                        <div class="flex flex-wrap justify-start items-center text-left">
                            <a href="/profile" class="postUser w-full text-sm">{{ post.User.firstName }} {{ post.User.lastName }}</a>
                            <p class="postTime text-xs text-gray-400">{{ post.createdAt }}</p>
                        </div>
                    </div>
                    <div class="postTitle w-full justify-start items-center my-2">
                        <h2 class="px-2 text-xl">{{ post.title }}</h2>
                    </div>
                    <div class="postContent w-full flex justify-center items-center mb-2">
                        <p class="text-left px-2">{{ post.content }}</p>
                    </div>
                    <div class="postImg w-full flex justify-center items-center">
                        <img src="/assets/images/bg-img-login-2.jpg" alt="Icone Groupomania" class="w-full">
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div class="w-2/4 flex justify-start py-2 pl-7"></div>
                        <div class="w-2/4 flex justify-end py-2 pr-7">26 Commentaires</div>
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <hr class="w-11/12 border-gray-400">
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div class="w-1/3 flex justify-center items-center py-2">
                            <button class="comments-btn">
                                <font-awesome-icon icon="comment-alt" class="mr-2"/>
                                Commenter
                            </button>
                        </div>
                        <div class="w-1/3 flex justify-center items-center py-2">
                            <button>
                                <font-awesome-icon icon="share" class="mr-2"/>
                                Partager
                            </button>
                        </div>
                    </div>
                    <div class="comments-container w-full hidden">
                        <div class="w-full flex justify-center items-center">
                            <hr class="w-11/12 border-gray-400">
                        </div>
                        <div class="w-full justify-start items-center my-2">
                            <h3 class="ml-7 text-lg">Commentaires</h3>
                        </div>
                        <div v-for="comment in post.Comments" :key="comment.id" :id="comment.id" class="oneComment px-5">
                            <div class="inline-flex justify-start items-center">
                                <div class="flex flex-wrap justify-start items-center text-left ml-2">
                                    <a href="/profile" class="postUser w-full text-sm">{{ comment.UserId }}</a>
                                    <p class="postTime text-xs text-gray-400">{{ comment.createdAt }}</p>
                                </div>
                            </div>
                            <div class="postContent w-full flex justify-center items-center mb-2">
                                <p class="text-left px-2">{{ comment.content }}</p>
                            </div>
                        </div>
                        <button class="createCommentBtn bg-white w-full rounded-md flex justify-between items-center overflow-hidden sticky top-14 lg:relative lg:top-0">
                            <div class="w-28 flex justify-center items-center">
                                <img src="/assets/images/icon.png" alt="Icone Groupomania" class="w-full p-2">
                            </div>
                            <div class="w-full flex justify-center items-center">
                                <div class="w-full px-4 py-2 focus:outline-none border-2 rounded-md text-gray-400 text-left">Créer un Commentaire</div>
                            </div>
                            <div class="w-28 h-full flex justify-center items-center">
                                <font-awesome-icon icon="paper-plane" class="text-gray-400" style="transform: rotate(50deg); font-size: 2rem;"/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <!-- END TEMPLATE POST -->
            <button class="bg-black text-white w-3/6 mb-4 rounded-md flex justify-center items-center shadow-md" style="height: 50px;">
                Voir Plus
            </button>
        </div>
        <div class="column-right hidden lg:block" style="width: 350px;">
            <div class="bg-white w-full rounded-md shadow-md z-10 sticky top-16 flex justify-center items-center flex-wrap overflow-hidden" style="margin-top: 11.3rem;">
                <div class="w-full relative flex justify-start h-20 groupomania-bg-blue">
                    <div class="w-40 mt-4 ml-4 relative">
                        <img src="/assets/images/icon.png" alt="Photo Utilisateur" class="w-28 rounded-md shadow-md">
                        <button id="profileImgBtn" class="absolute top-20 right-9 bg-white border-2 groupomania-border-blue rounded-full py-1.5 px-2">
                            <font-awesome-icon icon="camera-retro" class="groupomania-color-blue text-lg" />
                        </button>
                    </div>
                    <span class="absolute right-6 top-24 font-bold">{{ userProfile.user.name }} {{ userProfile.user.familyName }}</span>
                </div>
                <div class="flex justify-center items-center flex-wrap mt-16">
                    <button v-on:click="updateProfHidden = !updateProfHidden" id="profileBtn" class="w-full py-2 px-4 groupomania-bg-orange text-white font-bold border-2 groupomania-border-orange rounded-md mx-4 mt-2 shadow-md">Modifier mon Profil</button>
                    <div class="flex justify-center items-center flex-wrap mt-4">
                        <div class="flex justify-center items-center flex-wrap">
                            <span class="w-full text-center">Nb. de Posts</span>
                            <span class="w-full text-center">15
                                <font-awesome-icon icon="meteor" />
                            </span>
                        </div>
                        <div class="flex justify-center items-center flex-wrap">
                            <span class="w-full text-center">Anniversaire</span>
                            <span class="w-full text-center">{{ userProfile.user.birthday }}
                                <font-awesome-icon icon="birthday-cake" />
                            </span>
                        </div>
                    </div>
                    <router-link to="/" class="w-full py-2 px-4 groupomania-bg-blue text-center text-white font-bold border-2 groupomania-border-blue rounded-md mx-4 my-4 shadow-md">Créer un Post</router-link>
                </div>
            </div>
            <div class="bg-white w-full rounded-md shadow-md mt-4 sticky flex justify-center items-center flex-wrap overflow-hidden" style="top:25.5rem;">
                <div class="flex justify-start items-center h-20 groupomania-bg-blue w-full">
                    <h1 class="pl-4 text-lg text-white font-semibold">Quoi de Neuf {{ userProfile.user.name }} ?</h1>
                </div>
                <div class="w-full flex justify-center mt-4">
                    <router-link to="/" class="w-full py-2 px-4 bg-white text-center groupomania-color-blue border-2 groupomania-border-blue font-bold rounded-md mx-4 shadow-md">Dernières Publications</router-link>
                </div>
                <div class="w-full flex justify-center mt-4 mb-4">
                    <router-link to="/" class="w-full py-2 px-4 groupomania-bg-orange text-center text-white font-bold border-2 groupomania-border-orange rounded-md mx-4 shadow-md">Créer un Post</router-link>
                </div>
            </div>
            <button id="backToTop" class="bg-black text-white w-1/2 mx-auto rounded-md shadow-md mt-4 sticky flex justify-center items-center">
                <h1>Retourner en Haut</h1>
            </button>
        </div>
        <!-- Start Edit Profile Modal -->
        <div v-if="!updateProfHidden" id="profilModal" class="fixed z-10 inset-0 top-16 lg:top-0 overflow-hidden" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="flex justify-center w-full flex-wrap">
                            <h3 class="text-lg leading-6 font-medium text-gray-900 flex w-full" id="modal-title">Modifier mon Profil</h3>
                            <form id="updateProfile" action="#" method="post" class="w-10/12 py-4 flex justify-start items-center flex-wrap">
                                <label for="familyName" class="ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md">
                                    Nom
                                </label>
                                <input id="familyName" type="text" name="familyName" autocomplete="familyName" class="w-full px-4 py-3 border-2 rounded-md" placeholder="Nom" :value="userProfile.user.familyName" required>
                                <label for="name" class="mt-4 ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md">
                                    Prénom
                                </label>
                                <input id="name" type="text" name="name" autocomplete="name" class="w-full px-4 py-3 border-2 rounded-md" placeholder="Prénom" :value="userProfile.user.name" required>
                                <label for="phone" class="mt-4 ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md">
                                    Téléphone
                                </label>
                                <input id="phone" type="tel" name="phone" autocomplete="tel" class="w-full px-4 py-3 border-2 rounded-md" placeholder="Téléphone" :value="userProfile.user.phone" required>
                                <label for="birthday" class="mt-4 ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md hidden lg:block">
                                    Anniversaire
                                </label>
                                <input id="birthday" type="text" name="birthday" class="w-full px-4 py-3 border-2 rounded-md hidden lg:block" placeholder="Anniversaire" :value="userProfile.user.birthday" disabled>
                                <label for="email" class="mt-4 ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md hidden lg:block">
                                    Email
                                </label>
                                <input id="email" type="email" autocomplete="email" name="email" class="w-full px-4 py-3 border-2 rounded-md hidden lg:block" placeholder="Email" :value="userProfile.user.email" required disabled>
                                <label for="password" class="mt-4 ml-2 text-center w-5/12 lg:w-1/3 groupomania-bg-blue text-white rounded-t-md">
                                    Mot de Passe
                                </label>
                                <input id="password" type="password" autocomplete="new-password" name="password" class="w-full px-4 py-3 border-2 rounded-md" placeholder="Mot de Passe" required>
                            </form>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 flex lg:justify-between flex-wrap justify-center sm:px-6 ">
                        <button v-on:click="deleteUserAccount()" id="deleteAccount" class="w-auto hidden lg:flex justify-center items-center rounded-md border groupomania-border-orange shadow-sm px-2 py-0 groupomania-bg-orange text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" type="button">
                            Supprimer le Compte
                        </button>
                        <div class="flex justify-between items-center">
                            <button v-on:click="updateProfHidden = true" id="closeProfilModal" type="button" class="w-full flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Annuler
                            </button>
                            <button v-on:click="updateProfile()" type="button" class="w-full flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 groupomania-bg-blue text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                                ENREGISTRER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Edit Profile Modal -->
        <!-- Start Change Profile Picture -->
        <div id="profilImgModal" class="fixed z-10 inset-0 top-16 lg:top-0 overflow-hidden hidden" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="flex justify-center w-full flex-wrap">
                            <h3 class="text-lg leading-6 font-medium text-gray-900 flex w-full" id="modal-title">Changer la Photo de Profil</h3>
                            <form id="profilePicture" action="#" method="post" class="w-10/12 py-4 flex justify-center items-center flex-wrap">
                                <label for="changePicture" class="cursor-pointer mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 groupomania-bg-orange text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                                    Choisir une Nouvelle Photo
                                </label>
                                <input type="file" name="changePicture" id="changePicture" class="opacity-0 overflow-hidden absolute" style="width:.1px;height:.1px;z-index:-1; ">
                            </form>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 groupomania-bg-blue text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                            ENREGISTRER
                        </button>
                        <button id="closeImgModal" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Change Profile Picture -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            posts: null,
            user: {},
            updateProfHidden: true,
        }
    },
    mounted() {
        // if user is !loggued in, redirect to login page
        if (!localStorage.getItem('userToken') || !localStorage.getItem('userLoggued')) {
            this.$router.push('/login')
        }

        console.log(this.$auth)

        this.getUser();
        this.getUserPosts()
    },
    methods: {
        /**
         * RÉCUPÉRATION DE l'UTILISATEUR
         */
        getUser() {
            //  eslint-disable-next-line
            const userToken = localStorage.getItem('userToken');
            const userId = localStorage.getItem('userId');
            axios.get('http://localhost:5000/api/auth/' + userId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            })
            .then(response => {
                this.user = response.data.user
                console.log(response.data.user)
            })
            .catch(error => {
                console.log(error)
            })
        },
        // updateProfile() {
        //     //  eslint-disable-next-line
        //     const userToken = localStorage.getItem('userToken');
        //     const userId = localStorage.getItem('userId');

        //     const form = document.getElementById('updateProfile');
        //     const formData = new FormData(form);
        //     const data = {};

        //     for (let [key, value] of formData.entries()) {
        //         data[key] = value;
        //         console.log(key, value);
        //     }

        //     // Get user profile with userId and token
        //     axios.put('http://localhost:5000/api/auth/' + userId, {
        //         id: userId,
        //         familyName: data.familyName,
        //         name: data.name,
        //         phone: data.phone,
        //         password: data.password,

        //         }, {
        //             headers: {
        //                 Authorization: 'Bearer ' + userToken
        //             }
        //         })
        //         .then(response => {
        //             console.log(response);
        //             this.updateProfHidden = true;
        //             this.getUserProfile();
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         })
        // },
        // deleteUserAccount() {
        //     // Get cookie user id and token
        //     //  eslint-disable-next-line
        //     const userId = localStorage.getItem('userId');
        //     //  eslint-disable-next-line
        //     const userToken = localStorage.getItem('userToken');

        //     // Delete user account with userId and token
        //     axios.delete('http://localhost:5000/api/auth/' + userId, {
        //             headers: {
        //                 Authorization: 'Bearer ' + userToken
        //             }
        //         })
        //         .then(response => {
        //             console.log(response);
        //             // Delete cookie userId, token, userLoggued
        //             localStorage.clear()
        //             this.$router.push('/login', () => {
        //                 window.location.reload()
        //             })
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         })
        // },

        // Get user posts
        getUserPosts() {
            //  eslint-disable-next-line
            const userId = localStorage.getItem('userId');
            //  eslint-disable-next-line
            const userToken = localStorage.getItem('userToken');

            axios.get('http://localhost:5000/api/posts/' + userId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    }
                })
                .then(response => {
                    this.posts = response.data.posts
                    console.log(response.data.posts)
                })
                .catch(error => {
                    console.log(error);
                })
        },

        deletePost() {
            //  eslint-disable-next-line
            const userToken = localStorage.getItem('userToken');

            const postId = 2

            // Delete user account with userId and token
            axios.delete('http://localhost:5000/api/posts/' + postId, {
                    headers: {
                        Authorization: 'Bearer ' + userToken
                    }
                })
                .then(response => {
                    console.log(response);
                    this.getUserPosts();
                })
                .catch(error => {
                    console.log(error);
                })
        },
    },
}
</script>