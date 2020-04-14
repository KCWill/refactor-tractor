import sleepData from './data/sleep';
import activityData from './data/activity';
import hydrationData from './data/hydration';


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
    let dataRow = this.dataSet.find((data) => id === data.userID && date === data.date);
    if (!dataRow) {
      // Invalid data, try again
      alert(`Data does not exist for ${id} ${date}`);
    }
    return dataRow[relevantData];
  }

  calculateAverage(relevantData) {
    let relevantDataSum = this.dataSet.reduce(function(sumSoFar, dataItem) {
    
      sumSoFar += dataItem[relevantData];
      return sumSoFar;
    }, 0)
    return relevantDataSum / this.dataSet.length
  }
}

export default Utility;
