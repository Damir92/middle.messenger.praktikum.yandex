import { buttonType } from './button.types';

export const buttonTemplate = ({ classNames, btnType, text }: buttonType): string => `
button(class="${classNames.join(' ')}" type="${btnType}") ${text}`;
