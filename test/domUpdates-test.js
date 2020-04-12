const chai = require('chai');
import { expect } from 'chai';

import User from '../src/User';
import UserRepo from '../src/User-repo';
import Hydration from '../src/Hydration';
import Activity from '../src/Activity';
import Sleep from '../src/Sleep';

import index from '../src/index.js';
import domUpdates from '../src/domUpdates';

import hydrationData from '../src/data/hydration.js';
import userData from '../src/data/users.js';
import sleepData from '../src/data/sleep';
import activityData from '../src/data/sleep';

const spies = require('chai-spies');

chai.use(spies);
// const sandbox = chai.spy.sandbox();

describe('DomUpdates', () => {
  let user1;
  let user2;
  let user3;
  let user4;
  let users;
  let userRepo;
  
  beforeEach(() => {
    chai.spy.on(domUpdates, ['addSleepInfo'], () => null);
    
    chai.spy.on(domUpdates, ['addHydrationInfo'], () => null);

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

    index.addSleepInfo(1, sleepInfo, userRepo, '2019/06/15', userRepo, '2019/06/22');

    expect(domUpdates.addSleepInfo).to.be.called(1);
  });

  it('should call domUpdates.addHydrationInfo', () => {
    let hydrationInfo = new Hydration(hydrationData);
    let userRepo = new UserRepo(userData);

    index.addHydrationInfo(1, hydrationInfo, '2019/06/15', userRepo, '2019/06/22');

    expect(domUpdates.addHydrationInfo).to.be.called(1);
  });

// it('should display user name', () => {
//   chai.spy.on(domUpdates,'addInfoToSidebar');
//   domUpdates.addInfoToSidebar(user2, userRepo);
//   expect(user2.getFirstName).to.have.been.called(1);
//   expect(user2.getFirstName).to.have.been.called.with();
// });
})