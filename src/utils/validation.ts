type inputValidationType = {
    name: string
    value: string
}

export const inputValidation = ({ name, value }: inputValidationType): boolean => {
    const nameRegExp = /^[A-ZА-ЯЁ]{1}[a-zA-Zа-яёА-ЯЁ-]*$/g;
    const loginRegExp = /^[\w-]{3,20}$/g;
    const numberRegExp = /^\d+/g;
    const emailRegExp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/g;
    const passwordRegExp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,40}/g;
    const phoneRegExp = /^\+?\d{10,15}/g;
    const messageRegExp = /.+/g;

    switch(name) {
    case 'first_name':
    case 'second_name':
        return nameRegExp.test(value);
    case 'login':
        return loginRegExp.test(value) && !numberRegExp.test(value);
    case 'email':
        return emailRegExp.test(value);
    case 'password':
    case 'newPassword':
        return passwordRegExp.test(value);
    case 'phone':
        return phoneRegExp.test(value);
    case 'message':
        return messageRegExp.test(value);
    }

    return true;
};
