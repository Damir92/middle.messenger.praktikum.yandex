import { AuthController } from './services/auth';
import { Router } from './utils/Router';
import { AuthPage } from './pages/auth/auth';
import RegistrationPage from './pages/registration/registration'
import ProfilePage from './pages/profile/profile';
import { ChatsPage } from './pages/chats/chats';
import { Error404Page } from './pages/404/404';
import { Error500Page } from './pages/500/500';

import './index.scss';
import store from './services/store';

const router = new Router('.root');

window.onload = async () => {
    let chatsPageComponent: any = AuthPage;
    let settingsPageComponent: any = AuthPage;
    let authPageComponent: any = AuthPage;
    let user = null;

    const currentUser = await new AuthController().user();

    if (currentUser.status === 200) {
        chatsPageComponent = ChatsPage;
        settingsPageComponent = ProfilePage;
        authPageComponent = ChatsPage;
        user = JSON.parse(currentUser.response);
        store.previousSet('user', user);
    }

    if (window.location.pathname === '/' && currentUser.status === 200) {
        window.location.href = '/messenger'
    } else if (['/messenger', '/settings'].includes(window.location.pathname) && currentUser.status !== 200) {
        window.location.href = '/'
    }

    router
        .use('/', authPageComponent)
        .use('/sign-up', RegistrationPage)
        .use('/settings', settingsPageComponent)
        .use('/messenger', chatsPageComponent)
        .use('/404', Error404Page)
        .use('/500', Error500Page)
        .start();
};
