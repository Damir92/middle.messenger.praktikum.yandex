export type FormType = {
    method: string
    template?: string
    submitCallback?: (payload?: Record<string, string>) => void
    additionalValidation?: (inputs: HTMLElement[]) => boolean
};
