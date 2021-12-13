export type formInputType = {
    inputType: string
    name: string
    label: string
    value?: string
    disabled?: boolean
    error?: string
    withLabelAnimation?: boolean
    validateCallback?: () => void
};
