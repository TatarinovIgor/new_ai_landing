import axios from 'axios';
const apiAuthClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL   ,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    },
});
export function updateAuthToken(token) {
    apiAuthClient.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default apiAuthClient;