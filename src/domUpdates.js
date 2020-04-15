/* eslint-disable max-len */
import $ from 'jquery';

const domUpdates = {

  makeFriendHTML(user, userStorage) {
    return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
  },
  addInfoToSidebar(user, userStorage) {
    $('#sidebarName').text(user.name);
    $('#headerText').text(`${user.getFirstName()}'s Activity Tracker`);
    $('#stepGoalCard').text(`Your daily step goal is ${user.dailyStepGoal}.`);
    $('#avStepGoalCard').text(`The average daily step goal is ${userStorage.calculateAverageStepGoal()}`);
    $('#userAddress').text(user.address);
    $('#userEmail').text(user.email);
    $('#userStridelength').text(`Your stride length is ${user.strideLength} meters.`);
    $('#friendList').append(this.makeFriendHTML(user, userStorage))
  },

  addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
    $(`<p>You drank</p><p><span class="number">${Math.round(hydrationInfo.calculateDailyOunces(id, dateString))}</span></p><p>oz water today.</p>`).insertAfter($("#hydrationToday"));
    $(`<p>Your average water intake is</p><p><span class="number">${Math.round(hydrationInfo.calculateAverageOunces(id))}</span></p> <p>oz per day.</p>`).insertAfter($("#hydrationAverage"));
    $("#hydrationThisWeek").append(this.makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id)));
    $("#hydrationEarlierWeek").append(this.makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage)))
  },

  makeHydrationHTML(id, hydrationInfo, userStorage, method) {
    return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
  },

  addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
    $(`<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`).insertAfter($("#sleepToday"));
    $(`<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`).insertAfter($("#sleepQualityToday"));
    $(`<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`).insertAfter($("#avUserSleepQualityToday"));
    $('#sleepThisWeek').append(this.makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)));
    $('#sleepEarlierWeek').html(this.makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
  },

  makeSleepHTML(id, sleepInfo, userStorage, method) {
    return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('')
  },

  makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
    return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
  },

  addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
    $(`<p>Stair Count:</p><p>You</><p><span class="number">${Math.round(activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs'))}</span></p>`).insertAfter($('#userStairsToday'));
    $(`<p>Stair Count: </p><p>All Users</p><p><span class="number">${Math.round(activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs'))}</span></p>`).insertAfter($('#avgStairsToday'));
    $(`<p>Step Count:</p><p>You</p><p><span class="number">${Math.round(activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps'))}</span></p>`).insertAfter($('#userStepsToday'))
    $(`<p>Step Count:</p><p>All Users</p><p><span class="number">${Math.round(activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps'))}</span></p>`).insertAfter($('#avgStepsToday'));
    $(`<p>Active Minutes:</p><p>You</p><p><span class="number">${Math.round(activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive'))}</span></p>`).insertAfter($('#userMinutesToday'));
    $(`<p>Active Minutes:</p><p>All Users</p><p><span class="number">${Math.round(activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive'))}</span></p>`).insertAfter($('#avgMinutesToday'));
    $('#userStepsThisWeek').append(this.makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps")))
    $('#userStairsThisWeek').append(this.makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs")))
    $('#userMinutesThisWeek').append(this.makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive")));
    $('#bestUserSteps').append(this.makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")))
  },

  makeStepsHTML(id, activityInfo, userStorage, method) {
    return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
  },

  makeStairsHTML(id, activityInfo, userStorage, method) {
    return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
  },

  makeMinutesHTML(id, activityInfo, userStorage, method) {
    return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
  },

  addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
    // $(this.makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage))).insertAfter($('#friendChallengeListToday'));
    $("#friendChallengeListToday").append(this.makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)))
    $('#streakList').append(this.makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
    $('#streakListMinutes').append(this.makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
    // $(this.makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage))).insertAfter($('#friendChallengeListHistory'));
    $("#friendChallengeListHistory").append(this.makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)))
    $('#bigWinner').text(`THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`);
  },

  makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
    return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  },

  makeStepStreakHTML(id, activityInfo, userStorage, method) {
    return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  },

  clearFormInputs() {
    $('.input').each(function() {
      $(this).val('')
    });
  },

  displayAlertMessage(form) {
    $(`#submit-message-${form}`).toggleClass('hidden');
    this.removeSuccessMessage(form);
  },

  removeSuccessMessage(form) {
    setTimeout(function() {
      $(`#submit-message-${form}`).toggleClass('hidden');
    }, 5000);
  }


};
export default domUpdates;
