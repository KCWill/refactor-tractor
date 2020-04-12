const chai = require('chai')
import { expect } from 'chai'
import domUpdates from '../src/domUpdates';
import User from '../src/User';
import UserRepo from '../src/User-repo';
import scripts from '../src/scripts.js';

const spies = require('chai-spies');

chai.use(spies);
// const sandbox = chai.spy.sandbox();

describe('DomUpdates', () => {
  let domUpdates;
  let user1;
  let user2;
  let user3;
  let user4;
  let users;
  let userRepo;
  
  beforeEach(() => {
    domUpdates = {};
    chai.spy.on(domUpdates, ['makeFriendHTML']);
    // fetchUserData();
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

  it('should call makeFriendHTML each time', () => {
    domUpdates.makeFriendHTML(user1, userRepo);
    expect(user1.getFriendsNames).to.have.been.called(1);
    expect(user1.getFriendsNames).to.have.been.called.with(userRepo);
  });

  it.only('should do something', () => {
    let cow = scripts.pickUser();
    console.log(cow)
  });

// it('should display user name', () => {
//   chai.spy.on(domUpdates,'addInfoToSidebar');
//   domUpdates.addInfoToSidebar(user2, userRepo);
//   expect(user2.getFirstName).to.have.been.called(1);
//   expect(user2.getFirstName).to.have.been.called.with();
// });
})