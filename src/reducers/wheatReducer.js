import * as Action from '../actions/wheatAction'
import initialState from '../store/wheatStore'

function reducer(state = initialState, action) {
  switch (action.type) {
    case Action.SAVE_ORDER_LIST: {
      return {
        ...state,
        ...action.data,
      }
    }
    case Action.CHANGE_ACTIVE_SECTIONS: {
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
