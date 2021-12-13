export type buttonType = {
    classNames: string[]
    clickCallback?: (evt?: Event) => void
    submitCallback?: (evt?: Event) => void
    btnType: string
    text: string
}
