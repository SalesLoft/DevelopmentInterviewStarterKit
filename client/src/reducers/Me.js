import { merge } from '../utils'
import { RECEIVE_ME } from '../actions/Constants'

export function me(
  state={},
  action
) {
  switch(action.type) {
    case RECEIVE_ME:
      return merge(state, action.me)
    default:
      return state
  }
}