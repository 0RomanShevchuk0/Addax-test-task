import moment from "moment"

export const getMonthDays = (currentDate: string) => {
  const startOfGrid = moment(currentDate).startOf("month").startOf("isoWeek")
  const endOfGrid = moment(currentDate).endOf("month").endOf("isoWeek")

  const days: moment.Moment[] = []
  let currentDay = startOfGrid.clone()
  while (currentDay.isSameOrBefore(endOfGrid, "day")) {
    days.push(currentDay.clone())
    currentDay.add(1, "day")
  }

  return days
}
