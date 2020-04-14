import $ from 'jquery';

const domUpdates = {

  makeFriendHTML(user, userStorage) {
    return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
  },
  addInfoToSidebar(user, userStorage) {
    $('#sidebarName').text(user.name);
    $('#headerText').text(`${user.getFirstName()}'s Activity Tracker`);
    // header.innerText = (`${user.getFirstName()}'s Activity Tracker`)
    $('#stepGoalCard').text(`Your daily step goal is ${user.dailyStepGoal}.`);
    $('#avStepGoalCard').text(`The average daily step goal is ${userStorage.calculateAverageStepGoal()}`);
    $('#userAddress').text(user.address);
    $('#userEmail').text(user.email);
    $('#userStridelength').text(`Your stridelength is ${user.strideLength} meters.`);
    $(this.makeFriendHTML(user, userStorage)).insertAfter($("#friendList"));
    // $(makeFriendHTML(user, userStorage)).insertAfter($("#friendList"))
  },
  addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
    $(`<p>You drank</p><p><span class="number">${Math.round(hydrationInfo.calculateDailyOunces(id, dateString))}</span></p><p>oz water today.</p>`).insertAfter($("#hydrationToday"));
    $(`<p>Your average water intake is</p><p><span class="number">${Math.round(hydrationInfo.calculateAverageOunces(id))}</span></p> <p>oz per day.</p>`).insertAfter($("#hydrationAverage"));
    $(this.makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id))).insertAfter($("#hydrationThisWeek"));
    $(this.makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage))).insertAfter($("#hydrationEarlierWeek"));
  },

  makeHydrationHTML(id, hydrationInfo, userStorage, method) {
    return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
  },

  addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
    $(`<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`).insertAfter($("#sleepToday"));
    $(`<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`).insertAfter($("#sleepQualityToday"));
    $(`<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() *100)/100}</span></p><p>out of 5.</p>`).insertAfter($("#avUserSleepQualityToday"));
    $(this.makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage))).insertAfter($("#sleepThisWeek"));
    $('#sleepEarlierWeek').html(this.makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
    // this.sleepEarlierWeek.insertAdjacentHTML('afterBegin', this.makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
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
    $(this.makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps"))).insertAfter($('#userStepsThisWeek'));
    $(this.makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs"))).insertAfter($('#userStairsThisWeek'));
    $(this.makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive"))).insertAfter($('#userMinutesThisWeek'))
    $(this.makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps"))).insertAfter($('#bestUserSteps'));
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
    $(this.makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage))).insertAfter($('#friendChallengeListToday'));
    $(this.makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps'))).insertAfter($('#streakList'));
    $(this.makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive'))).insertAfter($('#streakListMinutes'));
    $(this.makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage))).insertAfter($('#friendChallengeListHistory'));
    $('#bigWinner').text(`THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`);
  },

  makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
    return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  },

  makeStepStreakHTML(id, activityInfo, userStorage, method) {
    return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  }

}
export default domUpdates;
