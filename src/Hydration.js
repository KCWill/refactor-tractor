/* eslint-disable max-len */
import Utility from '../src/Utility'


class Hydration extends Utility {
  constructor(hydrationData) {
    super(hydrationData);
    this.hydrationData = hydrationData;
  }
  calculateAverageOunces(id) {
    let relevantData = 'numOunces'
    return this.calculateDailyAverage(id, relevantData);
  }
  calculateDailyOunces(id, date) {
    let relevantData = 'numOunces';
    return this.displayDailyData(id, date, relevantData)
  }
  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
  calculateRandomWeekOunces(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
}


export default Hydration;
