import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import cities from './data'
import sagas from './sagas'
import reducer from './reducers'

const defaultState = { cities }
const sagaMiddleware = createSagaMiddleware()

export const initStore = (initialState = defaultState) => {
  const store = createStore(
    combineReducers({ cities: reducer }),
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  sagaMiddleware.run(sagas)

  return store
}
