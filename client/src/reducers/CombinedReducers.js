import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { me } from './Me'

const Reducers = combineReducers({
  router: routerReducer,
  me,
});

export default Reducers