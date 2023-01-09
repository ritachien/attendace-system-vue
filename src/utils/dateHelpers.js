import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

const changeDayUntil = 5

export default {
  getRecordDate () {
    const date = dayjs().tz('Asia/Taipei')
    const hour = date.hour()
    if (hour < changeDayUntil) {
      return date.subtract(1, 'day').format('YYYY-MM-DD').toString()
    }
    return date.format('YYYY-MM-DD').toString()
  },
  formatTime (dateTime) {
    return dayjs(dateTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  },
}
