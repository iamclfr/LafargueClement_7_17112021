import axios from 'axios';

export default class {
    constructor() {
        this.user = null;
        this.token = null;
        this.fromStorage();
    }

    login(user = null, token = null) {
        this.user = user;
        this.token = token;
        this.toStorage();

        console.log(this.user)
    }

    getToken() {
        return this.token;
    }

    getUser() {
        return this.user;
    }

    isLogged() {
        return this.user !== null && this.token !== null;
    }

    logout() {
        this.user = null;
        this.token = null;
        this.toStorage();
    }

    fromStorage() {
        let token = localStorage.getItem('authToken');
        let user = localStorage.getItem('authUser');

        if (token && user) {
            this.token = token;
            this.user = JSON.parse(user);
        } else {
            this.token = null;
            this.user = null;
        }
    }

    toStorage() {
        if (this.token && this.user) {
            localStorage.setItem('authToken', this.token);
            localStorage.setItem('authUser', JSON.stringify(this.user));
        } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
        }
    }

    axios() {
        let authHeaders = {}

        if (this.isLogged()) {
            authHeaders['Authorization'] = 'Bearer ' + this.getToken()
        }

        return axios.create({
            baseURL: 'http://localhost:5000/api/',
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...authHeaders
            }
        })
    }
}