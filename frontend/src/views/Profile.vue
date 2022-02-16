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
                    <span class="absolute right-6 top-24 font-bold">{{ $auth.getUser().firstName }} {{ $auth.getUser().lastName }}</span>
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
                            <span class="w-full text-center">{{ $auth.getUser().birthday }} 
                                <font-awesome-icon icon="birthday-cake" />
                            </span>
                        </div>
                    </div>
                    <router-link to="/" class="w-full py-2 px-4 groupomania-bg-blue text-center text-white font-bold border-2 groupomania-border-blue rounded-md mx-4 my-4 shadow-md">Créer un Post</router-link>
                </div>
            </div>
            <div class="bg-transparent w-full mb-4 mx-2 hidden lg:flex justify-center items-center relative" style="height: 74px;">
                <svg viewBox="0 0 101 18.7" fill="#ffffff">
                    <text x="-1.5" y="15" class="font-black groupomania-color-blue" style="letter-spacing:-1.6px;text-shadow: rgb(0 0 0 / 5%) 0px 4px 4px;">MES</text>
                </svg>
            </div>
            <div class="bg-transparent w-full mb-4 mx-2 flex justify-center items-center relative" style="height: 74px;">
                <svg viewBox="0 0 101 18.7" fill="#ffffff">
                    <text x="-1.5" y="15" class="font-black groupomania-color-blue" style="letter-spacing:-1.6px;text-shadow: rgb(0 0 0 / 5%) 0px 4px 4px;">PUBLICATIONS</text>
                </svg>
            </div>
            <!-- START TEMPLATE POST -->
            <div v-for="post in posts" :key="post.id" :id="post.id" class="relative bg-white w-full mb-4 mx-2 rounded-md flex justify-center items-start shadow-md overflow-hidden border border-gray-400">
                <button :id="post.id" v-on:click="deleteThePost(post.id)" class="absolute right-2 top-1">
                    <font-awesome-icon icon="trash" />
                </button>
                <div class="w-full flex flex-wrap justify-start items-center">
                    <div class="inline-flex justify-start items-center">
                        <div class="w-12 flex justify-start items-center">
                            <img src="/assets/images/icon.png" alt="Icone Groupomania" class="w-full">
                        </div>
                        <div class="flex flex-wrap justify-start items-center text-left">
                            <a href="/profile" class="postUser w-full text-sm">{{ $auth.getUser().firstName }} {{ $auth.getUser().lastName }}</a>
                            <p class="postTime text-xs text-gray-400">{{ post.updatedAt | formatDate }}</p>
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
                        <div class="w-1/3 flex justify-center items-center py-2">
                            <button class="comments-btn" v-on:click="toggleComments = !toggleComments" >
                                <font-awesome-icon icon="comment-alt" class="mr-2"/>
                                Commenter
                            </button>
                        </div>
                        <div class="w-1/3 flex justify-center items-center py-2" v-if="post.Comments.length">
                            {{ post.Comments.length }} commentaires 
                        </div>
                        <div class="w-1/3 flex justify-center items-center py-2" v-if="!post.Comments.length">
                            0 commentaire
                        </div>
                    </div>
                    <div class="comments-container w-full" v-if="!toggleComments">
                        <div class="w-full flex justify-center items-center">
                            <hr class="w-11/12 border-gray-400">
                        </div>
                        <div class="w-full justify-start items-center my-2">
                            <h3 class="ml-7 text-lg">Commentaires</h3>
                        </div>
                        <div v-for="comment in post.Comments" :key="comment.id" :id="comment.id" class="oneComment px-5">
                            <div class="inline-flex justify-start items-center">
                                <div class="flex flex-wrap justify-start items-center text-left ml-2">
                                    <a href="/profile" class="postUser w-full text-sm">{{ comment.User.firstName }} {{ comment.User.lastName }}</a>
                                    <p class="postTime text-xs text-gray-400">{{ comment.updatedAt | formatDate }}</p>
                                </div>
                            </div>
                            <div class="postContent w-full flex justify-center items-center mb-2">
                                <p class="text-left px-2">{{ comment.content }}</p>
                            </div>
                        </div>
                        <!-- <button class="createCommentBtn bg-white w-full rounded-md flex justify-between items-center overflow-hidden sticky top-14 lg:relative lg:top-0">
                            <div class="w-28 flex justify-center items-center">
                                <img src="/assets/images/icon.png" alt="Icone Groupomania" class="w-full p-2">
                            </div>
                            <div class="w-full flex justify-center items-center">
                                <div class="w-full px-4 py-2 focus:outline-none border-2 rounded-md text-gray-400 text-left">Créer un Commentaire</div>
                            </div>
                            <div class="w-28 h-full flex justify-center items-center">
                                <font-awesome-icon icon="paper-plane" class="text-gray-400" style="transform: rotate(50deg); font-size: 2rem;"/>
                            </div>
                        </button> -->
                    </div>
                </div>
            </div>
            <!-- END TEMPLATE POST -->
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
                    <span class="absolute right-6 top-24 font-bold">{{ $auth.getUser().firstName }} {{ $auth.getUser().lastName }}</span>
                </div>
                <div class="flex justify-center items-center flex-wrap mt-16">
                    <button v-on:click="updateProfHidden = !updateProfHidden" id="profileBtn" class="w-full py-2 px-4 groupomania-bg-orange text-white font-bold border-2 groupomania-border-orange rounded-md mx-4 mt-2 shadow-md">Modifier mon Profil</button>
                    <div class="flex justify-center items-center flex-wrap mt-4">
                        <div class="flex justify-center items-center flex-wrap">
                            <span class="w-full text-center">Nb. de Posts</span>
                            <span class="w-full text-center">{{ postsCounter }}
                                <font-awesome-icon icon="meteor" />
                            </span>
                        </div>
                        <div class="flex justify-center items-center flex-wrap">
                            <span class="w-full text-center">Anniversaire</span>
                            <span class="w-full text-center">{{ $auth.getUser().birthday }} 
                                <font-awesome-icon icon="birthday-cake" />
                            </span>
                        </div>
                    </div>
                    <router-link to="/" class="w-full py-2 px-4 groupomania-bg-blue text-center text-white font-bold border-2 groupomania-border-blue rounded-md mx-4 my-4 shadow-md">Créer un Post</router-link>
                </div>
            </div>
            <div class="bg-white w-full rounded-md shadow-md mt-4 sticky flex justify-center items-center flex-wrap overflow-hidden" style="top:25.5rem;">
                <div class="flex justify-start items-center h-20 groupomania-bg-blue w-full">
                    <h1 class="pl-4 text-lg text-white font-semibold">Quoi de Neuf {{ $auth.getUser().firstName }} ?</h1>
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
                                <label for="lastName" class="ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md">
                                    Nom
                                </label>
                                <input id="lastName" type="text" name="lastName" autocomplete="lastName" class="w-full px-4 py-3 border-2 rounded-md" placeholder="Nom" :value="$auth.getUser().lastName" required>
                                <label for="firstName" class="mt-4 ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md">
                                    Prénom
                                </label>
                                <input id="firstName" type="text" name="firstName" autocomplete="firstName" class="w-full px-4 py-3 border-2 rounded-md" placeholder="Prénom" :value="$auth.getUser().firstName" required>
                                <label for="birthday" class="mt-4 ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md block">
                                    Anniversaire
                                </label>
                                <input id="birthday" type="text" name="birthday" class="w-full px-4 py-3 border-2 rounded-md block" placeholder="Anniversaire" :value="$auth.getUser().birthday" disabled>
                                <label for="email" class="mt-4 ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md block">
                                    Email
                                </label>
                                <input id="email" type="email" autocomplete="email" name="email" class="w-full px-4 py-3 border-2 rounded-md block" placeholder="Email" :value="$auth.getUser().email" required disabled>
                                <label for="phone" class="mt-4 ml-2 text-center w-1/3 groupomania-bg-blue text-white rounded-t-md block">
                                    Téléphone
                                </label>
                                <input id="phone" type="tel" autocomplete="phone" name="phone" class="w-full px-4 py-3 border-2 rounded-md block" placeholder="Téléphone" :value="$auth.getUser().phone" required>
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
export default {
    data() {
        return {
            posts: [],
            updateProfHidden: true,
            toggleComments: true,
            postsCounter: 0,
        }
    },
    mounted() {
        // if user is !loggued in, redirect to login page
        if (!this.$auth.isLogged()) {
            this.$router.push('/login')
        }

        // console.log(this.$auth)

        this.getUserPosts()
    },
    methods: {

       // Get user posts
        getUserPosts() {
            this.$auth.axios().get('/posts/' + this.$auth.user.id)
                .then(response => {
                    this.posts = response.data.posts
                    console.log(response.data.posts)
                    this.postsCounter = response.data.posts.length
                })
                .catch(error => {
                    console.log(error);
                })
        },

        updateProfile() {
            const form = document.getElementById('updateProfile');
            const formData = new FormData(form);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
                console.log(key, value);
            }

            // Get user profile with userId and token
            this.$auth.axios().put('/auth/' + this.$auth.user.id, data)
                .then(response => {
                    console.log(response);
                    this.updateProfHidden = true;

                    // Update authUser in localStorage with new data from response
                    let authUser = JSON.parse(localStorage.getItem('authUser'));

                    if(response.data.user.firstName) {
                        authUser.firstName = response.data.user.firstName;
                    }
                    if (response.data.user.lastName) {
                        authUser.lastName = response.data.user.lastName;
                    }
                    if(response.data.user.phone) {
                        authUser.phone = response.data.user.phone;
                    }

                    localStorage.setItem('authUser', JSON.stringify(authUser));

                    window.location.reload()
                })
                .catch(error => {
                    console.log(error);
                })
        },

        deleteUserAccount() {
            this.$auth.axios().delete('/auth/' + this.$auth.user.id)
                .then(response => {
                    console.log(response);
                    this.$auth.logout();
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.log(error);
                })
        },

        /**
         * SUPPRESSION D'UN POST
         */
        deleteThePost(postId) {
            // Get the post id
            const postIdToDelete = postId

            this.$auth.axios().delete('posts/' + postIdToDelete )
            .then(response => {
                console.log(response)
                // Refresh the page
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
}
</script>