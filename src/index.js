// // This is the JavaScript entry file - your code begins here
// // Do not delete or rename this file ********
//
// // An example of how you import jQuery into a JS file if you use jQuery in that file
// import $ from 'jquery';
//
// // An example of how you tell webpack to use a CSS (SCSS) file
// import './css/base.scss';
//
// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
//
// console.log('This is the JavaScript entry file - your code begins here.');

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import domUpdates from '../src/domUpdates';
// console.log('dataObj', dataObj);
// console.log(fetchUserData());
const index = {
  userData: {},
  startApp(userData, sleepData, activityData, hydrationData) {
    this.userData = userData;
    let userList = [];
    index.makeUsers(userList);
    let userRepo = new UserRepo(userList);
    let hydrationRepo = new Hydration(hydrationData);
    let sleepRepo = new Sleep(sleepData);
    let activityRepo = new Activity(activityData);
    var userNowId = index.pickUser();
    let userNow = index.getUserById(userNowId, userRepo);
    let today = index.makeToday(userRepo, userNowId, hydrationData);
    let randomHistory = index.makeRandomDate(userRepo, userNowId, hydrationData);
    index.addInfoToSidebar(userNow, userRepo);
    index.addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
    index.addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
    let winnerNow = index.makeWinnerID(activityRepo, userNow, today, userRepo);
    index.addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
    index.addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
  },

  makeUsers(array) {
    this.userData.forEach(function(dataItem) {
      let user = new User(dataItem);
      array.push(user);
    })
  },//stay

  pickUser() {
    let min = 1;
    let max = 50;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },//stay

  getUserById(id, listRepo) {
    return listRepo.getDataFromID(id);
  },//stay

  addInfoToSidebar(user, userStorage) {
    domUpdates.addInfoToSidebar(user, userStorage);
  },

  makeWinnerID(activityInfo, user, dateString, userStorage) {
    return activityInfo.getWinnerId(user, dateString, userStorage)
  }, //stay in index

  makeToday(userStorage, id, dataSet) {
    var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
    if (!sortedArray[0]) {
      // Invalid data try again
      return this.makeToday(userStorage, id, dataSet);
    }
    return sortedArray[0].date;
  }, //stay in index

  makeRandomDate(userStorage, id, dataSet) {
    var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
    
    return sortedArray[Math.floor(Math.random() * sortedArray.length - 1)].date
  }, //stay in index

  addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
    domUpdates.addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString);
  }, //test passing

  // makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  //   alert(1)
  //   debugger
  //   domUpdates.makeHydrationHTML(id, hydrationInfo, userStorage, method);
  // }, doesn't seem to be getting called

  addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
    domUpdates.addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString);
  }, //test passing

  makeSleepHTML(id, sleepInfo, userStorage, method) {
    domUpdates.makeSleepHTML(id, sleepInfo, userStorage, method);
  },

  makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
    domUpdates.makeSleepQualityHTML(id, sleepInfo, userStorage, method);
  },

  addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
    domUpdates.addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
  },

  makeStepsHTML(id, activityInfo, userStorage, method) {
    domUpdates.makeStepsHTML(id, activityInfo, userStorage, method);
  },

  makeStairsHTML(id, activityInfo, userStorage, method) {
    domUpdates.makeStairsHTML(id, activityInfo, userStorage, method);
  },

  makeMinutesHTML(id, activityInfo, userStorage, method) {
    domUpdates.makeMinutesHTML(id, activityInfo, userStorage, method);
  },

  addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
    domUpdates.addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user);
  },

  makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
    domUpdates.makeFriendChallengeHTML(id, activityInfo, userStorage, method);
  },

  makeStepStreakHTML(id, activityInfo, userStorage, method) {
    domUpdates.makeStepStreakHTML(id, activityInfo, userStorage, method)
  }
};

export default index;
