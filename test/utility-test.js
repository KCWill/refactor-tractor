/* eslint-disable max-len */
import { expect } from 'chai';
import Utility from '../src/Utility';

describe ('Utility', () => {
  let sleepData;
  let utility;

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

    utility = new Utility(sleepData);

  });

  it('should be able to calculate the daily average when given relevantData', () => {
    
    expect(utility.calculateDailyAverage(1, 'hoursSlept')).to.eql(5.1)
  });

  it('should calculate a number for a user when given relevantData', () => {

    expect(utility.displayDailyData(1, "2019/06/15", 'hoursSlept')).to.eql(6.1)
  });

  it('should calculate the average', () => {

    expect(utility.calculateAverage('sleepQuality')).to.eql(2.9000000000000004)
  });

});