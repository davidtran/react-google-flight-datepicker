export function getMonthInfo(year, month, startDay) {
  const weeks = [];
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  const numDays = lastDate.getDate();

  let start = 1;
  let end = firstDate.getDay() === 0 ? 1 : (7 - firstDate.getDay() + 1);
  if (startDay === 'sunday') {
    end = 7 - firstDate.getDay();
  }
  while (start <= numDays) {
    weeks.push({ start, days: end - start + 1 });
    start = end + 1;
    end += 7;
    end = start === 1 && end === 8 ? 1 : end;
    if (end > numDays) {
      end = numDays;
    }
  }

  return { totalWeek: weeks, totalDay: numDays };
}

export function getWeekDay(startWeekDay) {
  const arrWeekDay = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  if (startWeekDay === 'sunday') {
    arrWeekDay.pop();
    arrWeekDay.unshift('S');
  }

  return arrWeekDay;
}

export function resetTimeDate(date) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);

  return newDate;
}

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
