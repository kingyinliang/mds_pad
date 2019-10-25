/**
 * @format
 */
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { name as appName } from './app.json'
import Routers from './src/router'
import store from './src/store'
import './src/utils/global'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    )
  }
}
AppRegistry.registerComponent(appName, () => App)
