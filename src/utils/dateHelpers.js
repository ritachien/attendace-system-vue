import dayjs from 'dayjs'

const changeDayUntil = 5

export default {
  getRecordDate () {
    const hour = dayjs().hour()
    if (hour < changeDayUntil) {
      return dayjs().subtract(1, 'day').format('YYYY-MM-DD').toString()
    }
    return dayjs().format('YYYY-MM-DD').toString()
  },
  formatTime (dateTime) {
    return dayjs(dateTime).format('YYYY-MM-DD hh:mm:ss')
  }
}
