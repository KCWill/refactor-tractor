import $ from 'jquery';

const domUpdates = {
  makeFriendHTML(user, userStorage) {
    console.log(userStorage);
    return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
  },
}
export default domUpdates;
