/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform, StyleSheet, Text, View,
} from 'react-native'

const instructions = Platform.select({
  ios: `${'Press Cmd+R to reload,\n'} ${'Cmd+D or shake for dev menu'}`,
  android: `${'Double tap R on your keyboard to reload,\n'} ${'Shake or press menu button for dev menu'}`,
})

export class App extends Component {
  // componentWillMount(){
  //   console.log("componentWillMount")
  // }

  // componentDidMount(){
  //   console.log("componentDidMount")
  // }

  // shouldComponentUpdate(){
  //   console.log("shouldComponentUpdate")
  // }

  // componentWillUpdate(){
  //   console.log("componentWillUpdate")
  // }

  // componentDidUpdate(){
  //   console.log("componentDidUpdate")
  // }

  // componentWillReceiveProps(){
  //     console.log("componentWillReceiveProps")
  // }

  // componentWillUnmount(){
  //     console.log("componentWillUnmount")
  // }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    )
  }
}
// const mapStateToProps = (state) => {
//   return {
//     wheat: state.wheat,
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
