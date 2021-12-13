export type formType = {
    method: string
    template?: string
    submitCallback?: () => void
    additionalValidation?: (inputs: HTMLElement[]) => boolean
};
