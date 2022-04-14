export type FormInputType = {
    inputType: string
    name: string
    label: string
    value?: string
    disabled?: boolean
    autocomplete?: boolean
    error?: string
    withLabelAnimation?: boolean
    validateCallback?: () => void
};
