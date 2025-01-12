import moment from "moment"

export const getMonthDays = (currentDate: string) => {
  const startOfMonth = moment(currentDate).startOf("month")
  const endOfMonth = moment(currentDate).endOf("month")

  const startOfGrid = startOfMonth.clone().startOf("week")
  const endOfGrid = endOfMonth.clone().endOf("week")

  const days: moment.Moment[] = []
  let currentDay = startOfGrid.clone()
  while (currentDay.isSameOrBefore(endOfGrid, "day")) {
    days.push(currentDay.clone())
    currentDay.add(1, "day")
  }

  return days
}