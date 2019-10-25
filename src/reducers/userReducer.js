import * as Action from '../actions/userAction'
import initialState from '../store/userStore'

function reducer(state = initialState, action) {
  switch (action.type) {
    case Action.SAVE_USER: {
      return {
        ...state,
        ...action.data,
      }
    }
    default:
      return state
  }
}
export default reducer
