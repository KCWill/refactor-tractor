import sleepData from './data/sleep';
import hydrationData from './data/sleep';
import activityData from './data/sleep';


class Utility {
  constructor(dataSet) {
    this.dataSet = dataSet;
  }

  calculateDailyAverage(id, relevantData) {
    let perDayAmount = this.dataSet.filter((data) => id === data.userID);
    return perDayAmount.reduce((sumSoFar, data) => {
      return sumSoFar += data[relevantData];
    }, 0) / perDayAmount.length;
  }

  displayDailyData(id, date, relevantData) {
    return this.dataSet.find((data) => id === data.userID && date === data.date)[relevantData];
    return findDailyData[relevantData];
  }

  calculateAverage(relevantData) {
    let relevantDataSum = this.dataSet.reduce(function(sumSoFar, dataItem) {
      sumSoFar += dataItem.relevantData;
      return sumSoFar;
    }, 0)
    return relevantDataSum / this.dataSet.length
  }
}

export default Utility;
