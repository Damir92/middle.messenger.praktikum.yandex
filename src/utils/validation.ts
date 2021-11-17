type inputValidationType = {
    name: string
    value: string
}

export const inputValidation = ({ name, value }: inputValidationType): boolean => {
    const nameRegexp = /^[A-ZА-ЯЁ]{1}[a-zA-Zа-яёА-ЯЁ-]*$/g;
    const loginRegexp = /^[\w-]{3,20}$/g;
    const numberRegexp = /^\d+/g;
    const emailRegexp = /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/g;
    const passwordRegexp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,40}/g;
    const phoneRegexp = /^\+?\d{10,15}/g;
    const messageRegexp = /.+/g;

    switch(name) {
    case 'first_name':
    case 'second_name':
        return nameRegexp.test(value);
    case 'login':
        return loginRegexp.test(value) && !numberRegexp.test(value);
    case 'email':
        return emailRegexp.test(value);
    case 'password':
    case 'newPassword':
        return passwordRegexp.test(value);
    case 'phone':
        return phoneRegexp.test(value);
    case 'message':
        return messageRegexp.test(value);
    }

    return true;
};
