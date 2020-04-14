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
})

$('#hydration-form').submit((event) => {
  event.preventDefault();
  let hydrationForm = new FormData();
  hydrationForm.append('userID', +`${$('#hydration-Id').val()}`);
  hydrationForm.append('date', `${$('#date-hydration').val()}`);
  hydrationForm.append('numOunces', +`${$('#ounces').val()}`);
  console.log(...hydrationForm);
})
