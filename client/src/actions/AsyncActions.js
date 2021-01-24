import * as actions from './Actions'

export const creds = { credentials: 'same-origin' };

export function fetchMe() {
  return dispatch => {
    return fetch('/api/me.json', creds).
      then(response => response.json()).
      then(me => dispatch(actions.receiveMe(me)));
  }
}

export function fetchPeople() {
  return dispatch => {
    return fetch('api/people.json').
      then(response => response.json()).
      then(people => dispatch(actions.updatePeople(people)))
  }
}