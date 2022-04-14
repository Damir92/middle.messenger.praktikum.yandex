export type ButtonType = {
    classNames: string[]
    clickCallback?: (evt?: Event) => void
    submitCallback?: (evt?: Event) => void
    btnType: string
    text: string
}
