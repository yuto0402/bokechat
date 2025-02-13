import dayjs from "dayjs";
import 'dayjs/locale/ja.js';

export const getMonth = (month = dayjs().month()) => {
  dayjs.locale('ja');
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  const days = dayjs(new Date(year, month+1, 0)).date();
  const lastDayOfTheMonth = dayjs(new Date(year, month+1, 0)).day();
  const extra = 6 - lastDayOfTheMonth
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const dayList = new Array(days + extra - currentMonthCount).fill(null).map(() => {
    currentMonthCount++;
    return dayjs(new Date(year, month, currentMonthCount));
  });
  const calendar = [];
  for (let i = 0; i < dayList.length; i += 7) {
    calendar.push(dayList.slice(i, i+7));
  }
  return calendar;
}
