import moment, { Moment } from "moment"

export const formatDate = (date: Moment | Date | string) => {
  return moment(date).format("YYYY-MM-DD")
}
