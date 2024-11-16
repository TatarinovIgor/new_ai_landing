import {user} from '/src/main.js';

async function auth({ next, router }) {


    if (!localStorage.getItem('auth_token')) {
        return router.push('/login');
    }


    return next();
}

export default auth;
