export type ProfileFormType = {
    classNames: string[]
    method: string
    data: Record<string, string | number>
    submitCallback?: (data?: any) => void
};
