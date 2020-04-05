class UserRepo {
  constructor(users) {
    this.users = users;
  };
  getDataFromID(id) {
    return this.users.find((user) => id === user.id);
  };
  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  };
  calculateAverageStepGoal() {
    var totalStepGoal = this.users.reduce((sumSoFar, data) => {
      return sumSoFar = sumSoFar + data.dailyStepGoal;
    }, 0);
    return totalStepGoal / this.users.length;
  };
  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet)
    let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate
  }
  getToday(id, dataSet) { //returns one date (most resent time user was active)
    return this.makeSortedUserArray(id, dataSet)[0].date;
  };
  getFirstWeek(id, dataSet) { // returns an object, maybe only used by hydration class
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  };
  getWeekFromDate(date, id, dataSet) {
    let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  };
  chooseWeekDataForAllUsers(dataSet, date) { //returns an object with Id, date, and user activity from that week as objects
    return dataSet.filter(function(dataItem) {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
    })
  };
  chooseDayDataForAllUsers(dataSet, date) { //returns an object of that dataType from the date parameter
    return dataSet.filter(function(dataItem) {
      return dataItem.date === date
    });
  }
  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) { //returns an object of keys that are userIDs and values of arrays of datapoints(spleepquality, etc.)
    return listFromMethod.reduce(function(objectSoFar, dataItem) {
      if (!objectSoFar[dataItem.userID]) {
        objectSoFar[dataItem.userID] = [dataItem[relevantData]]
      } else {
        objectSoFar[dataItem.userID].push(dataItem[relevantData])
      }
      return objectSoFar;
    }, {});
  }
  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) { ///returns an array of userIds, according to the average of their relevant data (sleepquality, water consumed etc)
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    return Object.keys(sortedObjectKeys).sort(function(b, a) {
      return (sortedObjectKeys[a].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / sortedObjectKeys[a].length) - (sortedObjectKeys[b].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / sortedObjectKeys[b].length)
    });
  }
  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) { //returns an object with keys of userIds and values of the average of the relevant data passed in
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    let rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod)
    return rankedUsersAndAverages.map(function(rankedUser) {
      rankedUser = {
        [rankedUser]: sortedObjectKeys[rankedUser].reduce(
          function(sumSoFar, sleepQualityValue) {
            sumSoFar += sleepQualityValue
            return sumSoFar;
          }, 0) / sortedObjectKeys[rankedUser].length
      };
      return rankedUser;
    });
  }
}

export default UserRepo;
