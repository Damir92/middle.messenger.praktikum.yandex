export enum profileClassNamesEnum {
    'EDIT' = 'is-edit',
    'EDIT_PASSWORD' = 'is-edit-password'
}

export type profileType = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
};

export type changePasswordType = {
    oldPassword: 'string',
    newPassword: 'string'
}

export type loginType = {
    login: string
}
