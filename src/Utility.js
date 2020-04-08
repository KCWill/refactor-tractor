import sleepData from './data/sleep';
import hydrationData from './data/sleep';
import activityData from './data/sleep';


class Utility {
  //needs to take in date info from somewhere
  constructor(dataSet) {
    this.dataSet = dataSet;
    // this.isSleep = dataSet === sleepData;
    // this.isHydration = dataSet === hydrationData;
    // this.isActivity = dataSet === activityData;
  }

  calculateDailyAverage(id, relevantData) {
    // console.log(this.dataSet, relevantData);
    // returns relevantData(sleepQUality etc. daily average for users data)
    let perDayAmount = this.dataSet.filter((data) => id === data.userID);
    return perDayAmount.reduce((sumSoFar, data) => {
      return sumSoFar += data[relevantData];
    }, 0) / perDayAmount.length;
  }

  displayDailyData(id, date, relevantData) { // returns single datapoint for a user on a day
    return this.dataSet.find((data) => id === data.userID && date === data.date)[relevantData];
    // console.log(findDailyData);
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
  // displayWeeklyData(date, id, relevantData) { //possibly unique to Sleep Class, displays a string and a list of dates and sleepData
  //   return 'calculateWeekSleep', userRepo.getWeekFromDate(date, id, this.dataSet).map((data) => `${data.date}: ${data.relevantData}`);
  // }


  // getToday(dataSet) {
  //   return this.makeSortedUserArray(id, dataSet)[0].date;
  // };
  // getFirstWeek(hydrationData) {
  //   return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  // };
  // getWeekFromDate(date, id, dataSet) {
  //   let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
  //   return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  // };
  // chooseWeekDataForAllUsers(dataSet, date) {
  //   return dataSet.filter(function(dataItem) {
  //     return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
  //   })
  // };
  // chooseDayDataForAllUsers(dataSet, date) {
  //   return dataSet.filter(function(dataItem) {
  //     return dataItem.date === date
  //   });
  // }
// }

// hoursSleptWeekOf(weekStart) {
//   weekStart = new Date(weekStart);
//   // Inclusive date range so only add 6 to get a 7 day period
//   let weekEnd = this.addDays(weekStart, 6);
//   let data = this.sleepData.filter(function(obj) {
//     var date = new Date(obj.date);
//     return date >= weekStart && date <= weekEnd;
//   });
//   let hoursSlept = data.map(function(obj) {
//     return obj.hoursSlept;
//   });
//   return hoursSlept;



export default Utility;
