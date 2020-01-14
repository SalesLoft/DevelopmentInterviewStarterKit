import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { me } from './Me'
import { people } from './People'

const Reducers = combineReducers({
  router: routerReducer,
  me,
  people,
});

export default Reducers
