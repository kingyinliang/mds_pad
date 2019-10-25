// import { applyMiddleware, createStore } from 'redux'
// import thunkMiddleware from 'react-thunk'
import { createStore } from 'redux'
import rootReducer from '../reducers'
// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

// export default function configureStore(initialState) {
//     const store = createStoreWithMiddleware(rootReducer, initialState)
//     return store;
// }
export default createStore(rootReducer)
