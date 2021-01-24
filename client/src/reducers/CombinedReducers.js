import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { me } from './Me'
import { peopleReducer } from './PeopleReducer'

const Reducers = combineReducers({
  router: routerReducer,
  me,
  people: peopleReducer,
});

export default Reducers