import * as actions from './Constants'

export function receiveMe(me) {
  return {
    type: actions.RECEIVE_ME,
    me
  }
}

export function updatePeople(people) {
  return {
    type: 'UPDATE_PEOPLE',
    people
  }
}