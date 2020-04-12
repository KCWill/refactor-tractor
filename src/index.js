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
      //need this.userdata to be something so we can test it
      let user = new User(dataItem);
      array.push(user);
    })
  }, //different because it doesn't do anything domUpdates

  pickUser() {
    let min = 1;
    let max = 50;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, //different because it doesn't do anything domUpdates

  getUserById(id, listRepo) {
    return listRepo.getDataFromID(id);
  }, //different because it doesn't do anything domUpdates

  addInfoToSidebar(user, userStorage) {
    domUpdates.addInfoToSidebar(user, userStorage);
  }, //test passing

  makeWinnerID(activityInfo, user, dateString, userStorage) {
    return activityInfo.getWinnerId(user, dateString, userStorage)
  }, //doesn't do anything in domUpdates

  makeToday(userStorage, id, dataSet) {
    var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
    if (!sortedArray[0]) {
      // Invalid data, try again
      return this.makeToday(userStorage, id, dataSet);
    }
    return sortedArray[0].date;
  }, //doesn't do anything in domUpdates

  makeRandomDate(userStorage, id, dataSet) {
    var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
    return sortedArray[Math.floor(Math.random() * sortedArray.length - 1)].date
  }, //doesn't do anything in domUpdates

  addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
    domUpdates.addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString);
  }, //test passing

  addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
    domUpdates.addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString);
  }, //test passing

  addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
    domUpdates.addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
  }, // test passing

  addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
    domUpdates.addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user);
  } // test passing

};

export default index;
