const weekDays = [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ];

const months = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ];

const monthsShort = [ 'Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ];

export const getTime = (date: string): string => {
    return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
}

export const getDate = (date: string): string => {
    return `${new Date(date).getDate()} ${months[new Date(date).getMonth()]}`;
}

export const chatDate = (date: string): string => {
    const nowTS = Date.now();
    const nowMonthDay = new Date().getDate();

    const dateTS = new Date(date).getTime();
    const dateMonthDay = new Date(date).getDate();

    const diffTS = nowTS - dateTS;

    if (diffTS < 0) {
        return '';
    }

    if (dateMonthDay === nowMonthDay) {
        return `${getTime(date)}`;
    }

    const diffDays = (nowTS - dateTS) / 24 / 60 / 60 / 1000;

    if (diffDays < 7) {
        return `${weekDays[new Date(date).getDay()]}`;
    }
    const dateMonth = new Date(date).getMonth();
    const dateYear = new Date(date).getFullYear();

    return `${dateMonthDay} ${monthsShort[dateMonth]} ${dateYear}`;
};
