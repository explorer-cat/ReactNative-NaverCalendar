/**
 * @title Date 객체를 스트링 형태의 날짜로 변환해줍니다.
 * @param date
 * @returns {string}
 */
export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


/**
 * 스트링 형태의 날짜를 주면 분리해서 json으로 만들어줌.
 * @param dateString
 * @returns {{month: *, year: *, day: *}}
 */
export function parseDateString(dateString) {
    const [year, month, day] = dateString.split('-');

    return {
        year,
        month: String(parseInt(month)), // 단일 자리 월에 0을 붙이지 않도록 변환
        day: String(parseInt(day))      // 단일 자리 일에 0을 붙이지 않도록 변환
    };
}

/**
 * @title 해당 년월이 몇주차까지 표시되는지 반환합니다.
 * @param year
 * @param month
 * @returns {number}
 */
export function getWeeksInMonth(year, month) {
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // ISO 주차 표준에 따라서 첫 주의 길이를 계산
    const firstWeekLength = 8 - firstDayOfWeek;

    // 전체 주차 계산
    const totalWeeks = Math.ceil((lastDay - firstWeekLength + 1) / 7) + 1;

    return totalWeeks;
}


