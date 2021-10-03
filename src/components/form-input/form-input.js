import '../button/button.scss';
import './form-input.scss';

export const formLabel = () => {
    const activeClass = 'is-active';
    const items = document.querySelectorAll('.js-form-label');

    items.forEach(item => {
        const input = item.querySelector('input');

        if (input) {
            input.addEventListener('input', (evt) => {
                if (evt.target.value.length) {
                    item.classList.add(activeClass);
                } else {
                    item.classList.remove(activeClass);
                }
            });
        }
    });
};