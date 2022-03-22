export type profileFormType = {
    classNames: string[]
    method: string
    data: Record<string, string | number>
    submitCallback?: (data?: any) => void
};
