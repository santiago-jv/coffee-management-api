import moment from 'moment';

export class DateService {
  static hasPassedOneDay(date: Date): boolean {
    const userDate = moment(date);
    const tomorrow = userDate.clone().add(1, 'day');

    return userDate.isAfter(tomorrow);
  }
}
