import './profile.scss';
import './modules/profile-form/profile-form';

const editProfile = () => {
    const editClass = 'is-edit';
    const editPasswordClass = 'is-edit-password';

    const block = document.querySelector('.js-profile');
    const backBtn = document.querySelector('.js-profile-back');

    const editBtn = document.querySelector('.js-edit-profile');
    const editPasswordBtn = document.querySelector('.js-edit-password');
    const inputs = document.querySelectorAll('.js-profile-input');

    const activateForm = (className) => {
        block.classList.add(className);
        inputs.forEach(item => item.removeAttribute('disabled'));
        inputs[0].focus();
    };

    if (block && editBtn) {
        editBtn.addEventListener('click', () => {
            activateForm(editClass);
        });
    }

    if (block && editPasswordBtn) {
        editPasswordBtn.addEventListener('click', () => {
            activateForm(editPasswordClass);
        });
    }

    if (block && backBtn) {
        backBtn.addEventListener('click', () => {
            if (block.classList.contains(editClass) || block.classList.contains(editPasswordClass)) {
                block.classList.remove(editClass, editPasswordClass);
                inputs.forEach(item => item.setAttribute('disabled', 'true'));
            } else {
                window.history.back();
            }
        });
    }
};

editProfile();