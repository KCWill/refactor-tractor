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

    sleepData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      },
      {
        "userID": 1,
        "date": "2018/07/15",
        "hoursSlept": 4.1,
        "sleepQuality": 3.6
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
   
    sleep = new Sleep(sleepData);
    utility = new Utility(sleepData);

  });

  it('should be able to calculate the daily average when given relevantData', () => {
    
    expect(utility.calculateDailyAverage(1, 'hoursSlept')).to.eql(5.1)
  });

  it('should calculate a number for a user when given relevantData', () => {

    expect(utility.displayDailyData(1, "2019/06/15", 'hoursSlept')).to.eql(6.1)
  });

  it('should calculate the average', () => {

    // expect(utility.calculateAverage('sleepQuality')).to.eql()
  })


});