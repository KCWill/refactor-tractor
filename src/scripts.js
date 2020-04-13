import './css/base.scss';
import './css/style.scss';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import index from './index';

const datepicker = require('js-datepicker');

let userData;
let sleepData;
let activityData;
let hydrationData;

function fetchUserData() {
  let fetchedUserData =
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
    .then(response => response.json());

  let fetchedSleepData =
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
    .then(response => response.json());

  let fetchedActivityData =
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
    .then(response => response.json());

  let fetchedHydrationData =
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
    .then(response => response.json());

  return Promise.all([fetchedUserData, fetchedSleepData, fetchedActivityData, fetchedHydrationData])
    .then(response => {
      let dataObj = {};
      dataObj.userData = response[0].userData;
      dataObj.sleepData = response[1].sleepData;
      dataObj.activityData = response[2].activityData;
      dataObj.hydrationData = response[3].hydrationData;
      // console.log(dataObj);
      return dataObj;
    });
}

fetchUserData().then(data => {
  userData = data.userData;
  sleepData = data.sleepData;
  activityData = data.activityData;
  hydrationData = data.hydrationData;
}).then(function() {
  index.startApp(userData, sleepData, activityData, hydrationData);
});
// .catch(error => console.log(error.message))

const hydrationDate = datepicker('#date-hydration', {
  formatter: (input, date, instance) => {
    const value = date.toISOString().slice(0, 10).replace(/-/g, "/");
    input.value = value;
  }
});

const activityDate = datepicker('#date-activity-picker', {
  formatter: (input, date, instance) => {
    const value = date.toISOString().slice(0, 10).replace(/-/g, "/");
    input.value = value;
  }
});

const sleepDate = datepicker('#date-sleep', {
  formatter: (input, date, instance) => {
    const value = date.toISOString().slice(0, 10).replace(/-/g, "/");
    input.value = value;
  }
});

$('#hydration-ounces').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

$('#hydration-Id').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

$('#activity-Id').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

$('#steps').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

$('#minutes-active').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

$('#flights-of-stairs').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

$('#sleep-id').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

$('#hours-slept').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

$('#minutes-active').bind('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});



$('#hydration-form').submit((event) => {
  event.preventDefault();
  let hydrationForm = {
    userID: +$('#hydration-Id').val(),
    date: $('#date-hydration').val(),
    numOunces: +$('#ounces').val()
  }
  let url = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData";
  postData(url, hydrationForm)
});

$('#activity-form').submit((event) => {
  event.preventDefault();
  let activityForm = {
    userID: +$('#activity-Id').val(),
    date: $('#date-activity-picker').val(),
    numSteps: +$('#steps').val(),
    minutesActive: +$('#minutes-active').val(),
    flightsOfStairs: +$('#flights-of-stairs').val()
  }
  let url = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData";
  postData(url, activityForm);
});

$('#sleep-form').submit((event) => {
  event.preventDefault();
  let sleepForm = {
    userID: +$('#sleep-id').val(),
    date: $('#date-sleep').val(),
    hoursSlept: +$('#hours-slept').val(),
    sleepQuality: +$('#sleep-quality').val()
  }
  let url = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData";
  postData(url, sleepForm);
});

function postData(url, form) {
  if (form.userID < 51 && form.userID > 0) {
    fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }
}
