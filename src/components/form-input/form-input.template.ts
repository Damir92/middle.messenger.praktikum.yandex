import { formInputType } from './form-input.types';

export const formInputTemplate = ({ inputType, name, label, value = '', disabled = false, autocomplete = true, error }: formInputType) => `
label
    span ${label}
    input(type="${inputType}" name="${name}" value="${value}" ${autocomplete ? '' : 'autocomplete="off"'} ${disabled ? 'disabled' : ''})
if ${Boolean(error)}
    .form-error= "${error}"`;
