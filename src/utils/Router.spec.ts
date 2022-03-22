import { expect } from 'chai';

// eslint-disable-next-line no-undef
describe('Проверка переходов у Роута', () => {
    // eslint-disable-next-line no-undef
    it('При переходе на новую страницу меняется history', () => {
        window.history.pushState({page: 'sing-in'}, 'Auth', '/sign-in');
        window.history.pushState({page: 'sign-up'}, 'Registration', '/sign-up');
        expect(window.history.length).to.eq(3);
    });
});
