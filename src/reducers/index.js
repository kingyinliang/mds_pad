
import { combineReducers } from 'redux'
import userReducer from './userReducer'
import kjmakingReducer from './kjmakingReducer'
import wheatReducer from './wheatReducer'

const allReducers = {
  user: userReducer,
  wheat: wheatReducer,
  kjmaking: kjmakingReducer,
}
const rootReducer = combineReducers(allReducers)
export default rootReducer
