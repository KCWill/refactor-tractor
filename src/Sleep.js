/* eslint-disable max-len */
import sleepData from './data/sleep';
import Utility from '../src/Utility'

class Sleep extends Utility {
  constructor(sleepData) {
    super(sleepData);
    this.sleepData = sleepData;
  }
  calculateAverageSleep(id) {
    let relevantData = 'hoursSlept'
    return this.calculateDailyAverage(id, relevantData);
  }
  calculateAverageSleepQuality(id) {
    let relevantData = 'sleepQuality'
    return this.calculateDailyAverage(id, relevantData);
  }
  calculateDailySleep(id, date) {
    let relevantData = 'hoursSlept'
    return this.displayDailyData(id, date, relevantData)
  }
  calculateDailySleepQuality(id, date) {
    let relevantData = 'sleepQuality'
    return this.displayDailyData(id, date, relevantData)
  }
  calculateWeekSleep(date, id, userRepo) {
    return 'calculateWeekSleep', userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }
  calculateWeekSleepQuality(date, id, userRepo) {
    return 'calculate weeks sleep quality', userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  }
  calculateAllUserSleepQuality() {
    let relevantData = 'sleepQuality'
    return this.calculateAverage(relevantData);
  }
  determineBestSleepers(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, 'sleepQuality', timeline);

    return Object.keys(userSleepObject).filter(function(key) {
      return (userSleepObject[key].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / userSleepObject[key].length) > 3
    }).map(function(sleeper) {
      return userRepo.getDataFromID(parseInt(sleeper)).name;
    })
  }
  determineSleepWinnerForWeek(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    // console.log(timeline);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'sleepQuality', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  determineSleepHoursWinnerForDay(date, userRepo) {
    let timeline = userRepo.chooseDayDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter(function(element) {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });

    let bestSleeperIds = bestSleepers.map(function(bestSleeper) {
      return (Object.keys(bestSleeper));
    });

    return bestSleeperIds.map(function(sleepNumber) {
      return userRepo.getDataFromID(parseInt(sleepNumber)).name;
    });
  }
}


export default Sleep;
