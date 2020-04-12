import './css/base.scss';
import './css/style.scss';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import fetchUserData from './index'
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import domUpdates from '../src/domUpdates';


var historicalWeek = document.querySelectorAll('.historicalWeek');
let userData;
let sleepData;
let activityData;
let hydrationData;



const scripts = {
  
  startApp() {
    let userList = [];
    scripts.makeUsers(userList);
    let userRepo = new UserRepo(userList);
    let hydrationRepo = new Hydration(hydrationData);
    let sleepRepo = new Sleep(sleepData);
    let activityRepo = new Activity(activityData);
    var userNowId = scripts.pickUser();
    let userNow = scripts.getUserById(userNowId, userRepo);
    let today = scripts.makeToday(userRepo, userNowId, hydrationData);
    let randomHistory = scripts.makeRandomDate(userRepo, userNowId, hydrationData);
    $('.historicalWeek').each((index, value) => {$(value).append(`Week of ${randomHistory}`);
    });
    scripts.addInfoToSidebar(userNow, userRepo);
    scripts.addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
    scripts.addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
    let winnerNow = scripts.makeWinnerID(activityRepo, userNow, today, userRepo);
    scripts.addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
    scripts.addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
  },

  makeUsers(array) {
    userData.forEach(function(dataItem) {
      let user = new User(dataItem);
      array.push(user);
    })
  },//stay

  pickUser() {
    return Math.floor(Math.random() * 50);
  },//stay

  getUserById(id, listRepo) {
    return listRepo.getDataFromID(id);
  },//stay

  addInfoToSidebar(user, userStorage) {
    domUpdates.addInfoToSidebar(user, userStorage);
  },

  makeWinnerID(activityInfo, user, dateString, userStorage) {
    return activityInfo.getWinnerId(user, dateString, userStorage)
  }, //stay in scripts

  makeToday(userStorage, id, dataSet) {
    var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
    return sortedArray[0].date;
  }, //stay in scripts

  makeRandomDate(userStorage, id, dataSet) {
    var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
    return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
  }, //stay in scripts

  addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
    domUpdates.addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString);
  },

  makeHydrationHTML(id, hydrationInfo, userStorage, method) {
    domUpdates.makeHydrationHTML(id, hydrationInfo, userStorage, method);
  },

  addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
    domUpdates.addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString);
  },

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
}

fetchUserData().then(data => {
  userData = data.userData;
  sleepData = data.sleepData;
  activityData = data.activityData;
  hydrationData = data.hydrationData;
})
  .then(scripts.startApp)
  // .catch(error => console.log(error.message))

export default scripts;