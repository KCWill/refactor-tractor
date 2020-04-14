import { expect } from 'chai';
import Utility from '../src/Utility';

import sleepData from '../src/data/sleep';
import Sleep from '../src/sleep';

import UserRepo from '../src/User-repo';
import User from '../src/User';
// import userData from '../data/users';



describe ('Utility', () => {
  let sleepData;
  let utility;
  let sleep;
  let user1;

  beforeEach( () => {

    let sleepData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      }];

    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 5000,
      friends: [2, 3, 4]
    });
   
    let sleep = new Sleep(sleepData);
    let utility = new Utility(sleepData);
  });

  it('should be able to calculate the daily average amount when given a dataSet', () => {

    
     console.log(utility.calculateDailyAverage(1, sleepData['hoursSlept']))
    
  })


});