import moment from 'moment';

export const formatDateToDatetimeLocal = (date: Date): string => {
  return moment(date).format('YYYY-MM-DDTHH:mm');
};

export const parseDatetimeLocalToDate = (dateString: string): Date => {
  return moment(dateString).toDate();
};
