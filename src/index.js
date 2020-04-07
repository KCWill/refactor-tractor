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
      dataObj.userData = response[0].userData
      dataObj.sleepData = response[1].sleepData
      dataObj.activityData = response[2].activityData
      dataObj.hydrationData = response[3].hydrationData
      // console.log(dataObj);
      return dataObj
    });

}
let dataObj = fetchUserData();
// console.log('dataObj', dataObj);
// console.log(fetchUserData());
export default fetchUserData
