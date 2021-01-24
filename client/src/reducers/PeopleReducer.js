export function peopleReducer(
  state = [],
  action
) {
  switch (action.type) {
    case 'UPDATE_PEOPLE':
      return action.people
    default:
      return state
  }
}