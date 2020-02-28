export function getWeeksInMonth(year, month, startDay) {
  const weeks = []
  const firstDate = new Date(year, month - 1, 1)
  const lastDate = new Date(year, month, 0)
  const numDays = lastDate.getDate()

  let start = 1
  let end = 7 - firstDate.getDay()
  if (startDay === 'monday') {
    if (firstDate.getDay() === 0) {
      end = 1
    } else {
      end = 7 - firstDate.getDay() + 1
    }
  }
  while (start <= numDays) {
    weeks.push({ start, days: end - start + 1 })
    start = end + 1
    end += 7
    end = start === 1 && end === 8 ? 1 : end
    if (end > numDays) {
      end = numDays
    }
  }

  return weeks
}

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

