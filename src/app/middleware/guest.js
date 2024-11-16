import {user} from '/src/main.js';
function auth({ next, router }) {

    if (user.isAuth) {
        return router.push('/account');
    }
    return next();
}

export default auth;
