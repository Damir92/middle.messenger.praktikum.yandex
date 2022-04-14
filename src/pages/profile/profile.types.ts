export enum ProfileClassNamesEnum {
    'EDIT' = 'is-edit',
    'EDIT_PASSWORD' = 'is-edit-password'
}

export type ProfileType = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
};

export type ChangePasswordType = {
    oldPassword: 'string',
    newPassword: 'string'
}

export type LoginType = {
    login: string
}
