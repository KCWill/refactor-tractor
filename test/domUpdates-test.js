/* eslint-disable max-len */
const chai = require('chai');
import { expect } from 'chai';

import User from '../src/User';
import UserRepo from '../src/User-repo';
import Hydration from '../src/Hydration';
import Activity from '../src/Activity';
import Sleep from '../src/Sleep';

import index from '../src/index.js';
import domUpdates from '../src/domUpdates';

const spies = require('chai-spies');

chai.use(spies);

describe('DomUpdates', () => {
  let user1;
  let user2;
  let user4;
  let users;
  let userRepo;
  let activityData;

  beforeEach(() => {
    chai.spy.on(domUpdates, ['addSleepInfo'], () => null);

    chai.spy.on(domUpdates, ['addHydrationInfo'], () => null);

    chai.spy.on(domUpdates, ['addInfoToSidebar'], () => null);

    chai.spy.on(domUpdates, ['addActivityInfo'], () => null);

    chai.spy.on(domUpdates, ['addFriendGameInfo'], () => null);

    activityData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
    },
    {
      "userID": 3,
      "date": "2019/06/15",
      "numSteps": 7402,
      "minutesActive": 116,
      "flightsOfStairs": 33
    },
    {
      "userID": 4,
      "date": "2019/06/15",
      "numSteps": 3486,
      "minutesActive": 114,
      "flightsOfStairs": 32
    },
    {
      "userID": 5,
      "date": "2019/06/15",
      "numSteps": 11374,
      "minutesActive": 213,
      "flightsOfStairs": 13
    },
    {
      "userID": 6,
      "date": "2019/06/15",
      "numSteps": 14810,
      "minutesActive": 287,
      "flightsOfStairs": 18
    },
    {
      "userID": 7,
      "date": "2019/06/15",
      "numSteps": 2634,
      "minutesActive": 107,
      "flightsOfStairs": 5
    },
    {
      "userID": 11,
      "date": "2019/06/15",
      "numSteps": 10333,
      "minutesActive": 114,
      "flightsOfStairs": 31
    },
    {
      "userID": 11,
      "date": "2019/06/15",
      "numSteps": 6389,
      "minutesActive": 41,
      "flightsOfStairs": 33
    },
    {
      "userID": 10,
      "date": "2019/06/15",
      "numSteps": 8015,
      "minutesActive": 106,
      "flightsOfStairs": 37
    },
    {
      "userID": 11,
      "date": "2019/06/15",
      "numSteps": 11652,
      "minutesActive": 20,
      "flightsOfStairs": 24
    },
    {
      "userID": 12,
      "date": "2019/06/15",
      "numSteps": 9256,
      "minutesActive": 108,
      "flightsOfStairs": 2
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "numSteps": 5000,
      "minutesActive": 12,
      "flightsOfStairs": 14
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "numSteps": 9303,
      "minutesActive": 45,
      "flightsOfStairs": 9
    },
    {
      "userID": 1,
      "date": "2019/06/18",
      "numSteps": 3000,
      "minutesActive": 62,
      "flightsOfStairs": 23
    },
    {
      "userID": 1,
      "date": "2019/06/19",
      "numSteps": 9303,
      "minutesActive": 4,
      "flightsOfStairs": 2
    },
    {
      "userID": 1,
      "date": "2019/06/20",
      "numSteps": 9303,
      "minutesActive": 7,
      "flightsOfStairs": 4
    },
    {
      "userID": 1,
      "date": "2019/06/21",
      "numSteps": 12000,
      "minutesActive": 13,
      "flightsOfStairs": 26
    },
    {
      "userID": 1,
      "date": "2019/06/22",
      "numSteps": 9303,
      "minutesActive": 21,
      "flightsOfStairs": 14
    },
    {
      "userID": 1,
      "date": "2019/06/23",
      "numSteps": 9000,
      "minutesActive": 8,
      "flightsOfStairs": 9
    }
    ];

    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });
    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });
    const user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });
    user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
  });

  afterEach(() => {
    chai.spy.restore(domUpdates);
  });

  it('should call addSleepInfo each time', () => {
    let sleepInfo = new Sleep(sleepData);
    let userRepo = new UserRepo(userData);

    index.addSleepInfo(1, sleepInfo, '2019/06/15', userRepo, '2019/06/22');

    expect(domUpdates.addSleepInfo).to.be.called(1)
    expect(domUpdates.addSleepInfo).to.be.called.with(sleepInfo, 1, '2019/06/15', userRepo, '2019/06/22');
  });

  it('should call domUpdates.addHydrationInfo', () => {
    let hydrationInfo = new Hydration(hydrationData);
    let userRepo = new UserRepo(userData);

    index.addHydrationInfo(1, hydrationInfo, '2019/06/15', userRepo, '2019/06/22');

    expect(domUpdates.addHydrationInfo).to.be.called(1);
    expect(domUpdates.addHydrationInfo).to.be.called.with.exactly(1, hydrationInfo, '2019/06/15', userRepo, '2019/06/22');

  });

  it('should call addInfoToSidebar', () => {

    index.addInfoToSidebar(user1, userRepo);
    expect(domUpdates.addInfoToSidebar).to.be.called(1);
    expect(domUpdates.addInfoToSidebar).to.be.called.with.exactly({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    }, userRepo);

  });

  it('should call addActivityInfo', () => {

    let activityInfo = new Activity(activityData);

    index.addActivityInfo(1, activityInfo, '2019/06/15', userRepo, '2019/06/22', user1, 3);

    expect(domUpdates.addActivityInfo).to.be.called(1);
    expect(domUpdates.addActivityInfo).to.be.called.with.exactly(1, activityInfo, '2019/06/15', userRepo, '2019/06/22', user1, 3);
  });

  it('should call addFriendGameInfo', () => {

    let activityInfo = new Activity(activityData);

    index.addFriendGameInfo(1, activityInfo, userRepo, '2019/06/15', '2019/06/22', user1);
    expect(domUpdates.addFriendGameInfo).to.be.called(1);
    expect(domUpdates.addFriendGameInfo).to.be.called.with.exactly(1, activityInfo, userRepo, '2019/06/15', '2019/06/22', user1);
  });
})
