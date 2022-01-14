<template>
    <div class="max-w-screen-lg mx-4 lg:m-auto my-0 pt-4 flex sm:justify-center md:justify-center lg:justify-between flex-wrap">
        <div class="column-left flex justify-center items-center flex-wrap" style="width: 650px;">
            <div class="bg-transparent w-full mb-4 flex justify-center items-center relative" style="height: 74px;">
                <!-- <span class="absolute w-full h-full groupomania-color-blue text-center font-extrabold" style="font-size:4.44621vw;">MES PUBLICATIONS</span> -->
                <svg viewBox="0 0 101 18.7" fill="#ffffff">
                    <text x="-1.5" y="15" class="font-black groupomania-color-blue" style="letter-spacing:-1.6px;text-shadow: rgb(0 0 0 / 5%) 0px 4px 4px;">PUBLICATIONS</text>
                </svg>
            </div>
            <button v-on:click="createPostHidden = !createPostHidden" class="createPostBtn bg-white w-full mb-4 rounded-md flex justify-between items-center shadow-md overflow-hidden sticky top-14 lg:relative lg:top-0">
                <div class="w-28 flex justify-center items-center">
                    <img src="/assets/images/icon.png" alt="Icone Groupomania" class="w-full p-2">
                </div>
                <div class="w-full flex justify-center items-center">
                    <div class="w-full px-4 py-2 focus:outline-none border-2 rounded-md text-gray-400 text-left">Créer un Post</div>
                </div>
                <div class="w-28 h-full flex justify-center items-center">
                    <font-awesome-icon icon="paper-plane" class="text-gray-400" style="transform: rotate(50deg); font-size: 2rem;"/>
                </div>
            </button>
            <!-- START TEMPLATE POST -->
            <div v-for="post in posts" :key="post.id" :id="post.id" class="relative bg-white w-full mb-4 rounded-md flex justify-center items-start shadow-md overflow-hidden border border-gray-400">
                <button v-if="isAdmin" :id="post.id" v-on:click="deleteThePost" class="absolute right-2 top-1">
                    <font-awesome-icon icon="trash" />
                </button>
                <div class="w-full flex flex-wrap justify-start items-center">
                    <div class="inline-flex justify-start items-center">
                        <div class="w-12 flex justify-start items-center">
                            <img src="/assets/images/icon.png" alt="Icone Groupomania" class="w-full">
                        </div>
                        <div class="flex flex-wrap justify-start items-center text-left">
                            <a href="/profile" class="postUser w-full text-sm">USER ID : {{ post.userId }}</a>
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
                        <div class="w-2/4 flex justify-start py-2 pl-7">154 Likes</div>
                        <div class="w-2/4 flex justify-end py-2 pr-7">26 Commentaires</div>
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <hr class="w-11/12 border-gray-400">
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div class="w-1/3 flex justify-center items-center py-2">
                            <button>
                                <font-awesome-icon icon="thumbs-up" class="mr-2"/>
                                J'aime
                            </button>
                        </div>
                        <div class="w-1/3 flex justify-center items-center py-2">
                            <button>
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
                </div>
            </div>
            <!-- END TEMPLATE POST -->
        </div>
        <div class="column-right hidden lg:block" style="width: 350px;">
            <div class="bg-white w-full rounded-md shadow-md flex justify-center items-center flex-wrap overflow-hidden" style="margin-top: 5.6rem;">
                <div class="flex justify-start items-center h-20 groupomania-bg-blue w-full">
                    <h1 class="pl-4 text-lg text-white font-semibold">Groupoma'Stats</h1>
                </div>
                <div class="w-full">
                    <ul class="w-full pl-4">
                        <li class="w-full font-normal mt-4">Nb. de Posts : <span class="font-semibold" id="postStats">{{ postsCounter }}</span></li>
                        <li class="w-full font-normal mt-4">Nb. de Likes : <span class="font-semibold" id="likeStats">15</span></li>
                        <li class="w-full font-normal mt-4">Nb. de Commentaires : <span class="font-semibold" id="remarkStats">15</span></li>
                        <li class="w-full font-normal mt-4 mb-4">Nb. d'Utilisateurs : <span class="font-semibold" id="remarkStats">15</span></li>
                        <li class="w-full font-normal mt-4 mb-4">Dernière Inscription : <span class="font-semibold" id="remarkStats">John Doe</span></li>
                    </ul>
                </div>
            </div>
            <div class="bg-white w-full rounded-md shadow-md mt-4 sticky top-16 flex justify-center items-center flex-wrap overflow-hidden">
                <div class="flex justify-start items-center h-20 groupomania-bg-blue w-full">
                    <h1 class="pl-4 text-lg text-white font-semibold">Quoi de Neuf ?</h1>
                </div>
                <div class="w-full flex justify-center mt-4">
                    <router-link to="/profile" class="w-full py-2 px-4 bg-white text-center groupomania-color-blue border-2 groupomania-border-blue font-bold rounded-md mx-4 shadow-md">Voir mon Profil</router-link>
                </div>
                <div class="w-full flex justify-center mt-4 mb-4">
                    <button v-on:click="createPostHidden = !createPostHidden" class="createPostBtn w-full py-2 px-4 groupomania-bg-orange text-center text-white font-bold border-2 groupomania-border-orange rounded-md mx-4 shadow-md">Créer un Post</button>
                </div>
            </div>
            <button id="backToTop" class="bg-black text-white w-1/2 mx-auto rounded-md shadow-md mt-4 sticky flex justify-center items-center">
                <h1>Retourner en Haut</h1>
            </button>
        </div>
        <!-- Start Create Post Modal -->
        <div v-if="!createPostHidden" id="formPostModal" class="fixed z-10 inset-0 top-16 lg:top-0 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-hidden">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div>
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Créer une Publication</h3>
                                <form id="formCreatePost" enctype="multipart/form-data" class="flex flex-wrap w-full">
                                    <div class="mt-2 w-full">
                                        <label for="title" class="hidden">Titre</label>
                                        <input id="title" type="text" name="title" placeholder="Titre" required class="flex w-full px-2 py-3 focus:outline-none border-2 rounded-md" />
                                    </div>
                                    <div class="w-full flex justify-center items-center mt-2">
                                        <div class="w-full">
                                            <label for="content" class="hidden">Description</label>
                                            <div class="mt-1 rounded-md">
                                                <textarea id="content" name="content" required class="block w-full px-2 py-3 focus:outline-none border-2 rounded-md resize-none" rows="5" placeholder="Description"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-2 flex justify-start items-center w-full">
                                        <label for="postImage" class="cursor-pointer w-full inline-flex justify-center rounded-md border-2 groupomania-border-orange shadow-sm px-4 py-2 bg-white text-base font-medium groupomania-color-orange focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm">Choisir une Image</label>
                                        <input type="file" name="postImage" id="postImage" class="opacity-0 overflow-hidden absolute" style="width:.1px;height:.1px;z-index:-1;">
                                    </div>
                                    <div class="px-4 py-3 flex justify-end items-center w-full">
                                        <button v-on:click="createPostHidden = true" id="closeModal" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Annuler
                                        </button>
                                        <button v-on:click="createPost" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 groupomania-bg-blue text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                                        PUBLIER
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Create Post Modal -->

    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
        return {
            createPostHidden: true,
            posts: [],
            postsCounter: 0,
            isAdmin: false
        }
    },
    methods: {

        /**
         * CRÉATION D'UN POST
         */
        createPost(event) {
            event.preventDefault()
            const form = document.getElementById('formCreatePost')
            const formData = new FormData(form)
            const data = {}

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (data.title === '' || data.content === '') {
                this.errors = ['Veuillez remplir tous les champs']
                form.classList.add('shake');
                setTimeout(() => {
                    form.classList.remove('shake');
                }, 1000);
                // Tailwind create pop-up message for user to fill all fields
                form.insertAdjacentHTML('beforebegin', `
                    <div id="popupErrorMsg" class="absolute -top-14 w-full groupomania-bg-orange text-white text-center font-bold rounded-md p-2 m-2">
                        Tout les champs doivent être remplis !
                    </div>
                `);
                setTimeout(() => {
                    document.getElementById('popupErrorMsg').remove();
                }, 5000);
                return
            }

            //  eslint-disable-next-line
            const userToken = localStorage.getItem('userToken');
            //  eslint-disable-next-line
            const userId = localStorage.getItem('userId');

            axios.post('http://localhost:5000/api/posts', data , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            })
            .then(response => {
                console.log(response)
                this.createPostHidden = true
                // Refresh the page
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
        },

        /**
         * RÉCUPÉRATION DE TOUT LES POSTS
         */

        getAllPosts() {
            //  eslint-disable-next-line
            const userToken = localStorage.getItem('userToken');
            axios.get('http://localhost:5000/api/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            })
            .then(response => {
                this.posts = response.data.posts
                console.log(response.data.posts)
                this.postsCounter = response.data.postsCounter
                console.log(this.postsCounter)
            })
            .catch(error => {
                console.log(error)
            })
        },

        /**
         * SUPPRESSION D'UN POST
         */
        deleteThePost() {
            //  eslint-disable-next-line
            const userToken = localStorage.getItem('userToken');

            const postId = this.postId

            axios.delete('http://localhost:5000/api/posts/' + postId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            })
            .then(response => {
                console.log(response)
                // Refresh the page
                // window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        
        /**
         * VÉRIFICATION SI L'UTILISATEUR EST BIEN CONNECTÉ ET QUE SON ID EST BIEN RÉCUPÉRÉ
         */

        if (!localStorage.getItem('userToken') || !localStorage.getItem('userLoggued')) {
            this.$router.push('/login')
        }

        if(localStorage.getItem('isAdmin') === 'true') {
            this.isAdmin = true
        }

        this.getAllPosts();
    }
}
</script>