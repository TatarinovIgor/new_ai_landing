import apiAuthClient, {updateAuthToken} from "@/app/api/Clients/apiAuthClient.js";
import apiClient from "@/app/api/Clients/apiClient.js";
import router from "@/router/router.js";
import {ref} from "vue";

class User {
    constructor() {
        this.id = null;
        this.email = null;
        this.phone = null;
        this.balance = null;
        this.username = null;
        this.bill_email = null;
        this.city = null;
        this.country = null;
        this.name = null;
        this.zip = null;
        this.state = null;
        this.address = null;

        this._isAuth = ref(false);
    }
    async getUser() {
        return apiAuthClient.get('/user')
            .then((response) => {
                this.id = response.data.user.id;
                this.email = response.data.user.email;
                this.phone = response.data.user.phone;
                this.balance = response.data.user.balance;
                this.username = response.data.user.username;
                this.bill_email = response.data.user.bill_email;
                this.city = response.data.user.city;
                this.country = response.data.user.country;
                this.name = response.data.user.name;
                this.zip = response.data.user.zip;
                this.state = response.data.user.state;
                this.address = JSON.parse(response.data.user.address);

                this.isAuth = true;
                return response.data;
            }).catch((error) => {
                console.error(error);
                return null;
            });

    }

    get isAuth() {
        return this._isAuth.value;
    }

    set isAuth(value) {
        this._isAuth.value = value;
    }

    async logout() {
        return apiAuthClient.post('/logout')
            .then((response) => {
                localStorage.removeItem('auth_token');
                router.push('/login');
                this.isAuth = false;

                return response.data;
            }).catch((error) => {
                console.error(error);
                return null;
            });

    }

    async register(UserModel) {
        return apiClient.post('/register', UserModel)
            .then((response) => {
                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem('auth_token', token);
                    this.isAuth = true;
                    updateAuthToken(token);
                    this.getUser();
                }
                return response;
            }).catch((error) => {
                console.error(error);
                return error.response;
            });
    }

    async login(UserModel) {
        return apiClient.post('/login', UserModel)
            .then((response) => {
                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem('auth_token', token);
                    this.isAuth = true;
                    updateAuthToken(token);
                    this.getUser();
                }

                return response;
            }).catch((error) => {
                console.error(error);
                return error.response;
            });
    }

    async changePassword(UserModel) {
        return apiAuthClient.post('/change-password', UserModel)
            .then((response) => {
                return response;
            }).catch((error) => {
                console.error(error);
                return error.response;
            });
    }

    async changeInfoUser(UserModel) {
        return apiAuthClient.post('/user/info/change', UserModel)
            .then((response) => {
                return response;
            }).catch((error) => {
                console.error(error);
                return error.response;
            });

    }

    async getPaymentLink(amount) {
        return apiAuthClient.post('/payment/create', {amount: amount})
            .then((response) => {
                return response;
            }).catch((error) => {
                console.error(error);
                return error.response;
            });
    }
    async buyProduct(product_id, quality = 1) {
        return apiAuthClient.post('/product/buy', {product_id: product_id, quality: quality})
            .then((response) => {
                return response;
            }).catch((error) => {
                console.error(error);
                return error.response;
            });
    }

    async useProduct(product_id, file) {
        console.log(file);
        const formData = new FormData();
        formData.append('product_id', product_id);
        formData.append('file', file);

        return apiAuthClient.post('/product/use', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response;
        }).catch((error) => {
            console.error(error);
            return error.response;
        });
    }
    async getProduct(product_id) {
        return apiAuthClient.get(`/product/product/${product_id}`)
            .then((response) => {
                return response;
            }).catch((error) => {
                console.error(error);
                return error.response;
            });

    }

}

function getFormattedTimezone() {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const sign = offset <= 0 ? '+' : '-';
    return `UTC ${sign}${hours}`;
}

export default new User();